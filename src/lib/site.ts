/** Shared site constants for the marketing Astro frontend. */

export const MEDIA = 'https://klaudiajaranowskamakeup.pl/wp-content/uploads';

export const IMAGES = {
	headerLogo: `${MEDIA}/2025/06/1-e1749237516820.png`,
	marqueeLogo: `${MEDIA}/2025/06/logo-napis.png`,
	footerLogo: `${MEDIA}/2025/05/image8.png`,
	hero: `${MEDIA}/2025/10/IMG_2031-scaled-e1761149728406.jpeg`,
	about: `${MEDIA}/2025/10/IMG_2036-scaled-e1761149605175.jpeg`,
	instagram: `${MEDIA}/2025/10/IMG_2036-scaled-e1761149605175.jpeg`,
	quoteMarks: `${MEDIA}/2025/06/Group-91-1.png`,
} as const;

export const SOCIAL = {
	instagram: 'https://www.instagram.com/klaudiajaranowskamakeup/',
	facebook: 'https://www.facebook.com/p/Klaudia-Jaranowska-MakeUp-100068526680261/',
	tiktok: 'https://www.tiktok.com/@jaranowskamakeup',
} as const;

export type NavItem = {
	label: string;
	href: string;
	children?: { label: string; href: string }[];
};

export const PRIMARY_NAV: NavItem[] = [
	{ label: 'Makijaże', href: '/makijaze/' },
	{ label: 'Pakiet ślubny', href: '/pakiet-slubny/' },
	{ label: 'Lekcja Makijażu', href: '/lekcja-makijazu/' },
	{
		label: 'Szkolenia',
		href: '/szkolenia-stacjonarne/',
		children: [
			{ label: 'Szkolenia Online', href: '/szkolenia-online/' },
			{ label: 'Szkolenia Stacjonarne', href: '/szkolenia-stacjonarne/' },
		],
	},
	{ label: 'Kontakt', href: '/kontakt/' },
];

export const OFFER_LINKS = [
	{
		label: 'Szkolenia Stacjonarne',
		href: '/szkolenia-stacjonarne/',
		image: `${MEDIA}/2026/03/IMG_7023-scaled-e1772372826108.jpeg`,
	},
	{
		label: 'Szkolenia Online',
		href: '/szkolenia-online/',
		image: `${MEDIA}/2025/11/IMG_3040-scaled-e1763840610536.jpeg`,
	},
	{
		label: 'Lekcje Makijażu',
		href: '/lekcja-makijazu/',
		image: `${MEDIA}/2026/01/IMG_7546-e1768179680339.jpeg`,
	},
	{
		label: 'Pakiet Ślubny',
		href: '/pakiet-slubny/',
		image: `${MEDIA}/2025/06/IMG_0144-scaled-e1749246815865.jpeg`,
	},
	{
		label: 'Makijaże',
		href: '/makijaze/',
		image: `${MEDIA}/2025/09/image2-scaled-e1758305707207.jpeg`,
	},
] as const;

export const FOOTER_LINKS = [
	{ label: 'Blog', href: '/blog/' },
	{ label: 'Regulamin', href: '/regulamin/' },
	{ label: 'Polityka prywatności', href: '/polityka-prywatnosci/' },
] as const;

export const MAKIJAZE_SERVICES = [
	{ label: 'Makijaż ślubny/próbny', price: '280zł' },
	{ label: 'Makijaż wieczorowy', price: '250zł' },
	{ label: 'Makijaż do sesji zdjęciowych', price: '250zł' },
	{ label: 'Makijaż biznesowy', price: '250zł' },
	{ label: 'Makijaż w niedzielę i święta', price: '280zł' },
] as const;

export const PAKIET_SLUBNY = {
	price: '2300zł',
	image: `${MEDIA}/2025/06/IMG_0147-scaled-e1768179865534.jpeg`,
	includes: ['Makijaż ślubny', '4 Makijaże dla gości weselnych'],
	notes: [
		'Dojazd do 30 km - w cenie pakietu. Dalsze lub zagraniczne dojazdy wyceniane są indywidualnie.',
		'Pakiet Poprawinowy w promocyjnej cenie - jeśli zdecydujesz się na makijaż poprawinowy, otrzymasz go w specjalnej ofercie.',
		'Zmiana liczby osób - jeśli liczba osób w pakiecie ulegnie zmniejszeniu, cena nie ulega zmianie. W przypadku zwiększenia liczby osób obowiązuje dopłata w wysokości 400zł za każdą dodatkową osobę.',
		'Gwarancją rezerwacji terminu jest podpisanie umowy i wpłata zadatku.',
		'Pakiet nie zawiera makijażu próbnego ślubnego.',
	],
	salons: ['Łódź, Mikołaja Kopernika 17', 'Sieradz, Ogrodowa 5'],
} as const;

const LEKCJA_NOTES = [
	'Zapewniam kosmetyki na lekcję makijażu dziennego i wieczorowego',
	'W czasie trwania kursu dostępne są napoje i poczęstunek.',
	'Lekcja makijażu odbywa się w moim salonie w Łodzi, Mikołaja Kopernika 17',
] as const;

export const LEKCJA_MAKIJAZU = [
	{
		id: 'dzienny',
		title: 'Makijaż dzienny',
		subtitle: 'lekcja indywidualna',
		price: '600zł',
		duration: '2-2,5h',
		image: `${MEDIA}/2026/03/IMG_7173-e1772373869452.png`,
		scope: [
			'Określenie typu skóry i jej potrzeb',
			'Dobór odpowiedniej pielęgnacji',
			'Dobór i aplikacja podkładu, korektora, pudru',
			'Modelowanie twarzy, techniką na mokro i na sucho',
			'Subtelne podkreślenie oka - cienie, kreski, tusz do rzęs',
			'Stylizacja i wypełnianie brwi',
			'Modelowanie kształtu ust - wyrównanie proporcji i nadanie objętości makijażem',
		],
		notes: LEKCJA_NOTES,
	},
	{
		id: 'wieczorowy',
		title: 'Makijaż wieczorowy',
		subtitle: 'lekcja indywidualna',
		price: '700zł',
		duration: '2,5-3h',
		image: `${MEDIA}/2025/09/IMG_3312-scaled-e1763841505975.jpeg`,
		scope: [
			'Dostosowanie pielęgnacji do jej indywidualnych wymagań',
			'Techniki aplikacji korektora, podkładu i pudru dopasowanych do typu cery',
			'Trójwymiarowe modelowanie twarzy z użyciem metod konturowania na sucho i mokro',
			'Techniki pracy z cieniami i pigmentami',
			'Perfekcyjna kreska',
			'Klejenie kępek rzęs',
			'Stylizacja i wypełnianie brwi',
			'Podkreślenie ust z uwzględnieniem korekty asymetrii i technik optycznego powiększenia',
		],
		notes: LEKCJA_NOTES,
	},
] as const;

export const TESTIMONIALS = [
	{
		quote:
			'Makijaż wytrzymał cały wieczór, zdecydowanie będę polecać, nigdy nie czułam się tak pięknie!',
		author: 'Ania W.',
	},
	{
		quote: 'Świetnie przeprowadzone szkolenie! Pełen profesjonalizm i zaangażowanie',
		author: 'Maria D.',
	},
	{
		quote: 'Dziękuję za piękny makeup. Bardzo serdecznie polecam',
		author: 'Magdalena I.',
	},
	{
		quote: 'Polecam! Makijaż trwały, wykonany z dbałością o każdy szczegół',
		author: 'Wiktoria P.',
	},
] as const;
