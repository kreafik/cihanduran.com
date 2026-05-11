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
	line-height: 1.7;
	font-size: 0.88rem;
	overflow-x: hidden;

	a {
		color: ${theme.bodyFont2};
		text-decoration: none;
		&:hover { text-decoration: underline; }
	}
`;

const Block = styled.div`
	white-space: pre-wrap;
	word-break: break-word;
	margin: 0;
`;

const Divider = styled.div`
	color: ${theme.bodyFont3};
	margin: 0.5rem 0 0.1rem;
`;

const SectionTitle = styled.div`
	color: ${theme.bodyFont2};
	margin-bottom: 0.4rem;
`;

const Accent = styled.span`
	color: ${theme.bodyFont2};
`;

const Muted = styled.span`
	color: ${theme.bodyFont3};
`;

const Sub = styled.span`
	color: ${theme.bodyFont4};
	font-size: 0.82rem;
`;

const ServiceItem = styled.div`
	margin-bottom: 1rem;
	padding-left: 1.5rem;
`;

const ServiceHeader = styled.div`
	margin-bottom: 0.1rem;
`;

const sep = '━'.repeat(50);

const ResumeContent = () => (
	<BodyContent>
		<Wrapper>
			<Block>
				<Accent>{'$ cat resume.txt\n\n'}</Accent>
				<Accent>{'╔══════════════════════════════════════════════════╗\n'}</Accent>
				<Accent>{'║              CİHAN DURAN — ÖZGEÇMIŞ              ║\n'}</Accent>
				<Accent>{'╚══════════════════════════════════════════════════╝\n\n'}</Accent>

				<Muted>{'Ad Soyad    '}</Muted>{'  Cihan Duran\n'}
				<Muted>{'Konum       '}</Muted>{'  Bodrum, Muğla\n'}
				<Muted>{'Telefon     '}</Muted>{'  '}<a href="tel:+905415755520">+90 541 575 55 20</a>{'\n'}
				<Muted>{'E-posta     '}</Muted>{'  '}<a href="mailto:tasarim@cihanduran.com">tasarim@cihanduran.com</a>{'\n'}
				<Muted>{'Web         '}</Muted>{'  '}<a href="https://cihanduran.com" target="_blank" rel="noreferrer">cihanduran.com</a>{'\n'}
				<Muted>{'GitHub      '}</Muted>{'  '}<a href="https://github.com/kreafik" target="_blank" rel="noreferrer">github.com/kreafik</a>{'\n\n'}

				<Divider>{sep}</Divider>
				<SectionTitle>{'## HAKKIMDA\n'}</SectionTitle>
				{'  Bodrum merkezli, 10+ yıldır dijital tasarım ve yazılım\n'}
				{'  alanında serbest çalışan bir tasarımcı ve geliştirici.\n\n'}
				{'  Muğla\'nın turizm ve emlak ekosistemini yakından tanıyan\n'}
				{'  biri olarak; oteller, marina işletmeleri, yat charter\n'}
				{'  firmaları, emlak danışmanları ve küçük işletmeler için\n'}
				{'  dijital çözümler üretiyorum. Proje sürecini başından\n'}
				{'  sonuna tek elden yönetiyorum: strateji, tasarım, geliştirme.\n\n'}

				<Divider>{sep}</Divider>
				<SectionTitle>{'## EĞİTİM\n'}</SectionTitle>
				{'  '}<Accent>Dokuz Eylül Üniversitesi</Accent>{'\n'}
				{'  '}<Sub>Bilgisayar Mühendisliği</Sub>{'\n\n'}

				<Divider>{sep}</Divider>
				<SectionTitle>{'## DENEYİM\n'}</SectionTitle>
				{'  '}<Accent>Serbest Çalışan — Bodrum, Muğla</Accent>{'  '}<Sub>10+ yıl</Sub>{'\n\n'}
				{'  Bodrum yarımadası ve çevre ilçelerde faaliyet gösteren\n'}
				{'  işletmeler için web, görsel ve hava çekimi projeleri.\n\n'}
				{'  Yoğunlukla çalıştığım sektörler:\n'}
				{'  '}<Muted>→</Muted>{'  Turizm & konaklama (otel, butik pansiyon, villa kiralama)\n'}
				{'  '}<Muted>→</Muted>{'  Denizcilik (yat charter, gulet, marina işletmeleri)\n'}
				{'  '}<Muted>→</Muted>{'  Emlak (satılık & kiralık villa, daire, arazi)\n'}
				{'  '}<Muted>→</Muted>{'  Yerel işletmeler (restoran, kafe, dükkân)\n\n'}

				<Divider>{sep}</Divider>
				<SectionTitle>{'## HİZMETLER\n'}</SectionTitle>
			</Block>

			<ServiceItem>
				<ServiceHeader>
					{'['}<Accent>01</Accent>{'] Web Tasarım & Yazılım'}{'  '}<Sub>React · Vite · Node.js · WordPress · SEO</Sub>
				</ServiceHeader>
				{'  Bodrum\'daki işletmelerin dijital varlığını güçlendirmek için\n'}
				{'  kurumsal web siteleri, rezervasyon sistemleri ve e-ticaret\n'}
				{'  çözümleri geliştiriyorum. Lokal SEO çalışmalarıyla Google\'da\n'}
				{'  bölgeye özgü anahtar kelimelerde üst sıra hedefliyorum.\n'}
			</ServiceItem>

			<ServiceItem>
				<ServiceHeader>
					{'['}<Accent>02</Accent>{'] Drone Çekimi'}{'  '}<Sub>4K hava fotoğrafı & video · SHGM lisanslı</Sub>
				</ServiceHeader>
				{'  Bodrum, Marmaris, Fethiye ve Datça\'da profesyonel drone\n'}
				{'  çekimleri yapıyorum. Villa tanıtımları, yat ve tekne\n'}
				{'  çekimleri, otel ve tatil köyü videoları, inşaat ve\n'}
				{'  proje takip çekimleri başlıca uygulama alanlarım.\n'}
			</ServiceItem>

			<ServiceItem>
				<ServiceHeader>
					{'['}<Accent>03</Accent>{'] Emlak & Tekne Fotoğrafçılığı'}{'  '}<Sub>İç & dış mekan · yat · villa portföy</Sub>
				</ServiceHeader>
				{'  Sahibinden ilanlarından uluslararası portföylere kadar\n'}
				{'  satış ve kiralama amaçlı profesyonel fotoğraf ve video.\n'}
				{'  Airbnb, Booking ve yat kiralama platformlarına özel\n'}
				{'  yüksek dönüşümlü çekim paketleri.\n'}
			</ServiceItem>

			<ServiceItem>
				<ServiceHeader>
					{'['}<Accent>04</Accent>{'] Grafik Tasarım'}{'  '}<Sub>Logo · kurumsal kimlik · sosyal medya · baskı</Sub>
				</ServiceHeader>
				{'  Turizm ve denizcilik sektörüne yönelik logo ve marka\n'}
				{'  kimliği tasarımı. Kartvizit, broşür, tabela ve dijital\n'}
				{'  içerik şablonları dahil uçtan uca kurumsal kimlik.\n'}
			</ServiceItem>

			<Block>
				<Divider>{sep}</Divider>
				<SectionTitle>{'## TEKNİK BECERİLER\n'}</SectionTitle>
				{'  React · JavaScript · Node.js · HTML/CSS\n'}
				{'  WordPress · Vite · Git\n\n'}
				{'  Adobe Photoshop · Illustrator · InDesign\n'}
				{'  Figma · DaVinci Resolve\n\n'}
				{'  DJI Drone Serisi · SHGM İHA Lisansı\n'}
				{'  Google Analytics · Search Console · SEO\n\n'}

				<Divider>{sep}</Divider>
				<SectionTitle>{'## HİZMET BÖLGELERİ\n'}</SectionTitle>
				{'  Bodrum '}<Muted>(merkez)</Muted>{'\n'}
				{'  Yalıkavak · Turgutreis · Göltürkbükü · Gündoğan\n'}
				{'  Bitez · Gümbet · Torba · Ortakent\n\n'}
				{'  Marmaris · Fethiye · Datça\n\n'}

				<Divider>{sep}</Divider>
				{'\n$ '}<Accent>_</Accent>
			</Block>
		</Wrapper>
	</BodyContent>
);

export default ResumeContent;
