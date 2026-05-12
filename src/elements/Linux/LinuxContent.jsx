import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Scroll = styled(SimpleBar)`
	font-family: "Hack", monospace;
	font-size: 0.82rem;
	color: #d0d0d0;
	line-height: 1.6;
	width: 100%;
	max-height: 80vh;
	padding: 0.5rem 0.75rem;
	box-sizing: border-box;
	.simplebar-scrollbar:before { background: #555; border-radius: 10px; }
`;

const Line = styled.div`
	white-space: pre-wrap;
	word-break: break-all;
	color: ${p => p.$color || "#d0d0d0"};
`;

const InputRow = styled.div`
	display: flex;
	align-items: center;
	margin-top: 0.1rem;
`;

const Prompt = styled.span`
	color: #5ec0ce;
	white-space: nowrap;
	flex-shrink: 0;
`;

const FakeInput = styled.input`
	background: transparent;
	border: none;
	outline: none;
	color: #d0d0d0;
	font-family: "Hack", monospace;
	font-size: 0.82rem;
	flex: 1;
	caret-color: #d0d0d0;
	&::selection { background: rgba(255,255,255,0.2); }
`;

const BOOT = [
	{ text: "[    0.000000] Linux version 6.1.0-bodrum (gcc 12.2.0)", color: "#888" },
	{ text: "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1", color: "#888" },
	{ text: "[    0.218432] ACPI: Core revision 20220331", color: "#888" },
	{ text: "[    0.341018] pci 0000:00:00.0: [8086:29c0] type 00 class 0x060000", color: "#888" },
	{ text: "[    1.024517] EXT4-fs (sda1): mounted filesystem", color: "#888" },
	{ text: "[    1.203841] systemd[1]: Detected virtualization qemu.", color: "#5ec0ce" },
	{ text: "[    1.411200] systemd[1]: Starting cihanduran-portfolio.service...", color: "#5ec0ce" },
	{ text: "[  OK  ] Started cihanduran-portfolio.service.", color: "#28fe0e" },
	{ text: "[  OK  ] Reached target Multi-User System.", color: "#28fe0e" },
	{ text: "", color: "" },
	{ text: "Bodrum Linux 6.1.0 (cihanduran-qemu)", color: "#fff" },
	{ text: "", color: "" },
];

const PROMPT = "root@cihanduran:~# ";

const RESPONSES = {
	"uname -a": "Linux cihanduran-qemu 6.1.0-bodrum #1 SMP PREEMPT x86_64 GNU/Linux",
	"uname":    "Linux",
	"whoami":   "root",
	"id":       "uid=0(root) gid=0(root) groups=0(root)",
	"pwd":      "/root",
	"hostname": "cihanduran-qemu",
	"uptime":   "up 42 days, 7:13, 1 user, load average: 0.00, 0.00, 0.00",
	"date":     () => new Date().toUTCString(),
	"ls": `\x1b[34mbin\x1b[0m  \x1b[34mdev\x1b[0m  \x1b[34metc\x1b[0m  \x1b[34mhome\x1b[0m  portfolio.sh  readme.txt  \x1b[34musr\x1b[0m  \x1b[34mvar\x1b[0m`,
	"ls -la": `total 48\ndrwxr-xr-x  8 root root 4096 May 11 10:00 .\ndrwxr-xr-x 20 root root 4096 May 11 10:00 ..\n-rwxr-xr-x  1 root root  512 May 11 10:00 portfolio.sh\n-rw-r--r--  1 root root  128 May 11 10:00 readme.txt`,
	"cat readme.txt": `Cihan Duran — Portfolio VM\n\nBu sistem sadece gösteri amaçlıdır.\nGerçek iletişim: https://wa.me/905415755520\nWeb: https://cihanduran.com`,
	"cat portfolio.sh": `#!/bin/bash\n# cihanduran.com portfolio launcher\necho "Launching portfolio..."\nxdg-open https://cihanduran.com`,
	"./portfolio.sh": "Launching portfolio...\nPortfolio is already running in your browser :)",
	"ps aux": `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1  16952  1024 ?        Ss   10:00   0:00 /sbin/init\nroot       420  0.0  0.2  21872  2048 pts/0    Ss   10:00   0:00 -bash\nroot       512  0.0  0.1  37368   832 pts/0    R+   10:01   0:00 ps aux`,
	"free -h": `              total        used        free\nMem:           512M        128M        384M\nSwap:          256M          0B        256M`,
	"df -h": `Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G  4.2G   15G  22% /\ntmpfs           256M     0  256M   0% /tmp`,
	"env": `PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin\nHOME=/root\nSHELL=/bin/bash\nTERM=xterm-256color\nUSER=root`,
	"neofetch": `        .-/+oossssoo+/-.               root@cihanduran-qemu\n     \`:+ssssssssssssssssss+:\`           --------------------\n   -+ssssssssssssssssssyyssss+-         OS: Bodrum Linux 6.1.0\n  .ossssssssssssssssss dMMMNy.sssso.    Kernel: 6.1.0-bodrum\n /ssssssssssshdmmNNmmyNMMMMhssssss/     Uptime: 42 days\n+ssssssssshmydMMMMMMMNddddyssssssss+    Shell: bash 5.2.0\n/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/  Terminal: QEMU\n.ssssssssdMMMNhsssssssssshNMMMdssssss.  CPU: QEMU Virtual\n+sssshhhyNMMNyssssssssssssyNMMMysssss+  Memory: 128M / 512M\nosssssssyMMMNhssssssssssssshmmmhssssso\n+ssssssssdMMMNhssssssssssssssssssssss+\n \`/sssshhdNMMNyssssssssssssssssssss/\`\n   .+sssssyyyyyssssssssssssssssss+.\n     \`:+ssssssssssssssssssssss+:\`\n        \`.-/+oossssoooo++/-..\``,
	"help": `Kullanılabilir komutlar:\n  uname     ls        cat       ps aux\n  whoami    ls -la    df -h     free -h\n  pwd       date      uptime    env\n  hostname  neofetch  ./portfolio.sh\n  clear     exit`,
	"man": "Kısaca: 'help' yazın.",
	"echo $USER": "root",
	"echo $SHELL": "/bin/bash",
	"sudo su": "Zaten root'sun.",
	"sudo":  "Zaten root'sun.",
	"vim":   "bash: vim: paket yüklü değil. apt install vim",
	"nano":  "bash: nano: paket yüklü değil. apt install nano",
	"apt":   "Reading package lists... Done\nBu VM salt okunur modda çalışıyor.",
	"apt-get": "Reading package lists... Done\nBu VM salt okunur modda çalışıyor.",
	"ping cihanduran.com": `PING cihanduran.com (76.76.21.21) 56(84) bytes of data.\n64 bytes from 76.76.21.21: icmp_seq=1 ttl=64 time=1.33 ms\n64 bytes from 76.76.21.21: icmp_seq=2 ttl=64 time=1.29 ms\n^C\n--- cihanduran.com ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`,
	"curl cihanduran.com": `HTTP/2 200\ncontent-type: text/html; charset=utf-8\nserver: Vercel\n\nZaten buradasın :)`,
};

const parseAnsi = text => {
	const parts = [];
	const re = /\x1b\[(\d+)m(.*?)\x1b\[0m/g;
	let last = 0, m;
	while ((m = re.exec(text)) !== null) {
		if (m.index > last) parts.push({ text: text.slice(last, m.index), color: null });
		const color = m[1] === "34" ? "#5ec0ce" : null;
		parts.push({ text: m[2], color });
		last = m.index + m[0].length;
	}
	if (last < text.length) parts.push({ text: text.slice(last), color: null });
	return parts;
};

const LinuxContent = () => {
	const [lines, setLines] = useState([]);
	const [input, setInput] = useState("");
	const [ready, setReady] = useState(false);
	const [history, setHistory] = useState([]);
	const [histIdx, setHistIdx] = useState(-1);
	const scrollRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		let i = 0;
		const tick = () => {
			if (i < BOOT.length) {
				setLines(prev => [...prev, BOOT[i]]);
				i++;
				setTimeout(tick, i < 9 ? 60 : 200);
			} else {
				setReady(true);
				setTimeout(() => inputRef.current?.focus(), 50);
			}
		};
		setTimeout(tick, 300);
	}, []);

	useEffect(() => {
		if (scrollRef.current) {
			const el = scrollRef.current.getScrollElement();
			el.scrollTop = el.scrollHeight;
		}
	}, [lines, ready]);

	const submit = () => {
		const cmd = input.trim();
		if (!cmd) { setLines(p => [...p, { text: PROMPT, color: "#5ec0ce" }]); setInput(""); return; }

		const newLines = [{ text: PROMPT + cmd, color: "#5ec0ce" }];

		if (cmd === "clear") {
			setLines([]);
			setInput("");
			setHistory(p => [cmd, ...p]);
			setHistIdx(-1);
			return;
		}

		if (cmd === "exit" || cmd === "logout") {
			newLines.push({ text: "logout", color: "#888" });
			newLines.push({ text: "Connection to cihanduran-qemu closed.", color: "#888" });
			setLines(p => [...p, ...newLines]);
			setInput("");
			setTimeout(() => window.history.back(), 800);
			return;
		}

		const resp = RESPONSES[cmd];
		if (resp !== undefined) {
			const text = typeof resp === "function" ? resp() : resp;
			text.split("\n").forEach(l => newLines.push({ text: l, color: null }));
		} else {
			newLines.push({ text: `bash: ${cmd}: command not found`, color: "#ff5f58" });
		}

		setLines(p => [...p, ...newLines]);
		setHistory(p => [cmd, ...p]);
		setHistIdx(-1);
		setInput("");
	};

	return (
		<BodyContent onClick={() => inputRef.current?.focus()}>
			<Scroll ref={scrollRef}>
				{lines.map((l, i) => {
					const parts = l.text ? parseAnsi(l.text) : null;
					return (
						<Line key={i} $color={l.color}>
							{parts && parts.length > 1
								? parts.map((p, j) => <span key={j} style={p.color ? { color: p.color } : {}}>{p.text}</span>)
								: l.text}
						</Line>
					);
				})}
				{ready && (
					<InputRow>
						<Prompt>{PROMPT}</Prompt>
						<FakeInput
							ref={inputRef}
							value={input}
							onChange={e => setInput(e.target.value)}
							onKeyDown={e => {
								if (e.key === "Enter") { e.preventDefault(); submit(); }
								if (e.key === "ArrowUp") { e.preventDefault(); const idx = histIdx + 1; if (idx < history.length) { setHistIdx(idx); setInput(history[idx]); } }
								if (e.key === "ArrowDown") { e.preventDefault(); const idx = histIdx - 1; if (idx < 0) { setHistIdx(-1); setInput(""); } else { setHistIdx(idx); setInput(history[idx]); } }
								if (e.key === "c" && e.ctrlKey) { setInput(""); }
							}}
							onBlur={e => e.target.focus()}
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
