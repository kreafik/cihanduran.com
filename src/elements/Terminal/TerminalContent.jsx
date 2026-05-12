import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import DataContext from "@contexts/Data/DataContext";
import theme from "@styles/theme";
import getResponse from "@utils/responseFetcher";
import DOMPurify from "dompurify";
import BodyContent from "@elements/Window/BodyContent";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const { sanitize } = DOMPurify;

const Wrapper = styled(SimpleBar)`
	font-family: "Hack", monospace;
	color: ${theme.bodyFont1};
	.simplebar-scrollbar:before {
		border-radius: 10px;
		background-color: ${theme.scrollbarThumb};
	}
	padding: 0.2rem 0.4rem 0 0.4rem;
	line-height: 1.5;
	width: 100%;
	max-height: 80vh;
	overflow-x: hidden;
`;

const Line = styled(SimpleBar)`
	overflow: auto;
	.simplebar-scrollbar:before {
		border-radius: 10px;
		background-color: ${theme.scrollbarThumb};
	}
`;

const Input = styled.input`
	font-family: inherit;
	background: inherit;
	font-size: inherit;
	color: inherit;
	border: none;
	outline: none;
	caret-color: transparent;
	width: 0;
	max-width: 100ch;
	&::selection {
		color: ${theme.bodyBg};
		background: ${theme.bodyBg.negate()};
	}
`;

const InputContainer = styled.span`
	display: flex;
`;

const blink = keyframes`
	from, to {
		background: ${theme.bodyFont1};
	}
	50% {
		background: transparent;
	}
`;

const typingMixin = css`
	animation: ${blink} 1s step-end infinite;
`;

const Cursor = styled.div`
	display: ${props => (props.$disabled ? `none` : `auto`)};
	width: 1ch;
	background: ${theme.bodyFont1};
	margin: 0.1rem 0.3rem;
	z-index: 2;
	${props => !props.$typing && typingMixin}
`;

const Label = styled.label`
	color: ${theme.labelColor};
`;

const InputLine = props => {
	const [val, setVal] = useState("");
	const { commands, setCommand, path } = useContext(DataContext);
	const [counter, setCounter] = useState(commands.length);
	const [typing, setTyping] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const inputRef = useRef();
	const cursorRef = useRef();
	const alertHidden = localStorage.getItem("hideHelp");

	useEffect(() => {
		if (!disabled) {
			inputRef.current.focus();
			const input = inputRef.current;
			const preventSelect = e => { e.target.selectionStart = e.target.selectionEnd; };
			const preventMousedown = e => { e.preventDefault(); };
			input.addEventListener("select", preventSelect);
			input.addEventListener("mousedown", preventMousedown);
			return () => {
				input.removeEventListener("select", preventSelect);
				input.removeEventListener("mousedown", preventMousedown);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!alertHidden) {
			const startTime = new Date();
			const timer = setInterval(() => {
				let timeSpentSec = Math.floor((new Date() - startTime) / 1000);
				let timeSpentMin = Math.floor(timeSpentSec / 60);
				if (timeSpentMin === 5 && !disabled) {
					setVal("help");
					inputRef.current.style.width = inputRef.current.value.length + "ch";
				}
			}, 1000);
			return () => { clearInterval(timer); };
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [disabled, alertHidden]);

	useEffect(() => {
		const timeoutId = setTimeout(() => setTyping(false), 200);
		return () => clearTimeout(timeoutId);
	}, [typing]);

	const handleSubmit = () => {
		if (disabled) return;
		setDisabled(true);
		props.setData(val);
		props.setChild(props.child + 1);
		setCommand(val);
	};

	return (
		<form
			onSubmit={e => { e.preventDefault(); handleSubmit(); }}
			style={{ display: "contents" }}
		>
			<InputContainer>
				<Label
					htmlFor="input"
					dangerouslySetInnerHTML={{ __html: sanitize(path) }}
				/>
				<Input
					id="input"
					type="text"
					ref={inputRef}
					value={val}
					onBlur={e => { if (!disabled) e.target.focus(); }}
					onKeyDown={e => {
						const ctrlCheck = e.ctrlKey;
						const currentPos = parseFloat(cursorRef.current.style.transform.slice(11));
						const textLength = inputRef.current.value.length;
						const checkPos = Math.abs(Math.floor(currentPos));
						switch (e.key) {
							case "ArrowLeft":
								if (checkPos <= textLength && !ctrlCheck) {
									setTyping(true);
									cursorRef.current.style.transform = `translateX(${currentPos - 1}ch)`;
								} else e.preventDefault();
								break;
							case "Delete":
								if (checkPos !== 1 && !ctrlCheck) {
									cursorRef.current.style.transform = `translateX(${currentPos + 1}ch)`;
								} else e.preventDefault();
								break;
							case "Home":
								if (checkPos <= textLength) {
									cursorRef.current.style.transform = `translateX(${-textLength - 0.5}ch)`;
								} else e.preventDefault();
								break;
							case "End":
								if (checkPos !== 1) {
									cursorRef.current.style.transform = `translateX(-0.5ch)`;
								} else e.preventDefault();
								break;
							case "ArrowRight":
								if (checkPos !== 1 && !ctrlCheck) {
									setTyping(true);
									cursorRef.current.style.transform = `translateX(${currentPos + 1}ch)`;
								} else e.preventDefault();
								break;
							case "ArrowUp":
								if (counter > 0) {
									setCounter(counter - 1);
									const cmd = commands[counter - 1];
									setVal(cmd);
									e.target.style.width = cmd.length + "ch";
									cursorRef.current.style.transform = `translateX(${-cmd.length - 0.5}ch)`;
								}
								break;
							case "ArrowDown":
								if (counter <= commands.length - 1) {
									if (counter === commands.length - 1) {
										setVal("");
										e.target.style.width = "0ch";
										cursorRef.current.style.transform = `translateX(-0.5ch)`;
									} else {
										setCounter(counter + 1);
										const cmd = commands[counter + 1];
										setVal(cmd);
										e.target.style.width = cmd.length + "ch";
										cursorRef.current.style.transform = `translateX(${-cmd.length - 0.5}ch)`;
									}
								}
								break;
							default:
								break;
						}
					}}
					onChange={e => {
						e.preventDefault();
						if (e.target.value.length <= 200) {
							setVal(e.target.value.toLowerCase());
							setTyping(true);
							e.target.style.width = e.target.value.length + "ch";
						}
					}}
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
				/>
				<Cursor
					ref={cursorRef}
					$typing={typing}
					$disabled={disabled}
					style={{ transform: "translateX(-0.5ch)" }}
				/>
			</InputContainer>
		</form>
	);
};

const Response = props => <Line>{props.content}</Line>;

/* ── AI Chat ─────────────────────────────────────────── */

const AILine = styled.div`
	white-space: pre-wrap;
	word-break: break-word;
	min-height: 1.3em;
	color: ${p => p.$c || theme.bodyFont1};
	font-size: 0.875rem;
	line-height: 1.5;
`;

const AIPromptLabel = styled.span`
	color: #5ec0ce;
	white-space: nowrap;
	flex-shrink: 0;
	font-size: 0.875rem;
	font-family: "Hack", monospace;
`;

const AIInputEl = styled.input`
	background: transparent;
	border: none;
	outline: none;
	color: ${theme.bodyFont1};
	font-family: "Hack", monospace;
	font-size: 0.875rem;
	flex: 1;
	min-width: 0;
	caret-color: ${theme.bodyFont1};
`;

const AI_PROMPT = "ai@cihanduran:~$ ";

const AIChat = ({ onExit, scrollToBottom }) => {
	const [lines, setLines] = useState([
		{ t: "AI modu aktif. Hizmetlerim hakkında sorularını sorabilirsin.", c: "#aed8a0" },
		{ t: "Çıkmak için 'exit' yaz.", c: "#666" },
		{ t: "", c: "" },
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [history, setHistory] = useState([]);
	const [cmdHistory, setCmdHistory] = useState([]);
	const [histIdx, setHistIdx] = useState(-1);
	const inputRef = useRef(null);
	const abortRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [loading]);

	useEffect(() => {
		return () => { abortRef.current?.abort(); };
	}, []);

	const send = async () => {
		const msg = input.trim();
		if (!msg || loading) return;
		setInput("");
		setHistIdx(-1);

		if (msg === "exit" || msg === "quit" || msg === "logout") {
			setLines(prev => [...prev,
				{ t: AI_PROMPT + msg, c: "#5ec0ce" },
				{ t: "AI modundan çıkılıyor...", c: "#888" },
			]);
			setTimeout(onExit, 400);
			return;
		}

		if (msg === "clear") {
			setLines([]);
			setHistory([]);
			return;
		}

		setCmdHistory(prev => [msg, ...prev]);
		setLines(prev => [...prev, { t: AI_PROMPT + msg, c: "#5ec0ce" }]);
		const newHistory = [...history, { role: "user", content: msg }];
		setHistory(newHistory);
		setLoading(true);

		try {
			abortRef.current = new AbortController();
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: newHistory }),
				signal: abortRef.current.signal,
			});

			if (!res.ok) {
				let errMsg = "Bir hata oluştu.";
				try { const j = await res.json(); errMsg = j.error || errMsg; } catch {}
				setLines(prev => [...prev, { t: errMsg, c: "#ff5f58" }, { t: "", c: "" }]);
				setLoading(false);
				scrollToBottom?.();
				return;
			}

			setLines(prev => [...prev, { t: "", c: null }]);
			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let full = "";

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				full += decoder.decode(value, { stream: true });
				setLines(prev => {
					const next = [...prev];
					next[next.length - 1] = { t: full, c: null };
					return next;
				});
				scrollToBottom?.();
			}

			setHistory(prev => [...prev, { role: "assistant", content: full }]);
		} catch (err) {
			if (err.name === "AbortError") return;
			setLines(prev => {
				const next = [...prev];
				if (!next[next.length - 1]?.t) next[next.length - 1] = { t: "Bağlantı hatası.", c: "#ff5f58" };
				else next.push({ t: "Bağlantı hatası.", c: "#ff5f58" });
				return next;
			});
		}

		setLines(prev => [...prev, { t: "", c: "" }]);
		setLoading(false);
		scrollToBottom?.();
	};

	return (
		<div style={{ padding: "0.2rem 0" }}>
			{lines.map((l, i) => (
				<AILine key={i} $c={l.c}>{l.t}</AILine>
			))}
			{loading
				? <AILine $c="#666">▋</AILine>
				: (
					<form onSubmit={e => { e.preventDefault(); send(); }} style={{ display: "flex", alignItems: "center" }}>
						<AIPromptLabel>{AI_PROMPT}</AIPromptLabel>
						<AIInputEl
							ref={inputRef}
							value={input}
							onChange={e => setInput(e.target.value)}
							onKeyDown={e => {
								if (e.key === "ArrowUp") {
									e.preventDefault();
									const ni = histIdx + 1;
									if (ni < cmdHistory.length) { setHistIdx(ni); setInput(cmdHistory[ni]); }
								} else if (e.key === "ArrowDown") {
									e.preventDefault();
									const ni = histIdx - 1;
									if (ni < 0) { setHistIdx(-1); setInput(""); }
									else { setHistIdx(ni); setInput(cmdHistory[ni]); }
								} else if (e.ctrlKey && e.key === "c") {
									e.preventDefault();
									setInput("");
								}
							}}
							onBlur={e => { if (!loading) e.target.focus(); }}
							spellCheck={false}
							autoComplete="off"
							autoCorrect="off"
						/>
					</form>
				)
			}
		</div>
	);
};

/* ── /AI Chat ────────────────────────────────────────── */

const WelcomeMsg = styled.div`
	font-family: "Hack", monospace;
	color: ${theme.bodyFont1};
	padding: 0.2rem 0.4rem 0.6rem;
	line-height: 1.6;
	font-size: 0.875rem;
	opacity: 0.7;
`;

const Command = props => {
	const [response, setResponse] = useState("");
	const [data, setData] = useState("");
	useEffect(() => {
		if (data.length) {
			if (data.trim().toLowerCase() === "clear") {
				props.setActive(false);
				props.setChild(1);
				return;
			}
			const resp = getResponse(data.trim());
			if (resp === "__AI_MODE__") {
				props.onActivateAI?.();
				return;
			}
			setResponse(resp);
		}
	}, [data, props]);
	useEffect(() => {
		if (response) {
			props.onResponseReady?.();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response]);
	return (
		<Wrapper>
			<InputLine
				setChild={props.setChild}
				child={props.child}
				setData={setData}
				path={props.path}
			/>
			<Response content={response} />
		</Wrapper>
	);
};

const TerminalContent = () => {
	const [child, setChild] = useState(1);
	const [active, setActive] = useState(true);
	const [aiMode, setAiMode] = useState(false);
	const scrollRef = useRef(null);

	useEffect(() => { setActive(true); }, [active]);

	const scrollToBottom = useCallback(() => {
		setTimeout(() => {
			if (scrollRef.current) {
				const el = scrollRef.current.getScrollElement();
				el.scrollTop = el.scrollHeight;
			}
		}, 30);
	}, []);

	const visibleCommands = aiMode ? child - 1 : child;

	return (
		<BodyContent>
			<Wrapper ref={scrollRef}>
				<WelcomeMsg>
					{"Last login: "}
					{new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul", weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
					{" on ttys001\n"}
					{"Merhaba! Tüm komutlar için "}
					<span style={{ color: "#aed8a0" }}>help</span>
					{" yazın. AI asistanı için "}
					<span style={{ color: "#5ec0ce" }}>ai</span>
					{" yazın."}
				</WelcomeMsg>
				{Array.from(Array(visibleCommands).keys()).map(i => (
					<Command
						setChild={setChild}
						setActive={setActive}
						child={child}
						key={i === 0 ? active && i : i}
						onResponseReady={scrollToBottom}
						onActivateAI={() => { setAiMode(true); scrollToBottom(); }}
					/>
				))}
				{aiMode && (
					<AIChat
						scrollToBottom={scrollToBottom}
						onExit={() => setAiMode(false)}
					/>
				)}
			</Wrapper>
		</BodyContent>
	);
};

export default TerminalContent;
