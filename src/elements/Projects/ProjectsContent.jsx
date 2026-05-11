import React from "react";
import styled from "styled-components";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import BodyContent from "@elements/Window/BodyContent";
import theme from "@styles/theme";

const Wrapper = styled(SimpleBar)`
	font-family: "Hack", monospace;
	color: ${theme.bodyFont1};
	.simplebar-scrollbar:before {
		border-radius: 10px;
		background-color: ${theme.scrollbarThumb};
	}
	padding: 1.25rem 1.5rem;
	width: 100%;
	max-height: 80vh;
	line-height: 1.65;
	font-size: 0.88rem;
	overflow-x: hidden;

	a {
		color: ${theme.bodyFont2};
		text-decoration: none;
		&:hover { text-decoration: underline; }
	}
`;

const Accent = styled.span` color: ${theme.bodyFont2}; `;
const Muted  = styled.span` color: ${theme.bodyFont3}; `;
const Tag    = styled.span` color: ${theme.bodyFont4}; font-size: 0.8rem; `;

const SectionTitle = styled.div`
	color: ${theme.bodyFont2};
	margin: 1rem 0 0.3rem;
`;

const Divider = styled.div`
	color: ${theme.bodyFont3};
	margin: 0.1rem 0;
`;

const Row = styled.div`
	display: flex;
	gap: 0.75rem;
	padding-left: 1.5rem;
	flex-wrap: wrap;
	align-items: baseline;
`;

const sep = '━'.repeat(50);

const projects = {
	"Otel & Konaklama": [
		{ name: "Akyalı Butik Hotel",      url: "akyalibutikhotel.com" },
		{ name: "Artunç Otel",             url: "artuncotel.com" },
		{ name: "Boti Otel",               url: "botiotel.com" },
		{ name: "Gündoğan Suites",         url: "gundogansuites.com" },
		{ name: "Halikarya Hotel",         url: "halikaryahotel.com" },
		{ name: "In One Hotel",            url: "inonehotel.com" },
		{ name: "Noa Suite Hotel",         url: "noasuitehotel.com" },
		{ name: "Orion Hotel",             url: "orionhotel.com.tr" },
		{ name: "Orkide Otel",             url: "orkideotel.com" },
		{ name: "Sandora Boutique Hotel",  url: "sandoraboutiquehotel.com" },
		{ name: "Tuna Otel",               url: "tunaotel.com" },
		{ name: "Vava Suite",              url: "vavasuite.com" },
	],
	"Denizcilik & Yat": [
		{ name: "Efe Boat Marine",   url: "efeboatmarine.com" },
		{ name: "Let's Dance Yacht", url: "letsdanceyacht.com" },
		{ name: "Sunset Gulet",      url: "sunsetgulet.com" },
		{ name: "THT Yachting",      url: "thtyachting.com" },
		{ name: "Troya Denizcilik",  url: "troyadenizcilik.com" },
	],
	"Emlak & Kiralama": [
		{ name: "Bodrum Kiralama",  url: "bodrumkiralama.com" },
		{ name: "Bodrumobile",      url: "bodrumobile.com" },
		{ name: "İnce Rent A Car",  url: "incerentacar.com" },
		{ name: "Monte Car Rent",   url: "montecarrent.com" },
		{ name: "Mucho Real Estate",url: "muchorealestate.com" },
		{ name: "Myndos Emlak",     url: "myndosemlak.com.tr" },
		{ name: "Olive Tree Bodrum",url: "olivetreebodrum.com" },
		{ name: "Safir Villaları",  url: "safirvillalari.com" },
		{ name: "Villa Eissa",      url: "villaeissa.com" },
	],
	"İnşaat & Tasarım": [
		{ name: "Akademi İnşaat",  url: "akademiinsaat.com.tr" },
		{ name: "Aslantaş İnşaat", url: "aslantasinsaat.com.tr" },
		{ name: "Berev Interior",  url: "berevint.com" },
		{ name: "CC İnşaat",       url: "ccinsaat.com" },
		{ name: "İpeks Home Design",url: "ipekshomedesign.com" },
		{ name: "Vesaire Mimarlık",url: "vesairemimarlik.com" },
	],
	"Sağlık & Güzellik": [
		{ name: "Dr. İsmet Hisar",     url: "drismethisar.com" },
		{ name: "Dr. Sword",           url: "drsword.com.tr" },
		{ name: "HTB Massage",         url: "htbmassage.com" },
		{ name: "Pearl Beauty Bodrum", url: "pearlbeautybodrum.com" },
		{ name: "Unimed",              url: "unimed.com.tr" },
	],
	"Ajans & Medya": [
		{ name: "Gorilla Travel Agency", url: "gorillatravelagency.com" },
		{ name: "Krea Dev",              url: "krea.dev" },
		{ name: "Kreafik",               url: "kreafik.com" },
		{ name: "Mucho",                 url: "mucho.com.tr" },
		{ name: "Mucho Concept",         url: "muchoconcept.com" },
		{ name: "Mucho Lab",             url: "mucholab.com" },
		{ name: "Mucho Medya",           url: "muchomedya.com" },
		{ name: "SC Reklam",             url: "screklam.com.tr" },
		{ name: "The Prime Tour",        url: "theprimetour.com" },
	],
	"Diğer": [
		{ name: "Aion Kulüp",                    url: "aionkulup.com" },
		{ name: "Akademi Analiz",                url: "akademianaliz.com.tr" },
		{ name: "Aquas Fuels",                   url: "aquasfuels.com" },
		{ name: "Aras ORR",                      url: "arasorr.com" },
		{ name: "Asmak Karot Bodrum",            url: "asmakkarotbodrum.com.tr" },
		{ name: "Ateşay",                        url: "atesay.com" },
		{ name: "Bodrum Black Pearl",            url: "bodrumblackpearl.com" },
		{ name: "Bodrum Kayrak",                 url: "bodrumkayrak.com" },
		{ name: "Castello",                      url: "castello.com.tr" },
		{ name: "Ece Ödül",                      url: "eceodul.com" },
		{ name: "Gaya Atölye",                   url: "gayaatolye.com" },
		{ name: "General Kilit",                 url: "generalkilit.com" },
		{ name: "Gültekin Aydemir",              url: "gultekinaydemir.com" },
		{ name: "İstif Concept",                 url: "istifconcept.com" },
		{ name: "Makel",                         url: "mak-el.com.tr" },
		{ name: "Mandalin Bahçesi",              url: "mandalinbahcesi.com" },
		{ name: "MER Mühendislik",               url: "mermuhendislik.com.tr" },
		{ name: "Narin Mermer",                  url: "narinmermer.com" },
		{ name: "Onel Group",                    url: "onelgroup.com" },
		{ name: "Sare Perdecioğlu Hukuk Bürosu", url: "sareperdecioglu.av.tr" },
		{ name: "Yıldız Garage",                 url: "yildizgarage.com" },
	],
};

const total = Object.values(projects).reduce((s, a) => s + a.length, 0);

const ProjectsContent = () => (
	<BodyContent>
		<Wrapper>
			<div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
				<Accent>$ ls -la ~/projects/</Accent>{"\n\n"}
				<Muted>toplam </Muted><Accent>{total} proje</Accent>
				{"  "}<Tag>// tıkla → siteyi aç</Tag>{"\n"}
				<Divider>{sep}</Divider>

				{Object.entries(projects).map(([category, items]) => (
					<div key={category}>
						<SectionTitle>{"## "}{category}<Tag>{"  ("}{items.length}{")"}</Tag></SectionTitle>
						{items.map(({ name, url }) => (
							<Row key={url}>
								<Muted>→</Muted>
								<a href={`https://${url}`} target="_blank" rel="noreferrer">{name}</a>
								<Tag>{url}</Tag>
							</Row>
						))}
						{"\n"}
					</div>
				))}

				<Divider>{sep}</Divider>
				{"\n$ "}<Accent>_</Accent>
			</div>
		</Wrapper>
	</BodyContent>
);

export default ProjectsContent;
