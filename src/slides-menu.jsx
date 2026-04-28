/* global React, MENU, DRINKS, Icon, Waves */
const { useState: useStateMenu } = React;

// ============================================================
// Slide 3 — Menu with filter
// ============================================================
function SlideMenu({ active }) {
  const [tab, setTab] = useStateMenu("frühstück");
  const items = MENU[tab] || [];

  return (
    <section className={`slide menu-slide ${active ? "active" : ""}`} data-screen-label="03 Küche">
      <div className="menu-head">
        <div className="anim" style={{ "--d": "0.1s" }}>
          <span className="kicker">Aus der Kombüse · Kap. 02</span>
          <h2 className="headline" style={{ marginTop: 14 }}>
            Aus der <em>Küche.</em>
          </h2>
        </div>
        <div className="menu-filters anim" style={{ "--d": "0.25s" }}>
          {["frühstück", "mittag", "snacks"].map((t) => (
            <button
              key={t}
              className="pill"
              aria-pressed={t === tab}
              onClick={() => setTab(t)}
            >
              {t === "frühstück" ? "Frühstück" : t === "mittag" ? "Mittag & Abend" : "Snacks & Platten"}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid mob-scroll">
        {items.map((it, i) => (
          <div className="menu-item" key={`${tab}-${i}`}>
            <div>
              <h4>
                <span className="menu-item-idx">{String(i + 1).padStart(2, "0")}</span>
                {it.name}
                {it.tag && <span className="tag">{it.tag}</span>}
              </h4>
              <p>{it.desc}</p>
            </div>
            <div className="price">€ {it.price}</div>
          </div>
        ))}
      </div>

      <div className="anim" style={{ "--d": "0.6s", marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-dim)" }}>
          Hinweis · Täglich wechselnde Specials auf der Tafel
        </div>
        <Waves width={140} />
      </div>
    </section>
  );
}

// ============================================================
// Slide 4 — Drinks / Bar
// ============================================================
function SlideDrinks({ active }) {
  const [tab, setTab] = useStateMenu("signature");
  const items = DRINKS[tab] || [];

  return (
    <section className={`slide drinks-slide ${active ? "active" : ""}`} data-screen-label="04 Bar">
      <div className="drinks-feature">
        <div className="img-ph drinks-img anim" style={{ "--d": "0.2s" }}>
          <img src="assets/bar.png" alt="Bar & Gin Tonic" />
          <div style={{
            position: "absolute",
            bottom: 24, left: 24, right: 24,
            color: "#f5f1e8",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
          }}>
            <span>Bar · Deck 2</span>
            <span>40+ Gins · auf Lager</span>
          </div>
        </div>

        <div className="drinks-list">
          <div className="anim" style={{ "--d": "0.1s" }}>
            <span className="kicker">Cocktailkarte · Kap. 03</span>
            <h2 className="headline" style={{ marginTop: 14 }}>
              <em>Trockendock</em> nach 18 Uhr.
            </h2>
          </div>

          <div className="menu-filters anim" style={{ "--d": "0.3s", marginTop: 8 }}>
            {["signature", "klassiker", "alkoholfrei"].map((t) => (
              <button
                key={t}
                className="pill"
                aria-pressed={t === tab}
                onClick={() => setTab(t)}
              >
                {t === "signature" ? "Signature" : t === "klassiker" ? "Klassiker" : "Alkoholfrei"}
              </button>
            ))}
          </div>

          <div className="anim mob-scroll" style={{ "--d": "0.45s" }}>
            {items.map((it, i) => (
              <div className="drinks-row" key={`${tab}-${i}`}>
                <div>
                  <h4>{it.name}{it.tag && <span className="menu-item" style={{ display: "inline-block", border: "none", padding: 0 }}><span className="tag" style={{ marginLeft: 10 }}>— {it.tag}</span></span>}</h4>
                  <p>{it.desc}</p>
                </div>
                <div className="price">€ {it.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.SlideMenu = SlideMenu;
window.SlideDrinks = SlideDrinks;
