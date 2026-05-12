import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Scroll = styled(SimpleBar)`
	font-family: "Hack", monospace;
	font-size: 0.82rem;
	color: #d0d0d0;
	line-height: 1.65;
	width: 100%;
	max-height: 80vh;
	padding: 0.6rem 0.75rem;
	box-sizing: border-box;
	cursor: text;
	.simplebar-scrollbar:before { background: #555; border-radius: 10px; }
`;

const Line = styled.div`
	white-space: pre-wrap;
	word-break: break-all;
	min-height: 1em;
	color: ${p => p.$color || "#d0d0d0"};
`;

const InputRow = styled.form`
	display: flex;
	align-items: center;
`;

const PromptLabel = styled.span`
	color: #5ec0ce;
	white-space: nowrap;
	flex-shrink: 0;
	user-select: none;
`;

const FakeInput = styled.input`
	background: transparent;
	border: none;
	outline: none;
	color: #d0d0d0;
	font-family: "Hack", monospace;
	font-size: 0.82rem;
	flex: 1;
	min-width: 0;
	caret-color: #d0d0d0;
`;

const BOOT_LINES = [
	{ t: "[    0.000000] Linux version 6.1.0-bodrum (gcc 12.2.0)", c: "#666" },
	{ t: "[    0.218432] ACPI: Core revision 20220331", c: "#666" },
	{ t: "[    0.341018] EXT4-fs (sda1): mounted filesystem with ordered data mode", c: "#666" },
	{ t: "[    1.024517] systemd[1]: Detected virtualization qemu.", c: "#5ec0ce" },
	{ t: "[    1.203841] systemd[1]: Starting cihanduran-portfolio.service...", c: "#5ec0ce" },
	{ t: "[  OK  ] Started cihanduran-portfolio.service.", c: "#28fe0e" },
	{ t: "[  OK  ] Reached target Multi-User System.", c: "#28fe0e" },
	{ t: "", c: "" },
	{ t: "Bodrum Linux 6.1.0 (cihanduran-qemu tty1)", c: "#fff" },
	{ t: "", c: "" },
];

const PROMPT = "root@cihanduran:~# ";

const RESPONSES = {
	"uname -a": "Linux cihanduran-qemu 6.1.0-bodrum #1 SMP x86_64 GNU/Linux",
	"uname":    "Linux",
	"whoami":   "root",
	"id":       "uid=0(root) gid=0(root) groups=0(root)",
	"pwd":      "/root",
	"hostname": "cihanduran-qemu",
	"uptime":   "up 42 days, 7:13,  1 user,  load average: 0.00, 0.00, 0.00",
	"date":     () => new Date().toUTCString(),
	"ls":       "bin  dev  etc  home  portfolio.sh  readme.txt  usr  var",
	"ls -la":   "total 48\ndrwxr-xr-x 8 root root 4096 May 12 10:00 .\n-rwxr-xr-x 1 root root  512 May 12 10:00 portfolio.sh\n-rw-r--r-- 1 root root  128 May 12 10:00 readme.txt",
	"cat readme.txt":    "Cihan Duran — Portfolio VM\n\nBu sistem sadece gösteri amaçlıdır.\nGerçek iletişim: https://wa.me/905415755520\nWeb: https://cihanduran.com",
	"cat portfolio.sh":  "#!/bin/bash\n# cihanduran.com portfolio launcher\necho \"Launching...\"\nxdg-open https://cihanduran.com",
	"./portfolio.sh":    "Launching...\nPortfolio is already running in your browser :)",
	"ps aux":   "USER     PID %CPU %MEM COMMAND\nroot       1  0.0  0.1 /sbin/init\nroot     420  0.0  0.2 -bash\nroot     512  0.0  0.1 ps aux",
	"free -h":  "              total   used   free\nMem:           512M   128M   384M\nSwap:          256M     0B   256M",
	"df -h":    "Filesystem   Size  Used Avail Use% Mounted on\n/dev/sda1     20G  4.2G   15G  22% /",
	"env":      "PATH=/usr/local/sbin:/usr/bin\nHOME=/root\nSHELL=/bin/bash\nUSER=root",
	"ping cihanduran.com": "PING cihanduran.com (76.76.21.21)\n64 bytes from 76.76.21.21: icmp_seq=1 time=1.33 ms\n64 bytes from 76.76.21.21: icmp_seq=2 time=1.29 ms\n^C\n2 packets, 0% packet loss",
	"curl cihanduran.com": "HTTP/2 200\ncontent-type: text/html; charset=utf-8\nserver: Vercel\n\nZaten buradasın :)",
	"neofetch": "        .--.\n       |o_o |\n       |:_/ |       root@cihanduran-qemu\n      //   \\ \\      --------------------\n     (|     | )     OS: Bodrum Linux 6.1.0\n    /'\\_   _/`\\     Kernel: 6.1.0-bodrum\n    \\___)=(___/     Shell: bash 5.2\n                    Memory: 128M / 512M",
	"sudo su":  "Zaten root'sun.",
	"sudo":     "Zaten root'sun.",
	"vim":      "bash: vim: command not found",
	"nano":     "bash: nano: command not found",
	"apt":      "Bu VM salt okunur modda çalışıyor.",
	"apt-get":  "Bu VM salt okunur modda çalışıyor.",
	"help":     "Komutlar: uname  whoami  ls  cat  ps  df  free\n          date  env  uptime  hostname  neofetch\n          ping  curl  ./portfolio.sh  clear  exit",
};

const LinuxContent = () => {
	const [lines, setLines]     = useState([]);
	const [input, setInput]     = useState("");
	const [ready, setReady]     = useState(false);
	const [history, setHistory] = useState([]);
	const [histIdx, setHistIdx] = useState(-1);
	const scrollRef = useRef(null);
	const inputRef  = useRef(null);

	const scrollToBottom = useCallback(() => {
		setTimeout(() => {
			if (scrollRef.current) {
				const el = scrollRef.current.getScrollElement();
				el.scrollTop = el.scrollHeight;
			}
		}, 30);
	}, []);

	useEffect(() => {
		let i = 0;
		const next = () => {
			if (i >= BOOT_LINES.length) { setReady(true); return; }
			setLines(prev => [...prev, BOOT_LINES[i]]);
			i++;
			setTimeout(next, i < 5 ? 70 : 220);
		};
		setTimeout(next, 400);
	}, []);

	useEffect(() => { scrollToBottom(); }, [lines, scrollToBottom]);

	const submit = () => {
		const cmd = input.trim();
		setInput("");

		const out = [{ t: PROMPT + cmd, c: "#5ec0ce" }];

		if (!cmd) { setLines(p => [...p, ...out]); return; }

		if (cmd === "clear") { setLines([]); setHistory(p => [cmd, ...p]); setHistIdx(-1); return; }

		if (cmd === "exit" || cmd === "logout") {
			out.push({ t: "logout", c: "#888" });
			out.push({ t: "Connection to cihanduran-qemu closed.", c: "#888" });
			setLines(p => [...p, ...out]);
			setHistory(p => [cmd, ...p]);
			setHistIdx(-1);
			setTimeout(() => window.history.back(), 600);
			return;
		}

		const resp = RESPONSES[cmd];
		if (resp !== undefined) {
			const text = typeof resp === "function" ? resp() : resp;
			text.split("\n").forEach(l => out.push({ t: l, c: null }));
		} else {
			out.push({ t: `bash: ${cmd}: command not found`, c: "#ff5f58" });
		}

		setLines(p => [...p, ...out]);
		setHistory(p => [cmd, ...p]);
		setHistIdx(-1);
	};

	return (
		<BodyContent onClick={() => inputRef.current?.focus()}>
			<Scroll ref={scrollRef}>
				{lines.map((l, i) => (
					<Line key={i} $color={l.c}>{l.t}</Line>
				))}
				{ready && (
					<InputRow onSubmit={e => { e.preventDefault(); submit(); }}>
						<PromptLabel>{PROMPT}</PromptLabel>
						<FakeInput
							ref={inputRef}
							value={input}
							onChange={e => setInput(e.target.value)}
							onKeyDown={e => {
								if (e.key === "ArrowUp") {
									e.preventDefault();
									const i = histIdx + 1;
									if (i < history.length) { setHistIdx(i); setInput(history[i]); }
								}
								if (e.key === "ArrowDown") {
									e.preventDefault();
									const i = histIdx - 1;
									if (i < 0) { setHistIdx(-1); setInput(""); }
									else { setHistIdx(i); setInput(history[i]); }
								}
								if (e.key === "c" && e.ctrlKey) { e.preventDefault(); setInput(""); }
							}}
							spellCheck={false}
							autoComplete="off"
							autoCorrect="off"
						/>
					</InputRow>
				)}
			</Scroll>
		</BodyContent>
	);
};

export default LinuxContent;
