/* global React, Icon, Waves, HOURS */
const { useState: useStateC } = React;

const WEB3FORMS_KEY = "ef81f523-a279-45f7-b63e-1fdbe35aadb9";

// ============================================================
// Slide 7 — Reservation / Event request (tabbed)
// ============================================================
function SlideReserve({ onSubmit, active }) {
  const [tab, setTab] = useStateC("tisch");
  const [sending, setSending] = useStateC(false);
  const [form, setForm] = useStateC({
    name: "", email: "", phone: "", date: "", time: "19:00",
    guests: "2", message: "", eventType: "Hochzeit",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    const subject = tab === "tisch"
      ? `Tischreservierung – ${form.name} – ${form.date} ${form.time} Uhr`
      : `Event-Anfrage – ${form.eventType} – ${form.name}`;
    const payload = tab === "tisch"
      ? { _subject: subject, _template: "table", _captcha: "false",
          Name: form.name, "E-Mail": form.email, Telefon: form.phone || "–",
          Datum: form.date, Uhrzeit: form.time, Personen: form.guests,
          Nachricht: form.message || "–" }
      : { _subject: subject, _template: "table", _captcha: "false",
          Name: form.name, "E-Mail": form.email, Telefon: form.phone || "–",
          "Art des Events": form.eventType, "Datum (ca.)": form.date || "–",
          "Anzahl Gäste": form.guests, Beschreibung: form.message || "–" };
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...payload }),
      });
      const data = await res.json();
      if (data.success) {
        onSubmit(tab === "tisch" ? "Reservierung gesendet · Ahoi!" : "Event-Anfrage gesendet · wir melden uns!");
        setForm({ name: "", email: "", phone: "", date: "", time: "19:00", guests: "2", message: "", eventType: "Hochzeit" });
      } else {
        onSubmit("Fehler – bitte direkt per E-Mail anfragen.");
      }
    } catch {
      onSubmit("Fehler – bitte direkt per E-Mail anfragen.");
    }
    setSending(false);
  };

  return (
    <section className={`slide form-slide ${active ? "active" : ""}`} data-screen-label="07 Reservieren">
      <div className="form-grid">
        <div className="form-card anim" style={{ "--d": "0.1s" }}>
          <div>
            <span className="kicker">Anker werfen · Kap. 06</span>
            <h2 className="headline" style={{ marginTop: 14 }}>
              Platz an <em>Bord</em> sichern.
            </h2>
          </div>

          <div className="form-tabs">
            <button className="form-tab" aria-selected={tab === "tisch"} onClick={() => setTab("tisch")}>Tisch reservieren</button>
            <button className="form-tab" aria-selected={tab === "event"} onClick={() => setTab("event")}>Event anfragen</button>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="field-row">
              <div>
                <label>Name</label>
                <input required value={form.name} onChange={update("name")} placeholder="Vor- und Nachname" />
              </div>
              <div>
                <label>E-Mail</label>
                <input required type="email" value={form.email} onChange={update("email")} placeholder="du@beispiel.de" />
              </div>
            </div>

            {tab === "tisch" ? (
              <>
                <div className="field-row">
                  <div>
                    <label>Datum</label>
                    <input required type="date" value={form.date} onChange={update("date")} />
                  </div>
                  <div>
                    <label>Uhrzeit</label>
                    <select value={form.time} onChange={update("time")}>
                      {["12:00","13:00","14:00","17:00","18:00","18:30","19:00","19:30","20:00","20:30","21:00"].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field-row">
                  <div>
                    <label>Personen</label>
                    <select value={form.guests} onChange={update("guests")}>
                      {[1,2,3,4,5,6,7,8,"9+"].map(n => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Telefon</label>
                    <input type="tel" value={form.phone} onChange={update("phone")} placeholder="Optional" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="field-row">
                  <div>
                    <label>Art des Events</label>
                    <select value={form.eventType} onChange={update("eventType")}>
                      {["Hochzeit", "Weihnachtsfeier", "Geburtstag", "Firmenfeier", "Sonstiges"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Datum (ca.)</label>
                    <input type="date" value={form.date} onChange={update("date")} />
                  </div>
                </div>
                <div className="field-row">
                  <div>
                    <label>Anzahl Gäste</label>
                    <input value={form.guests} onChange={update("guests")} placeholder="z.B. 40" />
                  </div>
                  <div>
                    <label>Telefon</label>
                    <input type="tel" value={form.phone} onChange={update("phone")} />
                  </div>
                </div>
              </>
            )}

            <div>
              <label>{tab === "tisch" ? "Nachricht / Wünsche" : "Beschreibe dein Event"}</label>
              <textarea rows="2" value={form.message} onChange={update("message")} placeholder={tab === "tisch" ? "z.B. Geburtstagstisch, Allergien, Kinderstuhl…" : "Gäste, Stil, Catering-Wünsche…"}></textarea>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 8 }}>
              <button className="btn" type="submit" disabled={sending}>
                {sending ? "Wird gesendet…" : (tab === "tisch" ? "Reservieren" : "Anfrage senden")} <Icon.Arrow />
              </button>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-dim)" }}>
                Unverbindlich · Antwort binnen 24h
              </span>
            </div>
          </form>
        </div>

        <div className="form-right anim" style={{ "--d": "0.3s" }}>
          <div>
            <span className="eyebrow">Lieber klassisch?</span>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1.1, marginTop: 10 }}>
              Ruf uns einfach an.
            </div>
          </div>
          <div className="info-block">
            <span className="eyebrow">Telefon</span>
            <a href="tel:+4934524983524" style={{ fontFamily: "var(--font-display)", fontSize: 30 }}>0345 24983524</a>
          </div>
          <div className="info-block">
            <span className="eyebrow">E-Mail</span>
            <a href="mailto:hafenmeisterunddocks@mail.de" style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>hafenmeisterunddocks@mail.de</a>
          </div>
          <div className="info-block">
            <span className="eyebrow">Adresse</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>Pfälzer Straße 4<br />06108 Halle (Saale)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Slide 8 — Contact & Map
// ============================================================
function SlideContact({ active }) {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0

  return (
    <section className={`slide contact-slide ${active ? "active" : ""}`} data-screen-label="08 Ankern">
      <div className="contact-grid">
        <div>
          <div className="anim" style={{ "--d": "0.1s" }}>
            <span className="kicker">Kap. 07</span>
            <h2 className="headline" style={{ marginTop: 14 }}>
              Hier liegen <em>wir</em> vor Anker.
            </h2>
          </div>

          <div className="anim" style={{ "--d": "0.3s", marginTop: 40 }}>
            <span className="eyebrow" style={{ marginBottom: 14, display: "block" }}>Öffnungszeiten</span>
            <div className="hours-list">
              {HOURS.map((h, i) => (
                <div key={h.day} className={`hours-row ${i === todayIdx ? "today" : ""} ${h.closed ? "closed" : ""}`}>
                  <span className="day">{h.day}</span>
                  <span className="time">{h.time}{i === todayIdx && !h.closed ? " · Heute" : ""}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="anim" style={{ "--d": "0.5s", marginTop: 32, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            <div className="info-block">
              <span className="eyebrow"><Icon.Phone /> Anker per Ruf</span>
              <a href="tel:+4934524983524">0345 24983524</a>
            </div>
            <div className="info-block">
              <span className="eyebrow"><Icon.Instagram /> Social</span>
              <a href="#">@hafenmeisterdocks</a>
            </div>
          </div>
        </div>

        <div className="map anim" style={{ "--d": "0.4s" }}>
          <iframe
            title="Hafenmeister & Docks Standort"
            src="https://www.openstreetmap.org/export/embed.html?bbox=11.960%2C51.476%2C11.978%2C51.484&layer=mapnik&marker=51.4800%2C11.9706"
            style={{ width: "100%", height: "100%", border: "none", filter: "grayscale(0.3) contrast(1.1)" }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

// Stylized maritime map of the location
function MapSVG() {
  return (
    <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.18"/>
        </pattern>
        <pattern id="water" width="28" height="14" patternUnits="userSpaceOnUse">
          <path d="M 0 7 Q 7 2 14 7 T 28 7" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.35"/>
        </pattern>
      </defs>
      <rect width="600" height="600" fill="url(#grid)" style={{ color: "var(--fg)" }}/>
      {/* Saale river */}
      <path d="M 130 0 C 180 140, 140 220, 220 320 S 290 490, 260 600"
        fill="none" stroke="url(#water)" strokeWidth="70" style={{ color: "var(--fg)" }}/>
      <path d="M 130 0 C 180 140, 140 220, 220 320 S 290 490, 260 600"
        fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" style={{ color: "var(--fg)" }}/>

      {/* Saline label */}
      <text x="110" y="380" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="3" fill="currentColor" opacity="0.6" style={{ color: "var(--fg)" }}>SALINE</text>
      <circle cx="170" cy="420" r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" style={{ color: "var(--fg)" }}/>

      {/* Street grid */}
      <line x1="380" y1="0" x2="380" y2="600" stroke="currentColor" strokeWidth="0.8" opacity="0.3" style={{ color: "var(--fg)" }}/>
      <line x1="0" y1="300" x2="600" y2="300" stroke="currentColor" strokeWidth="0.8" opacity="0.3" style={{ color: "var(--fg)" }}/>
      <line x1="0" y1="460" x2="600" y2="460" stroke="currentColor" strokeWidth="0.6" opacity="0.2" style={{ color: "var(--fg)" }}/>
      <line x1="500" y1="0" x2="500" y2="600" stroke="currentColor" strokeWidth="0.6" opacity="0.2" style={{ color: "var(--fg)" }}/>

      <text x="400" y="295" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="currentColor" opacity="0.45" style={{ color: "var(--fg)" }}>PFÄLZER STRASSE</text>

      {/* Pin */}
      <g transform="translate(390, 315)">
        <circle r="38" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5">
          <animate attributeName="r" values="10;38;10" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle r="10" fill="var(--accent)"/>
        <circle r="4" fill="var(--bg)"/>
      </g>
      <text x="420" y="312" fontFamily="var(--font-display)" fontSize="20" fill="currentColor" style={{ color: "var(--fg)" }}>Hafenmeister &amp; Docks</text>
      <text x="420" y="330" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="2" fill="currentColor" opacity="0.6" style={{ color: "var(--fg)" }}>PFÄLZER STR. 4 · 06108 HALLE</text>

      {/* Compass rose */}
      <g transform="translate(520, 80)" stroke="currentColor" fill="none" strokeWidth="0.8" style={{ color: "var(--fg)" }} opacity="0.5">
        <circle r="26"/>
        <line x1="0" y1="-30" x2="0" y2="30"/>
        <line x1="-30" y1="0" x2="30" y2="0"/>
        <polygon points="0,-30 3,-10 -3,-10" fill="currentColor"/>
        <text x="0" y="-36" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="2" textAnchor="middle" stroke="none" fill="currentColor">N</text>
      </g>
    </svg>
  );
}

window.SlideReserve = SlideReserve;
window.SlideContact = SlideContact;
