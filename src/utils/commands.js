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
		...commandList
			.filter(item => !item.hidden)
			.map(item => {
				let extra = " ";
				if (item.subPathStrict[0] && !item.hideSubPath) {
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
		name: ["resume", "./resume", "resume.sh", "./resume.sh", "cv", "./cv", "ozgecmis"],
		action: { RESUME: "" },
		response: "",
		subPathStrict: [false],
		description: "özgeçmişimi görüntüle",
	},
	{
		name: ["contact", "./contact", "contact.js", "./contact.js", "iletisim", "whatsapp", "mesaj", "yazisma"],
		action: { CONTACT: "" },
		response: "",
		subPathStrict: [false],
		description: "benimle iletişime geç",
	},
	{
		name: ["projects", "./projects", "projects.app", "./projects.app", "portfolio", "./portfolio", "proje", "work"],
		action: { PROJECTS: "" },
		response: "",
		subPathStrict: [false],
		description: "projelerimi incele",
	},
	{
		name: ["neofetch", "about", "info", "fetch", "hakkimda"],
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
		hidden: true,
	},
	{
		name: ["danger"],
		action: true,
		response: "",
		subPathStrict: [false],
		description: '<span class="style7">¯\\_(ツ)_/¯</span>',
	},
	{
		name: ["git", "github"],
		action: true,
		response: "",
		subPathStrict: [true, { name: "log", response: "" }],
		description: "GitHub projelerimi listele",
		hideSubPath: true,
	},
	{
		name: ["iban", "./iban", "banka", "hesap", "bank", "para"],
		action: { IBAN: "" },
		response: "",
		subPathStrict: [false],
		description: "banka hesap numaralarını görüntüle",
	},
	{
		name: ["hizmetler", "./hizmetler", "services", "service", "hizmet"],
		action: { HIZMETLER: "" },
		response: "",
		subPathStrict: [false],
		description: "sunduğum hizmetleri görüntüle",
	},
	{
		name: ["web", "webdesign", "yazilim", "website", "software"],
		action: { WEB: "" },
		response: "",
		subPathStrict: [false],
		description: "web tasarım & yazılım hizmetini görüntüle",
	},
	{
		name: ["grafik", "design", "graphic", "logo", "tasarim"],
		action: { GRAFIK: "" },
		response: "",
		subPathStrict: [false],
		description: "grafik tasarım hizmetini görüntüle",
	},
	{
		name: ["drone", "./drone", "hava", "havadan", "aerial"],
		action: { DRONE: "" },
		response: "",
		subPathStrict: [false],
		description: "drone çekimi hizmetini görüntüle",
	},
	{
		name: ["foto", "photo", "fotograf", "photograph", "video", "emlak", "tekne"],
		action: { FOTO: "" },
		response: "",
		subPathStrict: [false],
		description: "fotoğraf & video hizmetini görüntüle",
	},
	{
		name: ["date", "time", "tarih", "saat"],
		action: false,
		response: () => new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }),
		subPathStrict: [false],
		description: "mevcut tarih ve saati yazdırır",
	},
	{
		hidden: true,
		name: ["cat about.txt", "cat"],
		action: false,
		response: `<span class="style4">Hakkımda:</span>\n\nBodrum / Muğla merkezli çalışan bir tasarımcı ve yazılımcıyım.\nWeb tasarım & yazılım, drone çekimi, emlak & tekne fotoğrafçılığı\nve grafik tasarım alanlarında hizmet veriyorum.\n\n<span class="style2">E-posta:  </span><a target="_blank" href="mailto:tasarim@cihanduran.com">tasarim@cihanduran.com</a>\n<span class="style2">WhatsApp: </span><a target="_blank" href="https://wa.me/905415755520">+90 541 575 55 20</a>\n<span class="style2">GitHub:   </span><a target="_blank" href="https://github.com/kreafik">github.com/kreafik</a>`,
		subPathStrict: [false],
		description: "about.txt dosyasını görüntüle",
	},
	{
		hidden: true,
		name: ["curl cihanduran.com", "curl"],
		action: false,
		response: `<span class="style4">HTTP/2 200</span>\ncontent-type: text/html; charset=utf-8\nserver: Vercel\n\n<span class="style2">Zaten buradasın :)</span>`,
		subPathStrict: [false],
		description: "cihanduran.com adresine istek gönder",
	},
	{
		name: ["help", "?", "man", "komutlar", "commands"],
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
		hidden: true,
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
		link: "https://github.com/kreafik",
		folder: true,
		executable: false,
	},
	{
		name: "src",
		link: "https://github.com/kreafik/cihanduran.com",
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
		name: "hizmetler.app",
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
	{
		name: "drone.sh",
		link: "",
		folder: false,
		executable: true,
	},
	{
		name: "iban.sh",
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
