import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { run, INTRO } from './commands.mjs';
import { shouldOpenFromHash } from './expand.mjs';
import './terminal.css';

const PROMPT = 'cihan@bodrum ~ %';
const WELCOME = [[{ text: 'Merhaba. Komutları görmek için ', tone: 'muted' }, { text: 'help', tone: 'accent' }, { text: ' yazın ya da klasörlere tıklayın.', tone: 'muted' }]];

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

/**
 * Ana sayfadaki terminal. Küçük haldeyken tıklanınca macOS "yakınlaştır" gibi ekranı kaplar;
 * Esc, yeşil düğme ya da karartmaya tıklama küçültür. /#terminal adresi açılışta büyütür.
 */
export default function Terminal({ title = 'cihan — zsh' }) {
  const [log, setLog] = useState([]);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(true);
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const frameRef = useRef(null);
  const placeholderRef = useRef(null);
  const compactHeight = useRef(0);

  function exec(input) {
    const res = run(input);
    if (res.clear) { setLog([]); return; }
    setLog((l) => [...l, entry(input, res.output)]);
    if (res.navigate) setTimeout(() => window.location.assign(res.navigate), 350);
  }

  // Açılış komutları (azaltılmış harekette anında).
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

  // /#terminal → büyüt; geri/ileri ile hash değişirse de izle.
  useEffect(() => {
    const sync = () => { if (shouldOpenFromHash(window.location.hash)) setExpanded(true); };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Büyükken: Esc ile küçül, sayfa kaymasın, odak girişte.
  // Küçülünce odağı terminale geri ver (pencere portaldan çıkınca yeniden oluşur).
  const wasExpanded = useRef(false);
  useEffect(() => {
    if (expanded) { wasExpanded.current = true; return; }
    if (wasExpanded.current) frameRef.current?.focus({ preventScroll: true });
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => { if (e.key === 'Escape') collapse(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [expanded]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, value, expanded]);

  function expand() {
    if (frameRef.current) compactHeight.current = frameRef.current.offsetHeight;
    setExpanded(true);
  }
  function collapse() {
    setExpanded(false);
    if (shouldOpenFromHash(window.location.hash)) window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

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

  function onFrameClick(e) {
    if (e.target.closest('a, button')) return;
    if (!expanded) expand();
    else inputRef.current?.focus({ preventScroll: true });
  }

  const frame = (
      <div
        ref={frameRef}
        className={`term-window${expanded ? ' is-expanded' : ''}`}
        role={expanded ? 'dialog' : 'group'}
        aria-modal={expanded ? 'true' : undefined}
        aria-label="Terminal"
        tabIndex={-1}
        onClick={onFrameClick}
        onKeyDown={(e) => { if (!expanded && e.key === 'Enter' && e.target === frameRef.current) expand(); }}
      >
        <div className="term-bar">
          <span className="term-lights">
            <button type="button" className="l-close" aria-label={expanded ? 'Küçült' : 'Terminali büyüt'} onClick={(e) => { e.stopPropagation(); expanded ? collapse() : expand(); }} />
            <button type="button" className="l-min" aria-label="Küçült" onClick={(e) => { e.stopPropagation(); if (expanded) collapse(); }} />
            <button type="button" className="l-max" aria-label={expanded ? 'Küçült' : 'Terminali büyüt'} onClick={(e) => { e.stopPropagation(); expanded ? collapse() : expand(); }} />
          </span>
          <span className="term-title">{expanded ? `${title} — tam ekran` : title}</span>
          {!expanded && <button type="button" className="term-grow" onClick={(e) => { e.stopPropagation(); expand(); }}>Büyüt</button>}
        </div>
        <div className="term">
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
                onFocus={() => { if (!expanded && window.matchMedia('(max-width: 899px)').matches) expand(); }}
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
      </div>
  );

  // Büyükken pencere body'ye taşınır: sayfadaki yığın bağlamlarının (menü, dock) üstünde kalsın.
  if (!expanded) return frame;
  return (
    <>
      <div ref={placeholderRef} className="term-placeholder" style={{ height: compactHeight.current || undefined }} aria-hidden="true" />
      {createPortal(
        <>
          <div className="term-backdrop" onClick={collapse} aria-hidden="true" />
          {frame}
        </>,
        document.body,
      )}
    </>
  );
}
