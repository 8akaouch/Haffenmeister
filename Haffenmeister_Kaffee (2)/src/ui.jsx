/* global React, Icon, Waves, SLIDES */

const MOB_NAV_ITEMS = [
  { idx: 0, label: "Start",    icon: "Home"     },
  { idx: 2, label: "Küche",   icon: "Utensils" },
  { idx: 3, label: "Bar",      icon: "Glass"    },
  { idx: 6, label: "Buchen",   icon: "Calendar" },
  { idx: 7, label: "Info",     icon: "Pin"      },
];
const { useState, useEffect, useRef } = React;

// ============================================================
// Topbar with brand and nav
// ============================================================
function Topbar({ onNav, current, theme, onTheme }) {
  return (
    <div className="topbar">
      <a className="brand" onClick={() => onNav(0)}>
        <span className="brand-mark">
          <img src="assets/logo.png" alt="" />
        </span>
        <span className="brand-text">
          Hafenmeister &amp; Docks
          <small>Halle · Saale · est. 2018</small>
        </span>
      </a>

      <div className="topbar-right">
        <nav className="top-nav">
          {SLIDES.map((s, i) => (
            <button key={s.id} aria-current={i === current} onClick={() => onNav(i)}>
              {s.label}
            </button>
          ))}
        </nav>
        <button className="theme-toggle" onClick={onTheme} aria-label="Theme wechseln" title={theme === "dark" ? "Heller Modus" : "Dunkler Modus"}>
          {theme === "dark" ? <Icon.Sun /> : <Icon.Moon />}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Right-rail dots
// ============================================================
function Dots({ count, current, onNav }) {
  return (
    <div className="dots" aria-label="Slide-Navigation">
      {SLIDES.slice(0, count).map((s, i) => (
        <button key={s.id} className="dot" aria-current={i === current} aria-label={`Zu ${s.label}`} onClick={() => onNav(i)}>
          <span className="dot-label">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

// ============================================================
// Footer meta (coords + slide counter)
// ============================================================
function FooterMeta({ current, total }) {
  return (
    <>
      <div className="footer-meta">
        <span className="coord">51°28′48″N · 11°58′14″E</span>
        <span>Pfälzer Straße 4 · 06108 Halle</span>
        <span>Saale · Seit 2018</span>
      </div>
      <div className="slide-num">
        <b>{String(current + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
      </div>
    </>
  );
}

// ============================================================
// Toast
// ============================================================
function Toast({ msg, show }) {
  return <div className={`toast ${show ? "show" : ""}`}>{msg}</div>;
}

// ============================================================
// Lightbox
// ============================================================
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  if (index < 0) return null;
  const it = items[index];
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Vorheriges Bild">
        <Icon.Chevron dir="left" size={18} />
      </button>
      <img src={it.src} alt={it.tag} onClick={(e) => e.stopPropagation()} />
      <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Nächstes Bild">
        <Icon.Chevron dir="right" size={18} />
      </button>
      <button className="lightbox-close" onClick={onClose} aria-label="Schließen"><Icon.Close /></button>
    </div>
  );
}

// ============================================================
// Mobile bottom tab bar
// ============================================================
function MobileNav({ current, onNav }) {
  return (
    <nav className="mob-nav" aria-label="Navigation">
      {MOB_NAV_ITEMS.map((t) => {
        const IconComp = Icon[t.icon];
        const isActive = current === t.idx;
        return (
          <button
            key={t.idx}
            className={`mob-nav-btn${isActive ? " active" : ""}`}
            onClick={() => onNav(t.idx)}
            aria-current={isActive}
            aria-label={t.label}
          >
            <IconComp size={20} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

window.Topbar = Topbar;
window.Dots = Dots;
window.FooterMeta = FooterMeta;
window.Toast = Toast;
window.Lightbox = Lightbox;
window.MobileNav = MobileNav;
