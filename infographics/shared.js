/* Shared building blocks for Contour infographic options.
   React + htm (no build step). Exposes window.UI with tokens, illustrations,
   and small components. Subjects render in two modes:
     mode="photo" -> soft filled illustration (a "real" photo stand-in)
     mode="line"  -> glowing contour outline (what Contour overlays)
   Swap any subject for a real <img> placeholder later. */
(function () {
  const html = htm.bind(React.createElement);

  const T = {
    ink: "#0E1116",
    sub: "#5A6472",
    accent: "#334B90",
    accentSoft: "#BBCBF7",
    green: "#2DA44E",
    gold: "#F9DDA5",
    paper: "#F4F6FB",
    card: "#FFFFFF",
    line: "#E3E8F0",
    darkBg: "#0A0C12",
    darkCard: "#141822",
    glow: "#41E0FF",
    font: '-apple-system, "SF Pro Display", system-ui, "Segoe UI", Roboto, Arial, sans-serif',
  };

  // ---- Subjects (viewBox-based SVG so they scale to any box) ----

  function subjectStyle(mode, color) {
    if (mode === "line") {
      return { fill: "none", stroke: color || T.glow, strokeWidth: 3.2, strokeLinejoin: "round", strokeLinecap: "round" };
    }
    return { fill: color || "#C9D4E8", stroke: "none" };
  }

  function Chair({ mode = "photo", color, glow }) {
    const s = subjectStyle(mode, color);
    const filt = mode === "line" && glow ? "url(#glow)" : undefined;
    return html`<svg viewBox="0 0 120 130" style=${{ width: "100%", height: "100%" }}>
      <g ...${s} filter=${filt}>
        <rect x="28" y="20" width="11" height="50" rx="5" />
        <rect x="28" y="62" width="58" height="10" rx="5" />
        <rect x="33" y="70" width="7" height="40" rx="3" />
        <rect x="76" y="70" width="7" height="40" rx="3" />
      </g>
    </svg>`;
  }

  function Person({ mode = "photo", color, glow, build = 1 }) {
    const s = subjectStyle(mode, color);
    const filt = mode === "line" && glow ? "url(#glow)" : undefined;
    const tw = 30 * build;
    const x = 50 - tw / 2;
    return html`<svg viewBox="0 0 100 150" style=${{ width: "100%", height: "100%" }}>
      <g ...${s} filter=${filt}>
        <circle cx="50" cy="22" r="13" />
        <rect x=${x} y="38" width=${tw} height="54" rx=${tw / 2} />
        <rect x=${x - 8} y="42" width="9" height="42" rx="4.5" />
        <rect x=${x + tw - 1} y="42" width="9" height="42" rx="4.5" />
        <rect x=${50 - tw / 2 + 2} y="90" width=${tw / 2 - 3} height="52" rx="6" />
        <rect x=${50 + 1} y="90" width=${tw / 2 - 3} height="52" rx="6" />
      </g>
    </svg>`;
  }

  function Plant({ mode = "photo", color, glow, size = 1 }) {
    const s = subjectStyle(mode, color);
    const filt = mode === "line" && glow ? "url(#glow)" : undefined;
    const leaves = [];
    const r = 13 * size;
    const top = 60 - 34 * size;
    leaves.push([50, top, r]);
    leaves.push([50 - 16 * size, top + 14 * size, r * 0.9]);
    leaves.push([50 + 16 * size, top + 14 * size, r * 0.9]);
    leaves.push([50 - 9 * size, top + 30 * size, r * 0.85]);
    leaves.push([50 + 9 * size, top + 30 * size, r * 0.85]);
    return html`<svg viewBox="0 0 100 130" style=${{ width: "100%", height: "100%" }}>
      <g ...${s} filter=${filt}>
        <path d="M32 82 L68 82 L62 116 L38 116 Z" />
        <rect x="48" y="58" width="4" height="26" rx="2" />
        ${leaves.map((l, i) => html`<ellipse key=${i} cx=${l[0]} cy=${l[1]} rx=${l[2]} ry=${l[2] * 1.25} />`)}
      </g>
    </svg>`;
  }

  const SUBJECTS = { chair: Chair, person: Person, plant: Plant };

  // Glow filter (drop into any <svg> once)
  function GlowDefs() {
    return html`<defs>
      <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>`;
  }

  // A framed "photo" tile with an optional corner label
  function Frame({ children, label, labelColor, bg = "#EAF0FA", h = 220, border }) {
    return html`<div style=${{
      position: "relative", background: bg, borderRadius: 22, height: h,
      overflow: "hidden", border: border || "none",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      ${children}
      ${label && html`<div style=${{
        position: "absolute", top: 12, left: 12, background: labelColor || "rgba(14,17,22,.7)",
        color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: .5,
        padding: "5px 12px", borderRadius: 999,
      }}>${label}</div>`}
    </div>`;
  }

  function Tag({ text, bg = T.accentSoft, fg = T.accent }) {
    return html`<span style=${{
      background: bg, color: fg, fontSize: 18, fontWeight: 700,
      padding: "8px 18px", borderRadius: 999, display: "inline-block",
    }}>${text}</span>`;
  }

  // Phone mock with a screen area
  function Phone({ children, width = 360, dark = true }) {
    const h = width * 2.03;
    return html`<div style=${{
      width, height: h, borderRadius: 52, background: dark ? "#0b0b0e" : "#1b1c22",
      padding: 12, boxShadow: "0 40px 90px rgba(8,12,30,.45)", position: "relative",
    }}>
      <div style=${{ width: "100%", height: "100%", borderRadius: 42, overflow: "hidden", position: "relative", background: "#000" }}>
        ${children}
        <div style=${{
          position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
          width: 96, height: 30, background: "#000", borderRadius: 999,
        }}></div>
      </div>
    </div>`;
  }

  // ---- 3D (isometric) chair ----

  function darken(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.round(((n >> 16) & 255) * f);
    const g = Math.round(((n >> 8) & 255) * f);
    const b = Math.round((n & 255) * f);
    return `rgb(${r},${g},${b})`;
  }

  function Chair3D({ mode = "photo", color = "#C7903F", glow, debug, fillBg = "#0e1320" }) {
    // Scaled + centered so the whole chair fits the 200x200 viewBox with margin.
    const s = 1.5, ox = 100, oy = 92;
    const iso = (x, y, z) => [ox + (x - y) * 0.866 * s, oy + (x + y) * 0.5 * s - z * s];
    const pts = (a) => a.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ");
    // Only the three camera-facing planes: top (z+h), right (x+w), front (y+d).
    function box(x, y, z, w, d, h) {
      return {
        depth: (x + w / 2) + (y + d / 2) - (z + h / 2), // bigger = closer to camera
        top: [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)],
        right: [iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)],
        front: [iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)],
      };
    }
    // Draw order legs -> seat -> backrest: legs tuck UNDER the seat, and the
    // backrest sits visibly ON the seat top (where you sit).
    const LEG = 8;
    const boxes = [
      { tag: "leg", b: box(0, 0, -22, LEG, LEG, 22) },               // back-left
      { tag: "leg", b: box(44 - LEG, 0, -22, LEG, LEG, 22) },        // back-right
      { tag: "leg", b: box(0, 44 - LEG, -22, LEG, LEG, 22) },        // front-left
      { tag: "leg", b: box(44 - LEG, 44 - LEG, -22, LEG, LEG, 22) }, // front-right
      { tag: "seat", b: box(0, 0, 0, 44, 44, 7) },                   // seat
      { tag: "back", b: box(0, 0, 7, 6, 44, 46) },                   // backrest on seat top
    ];

    const debugColor = { seat: "#3B82F6", leg: "#EF4444", back: "#22C55E" };
    const isLine = mode === "line";
    const edge = isLine ? (glow ? T.glow : color) : (debug ? "#0E1116" : darken(color, 0.5));
    const sw = isLine ? 2.2 : 0.8;
    const filt = isLine && glow ? "url(#glow)" : undefined;
    return html`<svg viewBox="0 0 200 200" style=${{ width: "100%", height: "100%" }}>
      <${GlowDefs}/>
      ${!isLine && html`<ellipse cx=${ox} cy="168" rx="58" ry="14" fill="rgba(10,16,30,.16)" />`}
      <g filter=${filt} strokeLinejoin="round">
        ${boxes.map((o, i) => {
          // Line mode fills faces with the background colour so front faces
          // occlude the edges behind them — a contour, not an x-ray.
          const base = debug ? debugColor[o.tag] : color;
          const cTop = isLine ? fillBg : base;
          const cRight = isLine ? fillBg : darken(base, 0.82);
          const cFront = isLine ? fillBg : darken(base, 0.64);
          return html`<g key=${i}>
            <polygon points=${pts(o.b.front)} fill=${cFront} stroke=${edge} strokeWidth=${sw} />
            <polygon points=${pts(o.b.right)} fill=${cRight} stroke=${edge} strokeWidth=${sw} />
            <polygon points=${pts(o.b.top)} fill=${cTop} stroke=${edge} strokeWidth=${sw} />
          </g>`;
        })}
      </g>
    </svg>`;
  }

  function mount(el) { ReactDOM.createRoot(document.getElementById("root")).render(el); }

  window.UI = { html, T, Chair, Chair3D, Person, Plant, SUBJECTS, GlowDefs, Frame, Tag, Phone, mount };
})();
