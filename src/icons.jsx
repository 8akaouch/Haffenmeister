/* global React */
const { useState, useEffect, useRef } = React;

// Simple SVG icons
const Icon = {
  Arrow: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Chevron: ({ dir = "down", size = 14 }) => {
    const rot = { up: 180, down: 0, left: 90, right: -90 }[dir];
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    );
  },
  Close: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
  ),
  Sun: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.1" y2="4.9"/>
    </svg>
  ),
  Moon: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
    </svg>
  ),
  Phone: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/>
    </svg>
  ),
  Mail: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
    </svg>
  ),
  Pin: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Anchor: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="22"/><path d="M5 12a7 7 0 0 0 14 0"/><line x1="9" y1="11" x2="15" y2="11"/>
    </svg>
  ),
  Instagram: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
    </svg>
  ),
  Home: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Utensils: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><line x1="7" y1="2" x2="7" y2="22"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
    </svg>
  ),
  Glass: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8"/><line x1="12" y1="11" x2="12" y2="22"/><path d="M20.4 2H3.6L6 11h12z"/>
    </svg>
  ),
  Calendar: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
};

// Wave SVG used as a divider motif
const Waves = ({ width = 220, height = 14, className = "waves" }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 220 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <path d="M2 7 Q 13 1, 24 7 T 46 7 T 68 7 T 90 7 T 112 7 T 134 7 T 156 7 T 178 7 T 200 7 T 218 7" />
  </svg>
);

// Rotating circular badge with curved text — for hero corner
const RotatingBadge = ({ size = 180, text = "HAFENMEISTER & DOCKS · CAFÉ · BAR · SEIT 2018 · " }) => (
  <div className="rot-badge" style={{ width: size, height: size }}>
    <svg viewBox="0 0 200 200" width={size} height={size} className="rot-badge-svg">
      <defs>
        <path id="rot-badge-circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
      </defs>
      <text className="rot-badge-text">
        <textPath href="#rot-badge-circle" startOffset="0">{text + text}</textPath>
      </text>
    </svg>
    <div className="rot-badge-inner" aria-hidden="true">
      <Icon.Anchor size={28} />
    </div>
  </div>
);

// Horizontal marquee ticker — for top of hero
const Ticker = ({ items }) => (
  <div className="ticker" aria-hidden="true">
    <div className="ticker-track">
      {[0, 1].map((dup) => (
        <div className="ticker-group" key={dup}>
          {items.map((it, i) => (
            <span key={`${dup}-${i}`} className="ticker-item">
              <span className="ticker-dot" /> {it}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Letter-by-letter wrapper for headline reveal
const SplitText = ({ text, className = "", style = {} }) => {
  const words = text.split(" ");
  let charIdx = 0;
  return (
    <span className={`split ${className}`} style={style}>
      {words.map((word, wi) => (
        <span className="split-word" key={wi}>
          {Array.from(word).map((ch, ci) => {
            const i = charIdx++;
            return (
              <span className="split-char" key={ci} style={{ "--ci": i }}>{ch}</span>
            );
          })}
          {wi < words.length - 1 && <span className="split-space"> </span>}
        </span>
      ))}
    </span>
  );
};

window.Icon = Icon;
window.Waves = Waves;
window.RotatingBadge = RotatingBadge;
window.Ticker = Ticker;
window.SplitText = SplitText;
