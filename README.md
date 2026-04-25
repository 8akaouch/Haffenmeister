# Hafenmeister & Docks

Website für **Hafenmeister & Docks** — Café, Bar & Events in Halle (Saale), gegründet 2018.  
Pfälzer Straße 4 · 06108 Halle · `51°28′48″N 11°58′14″E`

---

## Überblick

Eine vollständige One-Page-Website im Fullscreen-Slide-Stil. Jede Sektion belegt den kompletten Viewport; Navigation erfolgt per Scroll, Wischgeste oder Tastatur.

| Slide | Inhalt |
|-------|--------|
| 01 Hero | Begrüßung, CTA-Buttons, Öffnungszeiten-Schnellinfo |
| 02 Das Haus | Über das Lokal, drei Kernbereiche (Café · Bar · Events) |
| 03 Küche | Speisekarte (Frühstück, Mittag & Abend, Snacks) mit Tab-Filter |
| 04 Bar | Cocktailkarte (Signature, Klassiker, Alkoholfrei) mit Tab-Filter |
| 05 Events | Hochzeiten, Weihnachtsfeiern, Private Events |
| 06 Galerie | Bildergalerie mit Lightbox |
| 07 Reservieren | Tisch-Reservierung & Event-Anfrage per Formular |
| 08 Ankern | Öffnungszeiten, Kontakt & maritime SVG-Karte |

---

## Tech-Stack

- **React 18** (via CDN — kein Build-Schritt erforderlich)
- **Babel Standalone** — JSX direkt im Browser
- **Vanilla CSS** mit CSS Custom Properties
- **Google Fonts** — Cormorant Garamond · Inter · JetBrains Mono

Keine npm-Installation, kein Bundler, keine lokalen Abhängigkeiten.

---

## Projektstruktur

```
Haffenmeister_Kaffee (2)/
├── index.html              # Einstiegspunkt, lädt React & Babel via CDN
├── styles.css              # Design-System (Dark/Light-Theme, alle Komponenten)
├── assets/
│   ├── logo.png
│   ├── bar.png
│   ├── food.png
│   └── collage.png
├── debug/                  # Hero-Bilder (hero.png – hero4.png)
├── uploads/                # Hochgeladene Rohbilder
└── src/
    ├── app.jsx             # Haupt-App, Navigation (Keyboard · Scroll · Touch)
    ├── data.jsx            # Alle Inhaltsdaten (Menü, Drinks, Events, Zeiten)
    ├── icons.jsx           # SVG-Icons & Wellen-Motiv
    ├── ui.jsx              # Shared UI (Topbar, Dots, Footer, Toast, Lightbox)
    ├── slides-intro.jsx    # Slide 01 Hero + 02 Das Haus
    ├── slides-menu.jsx     # Slide 03 Küche + 04 Bar
    ├── slides-events.jsx   # Slide 05 Events + 06 Galerie
    └── slides-contact.jsx  # Slide 07 Reservieren + 08 Ankern
```

---

## Lokal starten

Da kein Build-Schritt nötig ist, reicht ein einfacher lokaler Server:

```bash
# Python 3
cd "Haffenmeister_Kaffee (2)"
python3 -m http.server 8080
# → http://localhost:8080
```

```bash
# Node.js (npx)
npx serve "Haffenmeister_Kaffee (2)"
```

> **Wichtig:** Die Dateien müssen über HTTP(S) geliefert werden.  
> Das direkte Öffnen von `index.html` per Doppelklick (`file://`) funktioniert nicht.

---

## Navigation

| Eingabe | Aktion |
|---------|--------|
| Scroll / Mausrad | Nächste / vorherige Seite |
| Swipe (Touch) | Nächste / vorherige Seite |
| `↓` / `Space` / `PageDown` | Vorwärts |
| `↑` / `PageUp` | Zurück |
| `Home` / `End` | Erste / letzte Seite |
| Dots (rechts) | Direkt zu einer Seite springen |
| Topbar-Navigation | Direkt zu einer Seite springen |

---

## Theme

Dark Mode ist Standard. Wechsel per Sonne/Mond-Button in der Topbar.  
Die Einstellung wird in `localStorage` gespeichert (`hmd.theme`).

---

## Inhalte anpassen

Alle Texte, Preise, Öffnungszeiten und Events befinden sich ausschließlich in:

```
src/data.jsx
```

Dort sind folgende Datenstrukturen definiert:

| Variable | Inhalt |
|----------|--------|
| `SLIDES` | Reihenfolge & Labels der Navigation |
| `MENU` | Speisekarte (frühstück · mittag · snacks) |
| `DRINKS` | Cocktailkarte (signature · klassiker · alkoholfrei) |
| `EVENTS` | Event-Typen mit Beschreibung & Features |
| `GALLERY` | Galerie-Bilder |
| `HOURS` | Wochentage & Öffnungszeiten |

---

## Kontakt

| | |
|--|--|
| Adresse | Pfälzer Straße 4, 06108 Halle (Saale) |
| Telefon | 0345 24983524 |
| E-Mail | hafenmeisterunddocks@mail.de |
| Instagram | @hafenmeisterdocks |
