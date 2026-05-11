import neofetch from "@utils/neofetch";

const compileResponseHTML = styleMap => {
	return styleMap
		.map(item => {
			return `<span class="${
				item.folder
					? `style3`
					: `${item.executable ? `style2` : `style1`}`
			}">${
				item.link
					? `<a target="_blank" href="${item.link}">${item.name}</a>`
					: `${item.name}`
			}</span>`;
		})
		.join("  ");
};

const getSpaces = commandList => {
	let defaultSpaces = "\t";
	let lengthList = commandList.map(item => {
		return item.name.length;
	});
	let max = Math.max(...lengthList);
	let what = commandList.map(item => {
		return Array(max - item.name.length + 1).join(" ") + defaultSpaces;
	});
	return what;
};

const compileCommandHTML = commandList => {
	let defArgs = [
		{
			name: "ls",
			description: "dizin içeriğini listeler",
		},
		{
			name: "cd",
			description: "çalışma dizinini değiştirir",
		},
		{
			name: "clear",
			description: "terminal ekranını temizler",
		},
	];
	let argList = [
		...defArgs,
		...commandList.map(item => {
			let extra = " ";
			if (item.subPathStrict[0]) {
				extra += item.subPathStrict[1].name;
			}
			return {
				name: item.name[0] + extra,
				description: item.description,
			};
		}),
	];
	let spaceList = getSpaces(argList);
	let response = `ZSH version 5.9 (x86_64-apple-darwin22.0)
Bu kabuk komutları dahili olarak tanımlanmıştır.
Listeyi görmek için <span class="style2">'help'</span> yazın.\n\n`;
	argList.forEach((item, idx) => {
		let temp = `<span class="style2">${item.name}</span>${spaceList[idx]}${item.description}\n`;
		response += temp;
	});
	return `${response}\nVe daha fazla "gizli" komut...`;
};

let commandList = [
	{
		name: ["resume", "./resume", "resume.sh", "./resume.sh"],
		action: { RESUME: "" },
		response: "",
		subPathStrict: [false],
		description: "özgeçmişimi görüntüle",
	},
	{
		name: ["contact", "./contact", "contact.js", "./contact.js"],
		action: { CONTACT: "" },
		response: "",
		subPathStrict: [false],
		description: "benimle iletişime geç",
	},
	{
		name: ["projects", "./projects", "projects.app", "./projects.app"],
		action: false,
		response: "Yapım aşamasında 🚧🔨",
		subPathStrict: [false],
		description: "projelerimi incele",
	},
	{
		name: ["neofetch"],
		action: false,
		response: `<pre>${neofetch}</pre>`,
		subPathStrict: [false],
		description: "hakkımda bilgileri estetik bir şekilde görüntüle",
	},
	{
		name: ["code"],
		action: true,
		response: "",
		subPathStrict: [true, { name: ".", response: "" }],
		description: "bu sitenin kaynak kodunu görüntüle",
	},
	{
		name: ["danger"],
		action: true,
		response: "",
		subPathStrict: [false],
		description: '<span class="style7">¯\\_(ツ)_/¯</span>',
	},
	{
		name: ["git"],
		action: true,
		response: "",
		subPathStrict: [true, { name: "log", response: "" }],
		description: "GitHub projelerimi listele",
	},
	{
		name: ["iban", "./iban"],
		action: { IBAN: "" },
		response: "",
		subPathStrict: [false],
		description: "banka hesap numaralarını görüntüle",
	},
	{
		name: ["hizmetler", "./hizmetler", "services"],
		action: { HIZMETLER: "" },
		response: "",
		subPathStrict: [false],
		description: "sunduğum hizmetleri görüntüle",
	},
	{
		name: ["help"],
		action: true,
		response: "",
		subPathStrict: [false],
		description: "bu mesajı görüntüle",
	},
	{
		name: ["uname"],
		action: true,
		response:
			"Darwin MacBook-Pro.local 23.1.0 Darwin Kernel Version 23.1.0; root:xnu-10002.41.9~6/RELEASE_ARM64_T8103 arm64",
		subPathStrict: [false],
		description: "Darwin OS çekirdek versiyonunu yazdırır",
	},
	{
		name: ["whoami"],
		action: true,
		response: "Cihan Duran",
		subPathStrict: [false],
		description: "mevcut yöneticinin adını yazdırır",
	},
];

commandList = commandList.map(item => {
	if (item.name[0] === "help") {
		item.response = `<pre>${compileCommandHTML(commandList)}</pre>`;
	}
	return item;
});

const fileList = [
	{
		name: ".github",
		link: "https://github.com/cihanduran",
		folder: true,
		executable: false,
	},
	{
		name: "src",
		link: "https://github.com/cihanduran/cihanduran.com",
		folder: true,
		executable: false,
	},
	{
		name: "resume.sh",
		link: "",
		folder: false,
		executable: true,
	},
	{
		name: "projects.app",
		link: "",
		folder: false,
		executable: true,
	},
	{
		name: "contact.js",
		link: "",
		folder: false,
		executable: true,
	},
];

const getCommandList = commandList => {
	let finalCommandList = {};
	commandList.forEach(item => {
		let commandBuilder = {};
		item.name.forEach(elem => {
			let action = item.action
				? { [item.name[0].toUpperCase()]: "" }
				: null;
			let resp = item.response;
			commandBuilder = {
				[elem]: {
					validArgs: {
						_dir: {
							action: action,
							response: resp,
						},
						default: {
							action: action,
							response: resp,
						},
					},
				},
			};
			if (item.subPathStrict[0]) {
				commandBuilder[elem].validArgs[item.subPathStrict[1].name] = {
					action: action,
					response: item.subPathStrict[1].response,
				};
			}
			finalCommandList = { ...commandBuilder, ...finalCommandList };
		});
	});
	return finalCommandList;
};

const getArgListCd = fileList => {
	let defArgs = {
		_dir: {
			action: null,
			response: "",
		},
		default: {
			action: null,
			response: "cd: cannot access %arg%: Permission Denied",
		},
		"~": {
			action: null,
			response: "",
		},
	};
	let argList = {};
	fileList.forEach(item => {
		argList[item.name] = {
			action: item.folder ? { PATH: item.link } : null,
			response: item.folder ? "" : "zsh: cd: %arg%: Not a directory",
		};
	});
	Object.keys(defArgs).forEach(item => {
		argList[item] = defArgs[item];
	});
	return argList;
};

const commands = {
	ls: {
		validArgs: {
			"/": {
				action: null,
				response:
					"ls: cannot access System Volume Information: Permission Denied",
			},
			_dir: {
				action: null,
				response: compileResponseHTML(fileList),
			},
			default: {
				action: null,
				response: "ls: cannot access %arg%: Permission Denied",
			},
		},
	},
	cd: {
		validArgs: getArgListCd(fileList),
	},
	...getCommandList(commandList),
};

export default commands;
