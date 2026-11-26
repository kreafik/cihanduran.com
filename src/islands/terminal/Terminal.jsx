import { useEffect, useRef, useState } from 'react';
import { run, INTRO } from './commands.mjs';
import './terminal.css';

const PROMPT = 'cihan@bodrum ~ %';
const WELCOME = [[{ text: 'Merhaba. Komutları görmek için ', tone: 'muted' }, { text: 'help', tone: 'accent' }, { text: ' yazın ya da aşağıdaki klasörlere tıklayın.', tone: 'muted' }]];

let nextId = 0;
const entry = (input, output) => ({ id: nextId++, input, output });

function Segment({ s }) {
  const cls = s.tone ? `t-${s.tone}` : undefined;
  if (s.href) return <a className={cls} href={s.href}>{s.text}</a>;
  return <span className={cls}>{s.text}</span>;
}

function Lines({ lines }) {
  return lines.map((l, i) => (
    <div className="t-line" key={i}>{l.length ? l.map((s, j) => <Segment s={s} key={j} />) : ' '}</div>
  ));
}

export default function Terminal() {
  const [log, setLog] = useState([]);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(true);
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  function exec(input) {
    const res = run(input);
    if (res.clear) { setLog([]); return; }
    setLog((l) => [...l, entry(input, res.output)]);
    if (res.navigate) setTimeout(() => window.location.assign(res.navigate), 350);
  }

  // Açılışta INTRO komutlarını yazarak çalıştır (azaltılmış hareket tercihinde anında).
  useEffect(() => {
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, instant ? 0 : ms)));
    (async () => {
      await wait(500);
      for (const cmd of INTRO) {
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return;
          setValue(cmd.slice(0, i));
          await wait(55);
        }
        await wait(220);
        if (cancelled) return;
        setValue('');
        exec(cmd);
        await wait(380);
      }
      if (!cancelled) setBusy(false);
    })();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, value]);

  function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    const input = value;
    setValue('');
    setCursor(-1);
    if (input.trim()) setHistory((h) => [input, ...h].slice(0, 50));
    exec(input);
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const n = Math.min(cursor + 1, history.length - 1);
      setCursor(n);
      setValue(history[n]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = cursor - 1;
      setCursor(Math.max(n, -1));
      setValue(n < 0 ? '' : history[n]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLog([]);
    }
  }

  return (
    <div className="term" onClick={(e) => { if (e.target.tagName !== 'A') inputRef.current?.focus({ preventScroll: true }); }}>
      <div className="term-scroll" ref={scrollRef} aria-live="polite">
        <Lines lines={WELCOME} />
        {log.map((it) => (
          <div key={it.id}>
            <div className="t-line"><span className="t-prompt">{PROMPT}</span> {it.input}</div>
            <Lines lines={it.output} />
          </div>
        ))}
        <form className="t-line t-input-row" onSubmit={onSubmit}>
          <label htmlFor="term-input" className="t-prompt">{PROMPT}</label>
          <input
            id="term-input"
            ref={inputRef}
            className="t-input"
            value={value}
            onChange={(e) => !busy && setValue(e.target.value.slice(0, 120))}
            onKeyDown={onKeyDown}
            readOnly={busy}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            aria-label="Komut yazın"
          />
        </form>
      </div>
    </div>
  );
}
