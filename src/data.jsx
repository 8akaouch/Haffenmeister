/* global React */

// ============================================================
// Content data — menu, drinks, events, etc.
// ============================================================

const SLIDES = [
  { id: "hero", label: "Ahoi" },
  { id: "intro", label: "Das Haus" },
  { id: "menu", label: "Küche" },
  { id: "drinks", label: "Bar" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Galerie" },
  { id: "reserve", label: "Reservieren" },
  { id: "contact", label: "Ankern" },
];

const MENU = {
  frühstück: [
    { name: "Hafenmeister-Frühstück", desc: "Rührei mit Kräutern, Bacon, Käse, Antipasti, Obst, Brot & Brötchen", price: "14,50", tag: "Signature" },
    { name: "Kapitäns-Platte", desc: "Lachs, Krabben, Rührei, Avocado, Gurke, Meerrettich-Dip", price: "16,90" },
    { name: "Süße Waffel", desc: "Belgische Waffel, Vanille-Quark, Beeren, Ahornsirup", price: "9,80" },
    { name: "Herzhafte Waffel", desc: "Parmesan, Rucola, Tomaten-Chutney", price: "10,50", tag: "Hausfavorit" },
    { name: "Overnight Oats", desc: "Haferflocken, Kokosmilch, Apfel, Zimt, Granola", price: "7,90" },
    { name: "Shakshuka", desc: "Zwei Eier in würziger Tomaten-Paprika-Sauce, Fladenbrot", price: "11,50" },
  ],
  mittag: [
    { name: "Hafenbowl", desc: "Quinoa, geröstete Kürbiskerne, Rote Bete, Avocado, Feta, Zitronen-Dressing", price: "13,80" },
    { name: "Saline-Flammkuchen", desc: "Schmand, Zwiebeln, Speck, Landkäse", price: "12,90", tag: "Klassiker" },
    { name: "Dorschfilet", desc: "Gebraten, Petersilienkartoffeln, Erbsenpüree, Zitronen-Butter", price: "19,50" },
    { name: "Pasta al Porto", desc: "Linguine, Gambas, Knoblauch, Chili, Weißwein, Kräuter", price: "16,90" },
    { name: "Rinderfilet-Steak", desc: "180 g, Rosmarinkartoffeln, Grüner Spargel, Pfeffersauce", price: "28,00" },
    { name: "Vegetarische Lasagne", desc: "Spinat, Zucchini, Bechamel, Bergkäse", price: "14,50" },
  ],
  snacks: [
    { name: "Käseplatte", desc: "Drei Sorten Käse, Trauben, Nüsse, Feigensenf, Baguette", price: "14,00" },
    { name: "Antipasti-Teller", desc: "Marinierte Oliven, Artischocken, Bruschetta, Serrano, Büffelmozzarella", price: "15,50" },
    { name: "Bruschetta Quartett", desc: "Vier Sorten: Klassik, Gorgonzola-Birne, Tapenade, Trüffel-Crema", price: "11,00" },
    { name: "Pommes mit Trüffel", desc: "Parmesan, Trüffel-Mayo", price: "8,50" },
    { name: "Oliven & Brot", desc: "Grüne & Kalamata Oliven, Olivenöl, Fladenbrot", price: "6,50" },
  ],
};

const DRINKS = {
  signature: [
    { name: "Hafenmeister Gin Tonic", desc: "Villa Ascenti Gin, Fever-Tree Mediterranean, Gurke, Rosa Pfeffer", price: "12,00", tag: "Signature" },
    { name: "Salty Dog Sour", desc: "Mezcal, Grapefruit, Agave, Meersalzflocken, Eiweiß", price: "13,50" },
    { name: "Kapitäns Negroni", desc: "Campari, Wermut, fass-gereifter Gin, Orangenzeste", price: "12,50" },
    { name: "Saale-Spritz", desc: "Hugo-Style mit Rhabarber, Holunder, Prosecco", price: "9,50" },
  ],
  klassiker: [
    { name: "Moscow Mule", desc: "Wodka, Fever-Tree Ginger Beer, Limette", price: "10,50" },
    { name: "Aperol Spritz", desc: "Aperol, Prosecco, Soda, Orange", price: "9,00" },
    { name: "Whiskey Sour", desc: "Bourbon, Zitrone, Zucker, Eiweiß, Angostura", price: "11,50" },
    { name: "Espresso Martini", desc: "Wodka, Kahlúa, frischer Espresso", price: "11,00" },
  ],
  alkoholfrei: [
    { name: "Virgin Mule", desc: "Ginger Beer, Limette, Minze, Gurke", price: "7,50" },
    { name: "Eigener Eistee", desc: "Schwarzer Tee, Pfirsich, Zitrone, hausgemacht", price: "5,50" },
    { name: "Fritz-Limo", desc: "Diverse Sorten, 0,33 l", price: "4,20" },
  ],
};

const EVENTS = [
  {
    num: "01",
    title: "Hochzeit",
    desc: "Ob intime Feier oder ganzes Deck: Wir schmücken, kochen und kümmern uns um jeden Moment — damit ihr einfach nur glücklich seid.",
    items: ["Bis 80 Gäste", "Indoor + Terrasse", "DJ & Musik möglich", "Übernachtung nebenan"],
  },
  {
    num: "02",
    title: "Weihnachtsfeier",
    desc: "Firmenfeier mit Stil: Glühwein an Deck, Menü oder Buffet, Gin-Tasting oder Dinnershow — ganz nach Crew-Größe.",
    items: ["10 – 120 Personen", "Menü oder Buffet", "Gin-Tasting", "Exklusive Nutzung"],
  },
  {
    num: "03",
    title: "Privates Event",
    desc: "Geburtstag, Taufe, Jubiläum oder einfach ein besonderer Abend — unser Haus wird für einen Tag ganz zu eurem.",
    items: ["Ab 20 Gästen", "Flexibles Catering", "Live-Cocktailbar", "Dekor-Konzept"],
  },
];

const GALLERY = [
  { src: "assets/bar.png", tag: "Bar · Gin-Auswahl", cls: "g-1" },
  { src: "assets/food.png", tag: "Käseplatte", cls: "g-2" },
  { src: "assets/collage.png", tag: "Impressionen", cls: "g-3" },
  { src: "assets/bar.png", tag: "Cocktails", cls: "g-4" },
  { src: "assets/food.png", tag: "Vom Chef", cls: "g-5" },
  { src: "assets/collage.png", tag: "Terrasse", cls: "g-6" },
];

const HOURS = [
  { day: "Mo", time: "Ruhetag", closed: true },
  { day: "Di", time: "09 – 22 Uhr" },
  { day: "Mi", time: "09 – 22 Uhr" },
  { day: "Do", time: "09 – 22 Uhr" },
  { day: "Fr", time: "09 – 24 Uhr" },
  { day: "Sa", time: "10 – 24 Uhr" },
  { day: "So", time: "10 – 20 Uhr" },
];

window.SLIDES = SLIDES;
window.MENU = MENU;
window.DRINKS = DRINKS;
window.EVENTS = EVENTS;
window.GALLERY = GALLERY;
window.HOURS = HOURS;
