# Site structure - klaudiajaranowskamakeup.pl

Source site: [https://klaudiajaranowskamakeup.pl](https://klaudiajaranowskamakeup.pl)

Inventory built from Yoast sitemaps plus primary navigation and footer links.
Per-page copy and image URLs: `docs/pages/`.

## Information architecture

```text
Home (/)
├── Makijaże (/makijaze/)
├── Pakiet ślubny (/pakiet-slubny/)
├── Lekcja makijażu (/lekcja-makijazu/)
├── Szkolenia
│   ├── Szkolenia online (/szkolenia-online/)  [WooCommerce product archive]
│   │   ├── Classy Bride Make Up (/szkolenia-online/classy-bride-make-up/)
│   │   └── Foxy Eye Masterclass (/szkolenia-online/foxy-eye-masterclass/)
│   └── Szkolenia stacjonarne (/szkolenia-stacjonarne/)
├── Kontakt (/kontakt/)
├── Moje konto (/moje-konto/)
├── Koszyk (/koszyk/)
│   ├── /koszyk-2/
│   └── /zamowienie/  → currently redirects to /koszyk/
├── Checkout (/checkout/)
├── Blog (/blog/)  → currently a 404-style empty state
├── Regulamin (/regulamin/)
├── Polityka prywatności (/polityka-prywatnosci/)
└── LMS / Tutor LMS
    ├── Kokpit (/kokpit/)
    ├── Rejestracja studenta (/rejestracja-studenta/)
    ├── Rejestracja wykładowcy (/rejestracja-wykladowcy/)
    ├── Kursy listing (/szkoleniaa/)
    └── Kurs: Foxy Eye Masterclass (/szkoleniaa/foxy-eye-masterclass/)
```

## Shared chrome

### Header

- Logo lockup linking home
- Nav: Makijaże, Pakiet ślubny, Lekcja Makijażu, Szkolenia (Online / Stacjonarne), Kontakt
- Utility: Moje Konto, Koszyk

### Footer

- Klaudia Jaranowska | Sieradz |
- Makijaż tworzony z pasją – specjalistka od naturalnego glow i kobiecej elegancji.
- Links: BLOG, REGULAMIN, POLITYKA PRYWATNOŚCI
- Social: Instagram, Facebook
- Copyright + Dreamwave Digital credit

## Homepage section flow

1. Hero - intro + `POZNAJ MOJĄ OFERTĘ` (full-bleed background photo)
2. Marquee - repeating `logo-napis.png`
3. Oferta - linked service list
4. About - `Sprawię, że poczujesz się PIĘKNIE I PEWNIE!` + CTA `DOWIEDZ SIĘ WIĘCEJ`
5. Testimonials - `WASZE SŁOWA` carousel
6. Instagram CTA - `Zobacz jak pracuję!`
7. Footer

## Page inventory

| Page | URL | Doc |
|---|---|---|
| Strona Główna - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/ | [pages/strona-glowna.md](pages/strona-glowna.md) |
| Makijaże - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/makijaze/ | [pages/makijaze.md](pages/makijaze.md) |
| Pakiet ślubny - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/pakiet-slubny/ | [pages/pakiet-slubny.md](pages/pakiet-slubny.md) |
| Lekcja Makijażu - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/lekcja-makijazu/ | [pages/lekcja-makijazu.md](pages/lekcja-makijazu.md) |
| Szkolenia Online - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/szkolenia-online/ | [pages/szkolenia-online.md](pages/szkolenia-online.md) |
| Szkolenia Stacjonarne - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/szkolenia-stacjonarne/ | [pages/szkolenia-stacjonarne.md](pages/szkolenia-stacjonarne.md) |
| Kontakt - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/kontakt/ | [pages/kontakt.md](pages/kontakt.md) |
| Regulamin - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/regulamin/ | [pages/regulamin.md](pages/regulamin.md) |
| Polityka Prywatności - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/polityka-prywatnosci/ | [pages/polityka-prywatnosci.md](pages/polityka-prywatnosci.md) |
| Moje konto - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/moje-konto/ | [pages/moje-konto.md](pages/moje-konto.md) |
| Koszyk - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/koszyk/ | [pages/koszyk.md](pages/koszyk.md) |
| Koszyk - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/koszyk-2/ | [pages/koszyk-2.md](pages/koszyk-2.md) |
| Checkout - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/checkout/ | [pages/checkout.md](pages/checkout.md) |
| Koszyk - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/koszyk/ | [pages/zamowienie.md](pages/zamowienie.md) |
| CLASSY BRIDE MAKE-UP - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/szkolenia-online/classy-bride-make-up/ | [pages/produkt-classy-bride-make-up.md](pages/produkt-classy-bride-make-up.md) |
| Foxy Eye Masterclass - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/szkolenia-online/foxy-eye-masterclass/ | [pages/produkt-foxy-eye-masterclass.md](pages/produkt-foxy-eye-masterclass.md) |
| Archiwa kursy - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/kategoria-produktu/kursy/ | [pages/kategoria-produktu-kursy.md](pages/kategoria-produktu-kursy.md) |
| Archiwum Kursy - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/szkoleniaa/ | [pages/kursy-szkoleniaa.md](pages/kursy-szkoleniaa.md) |
| Foxy Eye Masterclass - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/szkoleniaa/foxy-eye-masterclass/ | [pages/kurs-foxy-eye-masterclass.md](pages/kurs-foxy-eye-masterclass.md) |
| Kokpit - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/kokpit/ | [pages/kokpit.md](pages/kokpit.md) |
| Rejestracja studenta - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/rejestracja-studenta/ | [pages/rejestracja-studenta.md](pages/rejestracja-studenta.md) |
| Rejestracja wykładowcy - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/rejestracja-wykladowcy/ | [pages/rejestracja-wykladowcy.md](pages/rejestracja-wykladowcy.md) |
| Blog - Klaudia Jaranowska Makeup | https://klaudiajaranowskamakeup.pl/blog/ | [pages/blog.md](pages/blog.md) |

## Notes

- Image lists prefer canonical upload URLs (WordPress `-WxH` size variants collapsed).
- CSS background hero/section photos may appear only after browser paint; homepage backgrounds were verified live.
- `/szkolenia-online/` is the WooCommerce shop archive for online courses.
- Tutor LMS course URLs use `/szkoleniaa/` (double `a`).
