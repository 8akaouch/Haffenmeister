/* global React, EVENTS, GALLERY, Icon, Waves, Lightbox */
const { useState: useStateE } = React;

// ============================================================
// Slide 5 — Events
// ============================================================
function SlideEvents({ onNav, active }) {
  return (
    <section className={`slide events-slide ${active ? "active" : ""}`} data-screen-label="05 Events">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40 }}>
        <div className="anim" style={{ "--d": "0.1s" }}>
          <span className="kicker">Ahoi! Sie suchen ein Schiff? · Kap. 04</span>
          <h2 className="headline" style={{ marginTop: 14, maxWidth: "14ch" }}>
            Feiern, wo der <em>Anker</em> liegt.
          </h2>
        </div>
        <p className="body-text anim" style={{ "--d": "0.25s", maxWidth: "42ch", textAlign: "right" }}>
          Ob Hochzeit, Weihnachtsfeier oder einfach ein besonderer Abend mit der Crew — wir bieten
          alles: Küche, Bar, Dekor, Musik. Einfach anlegen und feiern.
        </p>
      </div>

      <div className="events-grid">
        {EVENTS.map((e, i) => (
          <div className="event-card anim" key={e.num} style={{ "--d": `${0.35 + i * 0.1}s` }}>
            <div className="num">{e.num} / {EVENTS.length.toString().padStart(2, "0")}</div>
            <h3>{e.title}</h3>
            <p>{e.desc}</p>
            <ul>
              {e.items.map((li) => <li key={li}>{li}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="anim" style={{ "--d": "0.75s", marginTop: 32, display: "flex", gap: 16, alignItems: "center" }}>
        <button className="btn" onClick={() => onNav(6)}>
          Event anfragen <Icon.Arrow />
        </button>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--fg-dim)", textTransform: "uppercase" }}>
          Oder: hafenmeisterunddocks@mail.de
        </span>
      </div>
    </section>
  );
}

// ============================================================
// Slide 6 — Gallery with lightbox
// ============================================================
function SlideGallery({ active }) {
  const [lb, setLb] = useStateE(-1);

  const open = (i) => setLb(i);
  const close = () => setLb(-1);
  const prev = () => setLb((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setLb((i) => (i + 1) % GALLERY.length);

  return (
    <section className={`slide gallery-slide ${active ? "active" : ""}`} data-screen-label="06 Galerie">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div className="anim" style={{ "--d": "0.1s" }}>
          <span className="kicker">An Bord · Kap. 05</span>
          <h2 className="headline" style={{ marginTop: 14 }}>
            Bilder aus dem <em>Hafen.</em>
          </h2>
        </div>
        <div className="anim" style={{ "--d": "0.25s", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-dim)" }}>
          Klick für Vollbild
        </div>
      </div>

      <div className="gallery-grid">
        {GALLERY.map((g, i) => (
          <div
            key={i}
            className={`gallery-tile img-ph ${g.cls} anim`}
            style={{ "--d": `${0.25 + i * 0.05}s` }}
            onClick={() => open(i)}
          >
            <img src={g.src} alt={g.tag} />
            <span className="tag">{g.tag}</span>
          </div>
        ))}
      </div>

      {lb >= 0 && (
        <Lightbox items={GALLERY} index={lb} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}

window.SlideEvents = SlideEvents;
window.SlideGallery = SlideGallery;
