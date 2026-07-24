/** Shared site constants for the marketing Astro frontend. */

export const MEDIA = 'https://klaudiajaranowskamakeup.pl/wp-content/uploads';

export const IMAGES = {
	headerLogo: `${MEDIA}/2025/06/1-e1749237516820.png`,
	marqueeLogo: `${MEDIA}/2025/06/logo-napis.png`,
	footerLogo: `${MEDIA}/2025/05/image8.png`,
	hero: `${MEDIA}/2025/10/IMG_2031-scaled-e1761149728406.jpeg`,
	about: `${MEDIA}/2025/06/IMG_0147-scaled-e1768179865534.jpeg`,
	instagram: `${MEDIA}/2025/10/IMG_2036-scaled-e1761149605175.jpeg`,
	quoteMarks: `${MEDIA}/2025/06/Group-91-1.png`,
} as const;

export const SOCIAL = {
	instagram: 'https://www.instagram.com/klaudiajaranowskamakeup/',
	facebook: 'https://www.facebook.com/p/Klaudia-Jaranowska-MakeUp-100068526680261/',
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
	{ label: 'Szkolenia Stacjonarne', href: '/szkolenia-stacjonarne/' },
	{ label: 'Szkolenia Online', href: '/szkolenia-online/' },
	{ label: 'Lekcje Makijażu', href: '/lekcja-makijazu/' },
	{ label: 'Pakiet Ślubny', href: '/pakiet-slubny/' },
	{ label: 'Makijaże', href: '/makijaze/' },
] as const;

export const FOOTER_LINKS = [
	{ label: 'Blog', href: '/blog/' },
	{ label: 'Regulamin', href: '/regulamin/' },
	{ label: 'Polityka prywatności', href: '/polityka-prywatnosci/' },
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
