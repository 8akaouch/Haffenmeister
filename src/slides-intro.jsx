/* global React, Icon, Waves */

// ============================================================
// Slide 1 — Hero
// ============================================================
function SlideHero({ onNav, active }) {
  return (
    <section className={`slide hero ${active ? "active" : ""}`} data-screen-label="01 Hero">
      <div className="hero-bg" />
      <div className="hero-veil" />

      {/* Decorative large year in background */}
      <div className="hero-seit" aria-hidden="true">2018</div>

      <div className="hero-content">
        <div className="hero-top">
          <span className="kicker anim" style={{ "--d": "0.08s" }}>Ahoi — Willkommen an Bord</span>

          {/* Animated accent line before headline */}
          <span className="hero-line" aria-hidden="true" />

          <h1 className="display anim" style={{ "--d": "0.22s", marginTop: 0, maxWidth: "14ch" }}>
            Café, Bar &amp; <em>gute Zeit</em><br />an der Saale.
          </h1>
          <p className="lede anim" style={{ "--d": "0.42s", marginTop: 26 }}>
            Zwischen Saline und Strom. Tagsüber Frühstück und Kaffee, abends Cocktails und kleine Feste —
            seit 2018 zu Hause in Halle.
          </p>
          <div className="anim" style={{ "--d": "0.58s", marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => onNav(6)}>
              Tisch reservieren <Icon.Arrow />
            </button>
            <button className="btn ghost" onClick={() => onNav(2)}>
              Speisekarte
            </button>
          </div>
        </div>

        <div className="hero-bot anim-fade" style={{ "--d": "0.75s" }}>
          <div className="hero-meta">
            <div className="hero-meta-cell">
              <div className="eyebrow">Heute geöffnet</div>
              <div className="v">09 – 22 Uhr</div>
            </div>
            <div className="hero-meta-cell">
              <div className="eyebrow">Position</div>
              <div className="v">Pfälzer Str. 4</div>
            </div>
            <div className="hero-meta-cell">
              <div className="eyebrow">Reservierung</div>
              <div className="v">0345 24983524</div>
            </div>
          </div>
          <Waves width={200} height={20} />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Slide 2 — Intro / About
// ============================================================
function SlideIntro({ active }) {
  return (
    <section className={`slide intro ${active ? "active" : ""}`} data-screen-label="02 Das Haus">
      <div className="intro-grid">
        <div>
          <span className="kicker anim" style={{ "--d": "0.1s" }}>Das Haus · Kap. 01</span>
          <h2 className="headline anim" style={{ "--d": "0.2s", marginTop: 16, maxWidth: "12ch" }}>
            Ein Hafen für <em>jede Tageszeit.</em>
          </h2>
          <p className="body-text anim" style={{ "--d": "0.4s", marginTop: 28 }}>
            Hafenmeister &amp; Docks liegt an der Pfälzer Straße, nur ein paar Schritte von der
            Schwimmhalle Saline entfernt. Morgens schenken wir Filterkaffee aus. Mittags gibt's was
            Warmes. Am Nachmittag ziehen Kuchenteller durch die Reihen. Und sobald die Sonne
            untergeht, zünden wir die Kerzen an und öffnen die Bar.
          </p>
          <p className="body-text anim" style={{ "--d": "0.5s", marginTop: 18 }}>
            Drei Stimmungen, ein Haus — plus eine Terrasse, auf der du dir ab Mai den halben
            Sommer wegtrinken kannst.
          </p>

          <div className="grid-3 anim" style={{ "--d": "0.65s", marginTop: 48, gap: 28 }}>
            {[
              { k: "01", t: "Café", d: "Frühstück, Kaffee, frische Waffeln" },
              { k: "02", t: "Bar", d: "Über 40 Gin-Sorten, Cocktails, Wein" },
              { k: "03", t: "Events", d: "Hochzeiten, Firmenfeiern, Catering" },
            ].map((c) => (
              <div key={c.k}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "var(--accent)" }}>{c.k}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, marginTop: 8 }}>{c.t}</div>
                <div style={{ fontSize: 13, color: "var(--fg-soft)", marginTop: 6, lineHeight: 1.5 }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="img-ph intro-img anim" style={{ "--d": "0.3s" }}>
          <img src="assets/collage.png" alt="Hafenmeister & Docks Impressionen" />
        </div>
      </div>
    </section>
  );
}

window.SlideHero = SlideHero;
window.SlideIntro = SlideIntro;
