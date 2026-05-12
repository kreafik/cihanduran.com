import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";

const Terminal = styled.div`
	flex: 1;
	overflow-y: auto;
	font-family: "Hack", monospace;
	font-size: 0.82rem;
	color: #d0d0d0;
	line-height: 1.65;
	padding: 0.6rem 0.75rem;
	box-sizing: border-box;
	cursor: text;
	background: transparent;
`;

const Line = styled.div`
	white-space: pre-wrap;
	word-break: break-all;
	min-height: 1.2em;
	color: ${p => p.$c || "#d0d0d0"};
`;

const InputRow = styled.div`
	display: flex;
	align-items: center;
`;

const PS1 = styled.span`
	color: #5ec0ce;
	white-space: nowrap;
	flex-shrink: 0;
	user-select: none;
`;

const Inp = styled.input`
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

const PROMPT = "root@cihanduran:~# ";

const BOOT = [
	["[    0.000000] Linux version 6.1.0-bodrum (gcc 12.2.0)", "#666"],
	["[    0.218432] ACPI: Core revision 20220331", "#666"],
	["[    0.341018] EXT4-fs (sda1): mounted filesystem", "#666"],
	["[    1.024517] systemd[1]: Detected virtualization qemu.", "#5ec0ce"],
	["[    1.203841] systemd[1]: Starting portfolio.service...", "#5ec0ce"],
	["[  OK  ] Started portfolio.service.", "#28fe0e"],
	["[  OK  ] Reached target Multi-User System.", "#28fe0e"],
	["", ""],
	["Bodrum Linux 6.1.0 (cihanduran-qemu tty1)", "#fff"],
	["", ""],
];

const RESP = {
	"uname -a": "Linux cihanduran-qemu 6.1.0-bodrum #1 SMP x86_64 GNU/Linux",
	"uname":    "Linux",
	"whoami":   "root",
	"id":       "uid=0(root) gid=0(root) groups=0(root)",
	"pwd":      "/root",
	"hostname": "cihanduran-qemu",
	"uptime":   "up 42 days, 7:13, 1 user, load average: 0.00, 0.00, 0.00",
	"date":     () => new Date().toUTCString(),
	"ls":       "bin  dev  etc  home  portfolio.sh  readme.txt  usr  var",
	"ls -la":   "total 48\ndrwxr-xr-x 8 root root 4096 May 12 10:00 .\n-rwxr-xr-x 1 root root  512 May 12 10:00 portfolio.sh\n-rw-r--r-- 1 root root  128 May 12 10:00 readme.txt",
	"cat readme.txt":   "Cihan Duran — Portfolio VM\n\nBu sistem sadece gösteri amaçlıdır.\nİletişim: https://wa.me/905415755520\nWeb: https://cihanduran.com",
	"cat portfolio.sh": "#!/bin/bash\necho Launching...\nxdg-open https://cihanduran.com",
	"./portfolio.sh":   "Launching...\nPortfolio is already running in your browser :)",
	"ps aux":  "USER     PID %CPU COMMAND\nroot       1  0.0 /sbin/init\nroot     420  0.0 -bash\nroot     512  0.0 ps aux",
	"free -h": "         total   used   free\nMem:      512M   128M   384M",
	"df -h":   "Filesystem  Size  Used Avail Use%\n/dev/sda1    20G  4.2G   15G  22%",
	"env":     "PATH=/usr/bin\nHOME=/root\nSHELL=/bin/bash\nUSER=root",
	"ping cihanduran.com": "PING cihanduran.com 56 bytes\n64 bytes: icmp_seq=1 time=1.33ms\n64 bytes: icmp_seq=2 time=1.29ms\n0% packet loss",
	"curl cihanduran.com": "HTTP/2 200\nserver: Vercel\n\nZaten buradasın :)",
	"neofetch": "       .--.\n      |o_o|     root@cihanduran-qemu\n      |:_/|     OS: Bodrum Linux 6.1.0\n     //   \\\\    Kernel: 6.1.0-bodrum\n    (|     |)    Shell: bash 5.2\n   /\\_   _/\\   Memory: 128M / 512M",
	"sudo":    "Zaten root'sun.",
	"sudo su": "Zaten root'sun.",
	"vim":     "bash: vim: command not found",
	"nano":    "bash: nano: command not found",
	"apt":     "Bu VM salt okunur modda.",
	"help":    "Komutlar: uname  whoami  ls  cat  ps  df  free\n          date  env  uptime  hostname  neofetch\n          ping  curl  ./portfolio.sh  clear  exit",
};

export default function LinuxContent() {
	const [lines, setLines]     = useState([]);
	const [input, setInput]     = useState("");
	const [ready, setReady]     = useState(false);
	const [history, setHistory] = useState([]);
	const [histIdx, setHistIdx] = useState(-1);
	const bottomRef = useRef(null);
	const inputRef  = useRef(null);

	useEffect(() => {
		let i = 0;
		let cancelled = false;
		const next = () => {
			if (cancelled) return;
			if (i >= BOOT.length) { setReady(true); return; }
			const [t, c] = BOOT[i++];
			setLines(prev => [...prev, { t, c }]);
			setTimeout(next, i < 5 ? 70 : 220);
		};
		const id = setTimeout(next, 400);
		return () => { cancelled = true; clearTimeout(id); };
	}, []);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ block: "end" });
	}, [lines, ready]);

	const run = () => {
		const cmd = input.trim();
		setInput("");
		const out = [{ t: PROMPT + cmd, c: "#5ec0ce" }];

		if (!cmd) { setLines(p => [...p, ...out]); return; }

		if (cmd === "clear") {
			setLines([]);
			setHistory(p => [cmd, ...p]);
			setHistIdx(-1);
			return;
		}

		if (cmd === "exit" || cmd === "logout") {
			out.push({ t: "logout", c: "#888" });
			out.push({ t: "Connection to cihanduran-qemu closed.", c: "#888" });
			setLines(p => [...p, ...out]);
			setHistory(p => [cmd, ...p]);
			setHistIdx(-1);
			setTimeout(() => window.history.back(), 600);
			return;
		}

		const resp = RESP[cmd];
		if (resp !== undefined) {
			const text = typeof resp === "function" ? resp() : resp;
			text.split("\n").forEach(t => out.push({ t, c: null }));
		} else {
			out.push({ t: `bash: ${cmd}: command not found`, c: "#ff5f58" });
		}

		setLines(p => [...p, ...out]);
		setHistory(p => [cmd, ...p]);
		setHistIdx(-1);
	};

	return (
		<BodyContent>
			<Terminal onClick={() => inputRef.current?.focus()}>
				{lines.map((l, i) => (
					<Line key={i} $c={l.c}>{l.t}</Line>
				))}
				{ready && (
					<InputRow>
						<PS1>{PROMPT}</PS1>
						<form
							style={{ flex: 1, display: "flex" }}
							onSubmit={e => { e.preventDefault(); run(); }}
						>
							<Inp
								ref={inputRef}
								value={input}
								onChange={e => setInput(e.target.value)}
								onKeyDown={e => {
									if (e.key === "ArrowUp") {
										e.preventDefault();
										const ni = histIdx + 1;
										if (ni < history.length) { setHistIdx(ni); setInput(history[ni]); }
									} else if (e.key === "ArrowDown") {
										e.preventDefault();
										const ni = histIdx - 1;
										if (ni < 0) { setHistIdx(-1); setInput(""); }
										else { setHistIdx(ni); setInput(history[ni]); }
									} else if (e.key === "c" && e.ctrlKey) {
										e.preventDefault();
										setInput("");
									}
								}}
								spellCheck={false}
								autoComplete="off"
								autoCorrect="off"
							/>
						</form>
					</InputRow>
				)}
				<div ref={bottomRef} />
			</Terminal>
		</BodyContent>
	);
}
