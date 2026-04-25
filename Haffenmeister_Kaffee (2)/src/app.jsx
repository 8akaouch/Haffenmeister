/* global React, ReactDOM, SLIDES, Topbar, Dots, FooterMeta, Toast, SlideHero, SlideIntro, SlideMenu, SlideDrinks, SlideEvents, SlideGallery, SlideReserve, SlideContact, Icon, Waves */
const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [cur, setCur] = useState(() => {
    const saved = Number(localStorage.getItem("hmd.slide"));
    return Number.isFinite(saved) && saved >= 0 && saved < SLIDES.length ? saved : 0;
  });
  const [theme, setTheme] = useState(() => localStorage.getItem("hmd.theme") || "dark");
  const [toast, setToast] = useState({ msg: "", show: false });
  const scrollLock = useRef(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("hmd.theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("hmd.slide", String(cur));
  }, [cur]);

  const go = useCallback((i) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, i));
    setCur(clamped);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault(); go(cur + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault(); go(cur - 1);
      } else if (e.key === "Home") { go(0); }
      else if (e.key === "End") { go(SLIDES.length - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cur, go]);

  // Wheel navigation (debounced)
  useEffect(() => {
    const onWheel = (e) => {
      if (e.target.closest(".menu-grid, .drinks-list, .gallery-grid, form, .hours-list, .lightbox")) {
        // allow natural scroll inside specific regions if needed — still lock deck
      }
      if (scrollLock.current) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 15) return;
      e.preventDefault();
      scrollLock.current = true;
      if (e.deltaY > 0) go(cur + 1); else go(cur - 1);
      setTimeout(() => { scrollLock.current = false; }, 950);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [cur, go]);

  // Touch navigation
  useEffect(() => {
    let startY = null;
    const onStart = (e) => { startY = e.touches[0].clientY; };
    const onEnd = (e) => {
      if (startY == null) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 60) {
        if (dy > 0) go(cur + 1); else go(cur - 1);
      }
      startY = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [cur, go]);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3200);
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="deck">
      <Topbar onNav={go} current={cur} theme={theme} onTheme={toggleTheme} />

      <div
        className="slides"
        style={{ transform: `translateY(${-cur * 100}vh)` }}
      >
        {SLIDES.map((s, i) => (
          <React.Fragment key={s.id}>
            {renderSlide(s.id, i, cur, go, showToast)}
          </React.Fragment>
        ))}
      </div>

      <Dots count={SLIDES.length} current={cur} onNav={go} />
      <FooterMeta current={cur} total={SLIDES.length} />

      {cur === 0 && (
        <div className="scroll-hint">
          <span>Scroll · Pfeil · Swipe</span>
          <Icon.Chevron dir="down" size={12} />
        </div>
      )}

      <Toast msg={toast.msg} show={toast.show} />
    </div>
  );
}

function renderSlide(id, i, cur, go, showToast) {
  const active = i === cur;
  switch (id) {
    case "hero":    return <SlideHero onNav={go} active={active} />;
    case "intro":   return <SlideIntro active={active} />;
    case "menu":    return <SlideMenu active={active} />;
    case "drinks":  return <SlideDrinks active={active} />;
    case "events":  return <SlideEvents onNav={go} active={active} />;
    case "gallery": return <SlideGallery active={active} />;
    case "reserve": return <SlideReserve onSubmit={showToast} active={active} />;
    case "contact": return <SlideContact active={active} />;
    default: return null;
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
