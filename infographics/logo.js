/* Five Contour app-icon concepts as 1024x1024 SVG. Opaque background (no alpha)
   so each is directly usable as an iOS icon asset. */
(function () {
  const html = htm.bind(React.createElement);
  const BLUE0 = "#3B56AD", BLUE1 = "#243A7D", GOLD = "#F9DDA5", GLOW = "#41E0FF";
  const rad = (d) => (d * Math.PI) / 180;
  function arc(cx, cy, r, a0, a1) {
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0));
    const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  const Svg = (bg, kids) => html`<svg viewBox="0 0 1024 1024" width="1024" height="1024">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color=${bg[0]} /><stop offset="1" stop-color=${bg[1]} />
      </linearGradient>
    </defs>
    <rect width="1024" height="1024" fill="url(#bg)" />
    ${kids}
  </svg>`;

  // 1 — Topographic C (contour rings, gap on the right)
  function Logo1() {
    const rings = [150, 215, 280, 345];
    return Svg([BLUE0, BLUE1], html`<g fill="none" strokeLinecap="round">
      ${rings.map((r, i) => html`<path key=${i} d=${arc(512, 512, r, 38, 322)}
        stroke=${i === 2 ? GOLD : "#fff"} strokeWidth=${i === 2 ? 30 : 28} />`)}
    </g>`);
  }

  // 2 — Two aligned frames, offset (the overlay / line-it-up idea)
  function Logo2() {
    return Svg([BLUE0, BLUE1], html`<g fill="none">
      <rect x="300" y="240" width="430" height="430" rx="96" stroke="#fff" strokeOpacity="0.4" strokeWidth="26" />
      <rect x="240" y="320" width="430" height="430" rx="96" stroke="#fff" strokeWidth="34" />
      <circle cx="455" cy="535" r="30" fill=${GOLD} />
    </g>`);
  }

  // 3 — Ghost subject: filled dot + offset outline (align the outline)
  function Logo3() {
    return Svg([BLUE0, BLUE1], html`<g>
      <circle cx="455" cy="455" r="200" fill="#fff" />
      <circle cx="560" cy="560" r="200" fill="none" stroke=${GOLD} strokeWidth="26" strokeDasharray="2 0" />
    </g>`);
  }

  // 4 — Bold C monogram with a contour echo line
  function Logo4() {
    return Svg([BLUE0, BLUE1], html`<g fill="none" strokeLinecap="round">
      <path d=${arc(512, 512, 250, 50, 310)} stroke="#fff" strokeWidth="78" />
      <path d=${arc(512, 512, 250, 50, 310)} stroke=${GOLD} strokeWidth="14" transform="translate(34 34)" opacity="0.95" />
    </g>`);
  }

  // 5 — Viewfinder brackets framing a contour subject
  function Logo5() {
    const B = (pts) => html`<path d=${pts} fill="none" stroke="#fff" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />`;
    return Svg(["#101A33", "#0B1226"], html`<g>
      ${B("M300 240 L240 240 L240 300")}
      ${B("M724 240 L784 240 L784 300")}
      ${B("M300 784 L240 784 L240 724")}
      ${B("M724 784 L784 784 L784 724")}
      <g fill="none" stroke=${GLOW} strokeWidth="26" strokeLinecap="round">
        <path d=${arc(512, 512, 120, 40, 320)} />
        <path d=${arc(512, 512, 185, 40, 320)} stroke=${GOLD} />
      </g>
    </g>`);
  }

  window.LOGOS = { Logo1, Logo2, Logo3, Logo4, Logo5, html };
  window.mountLogo = (Comp) => ReactDOM.createRoot(document.getElementById("root")).render(html`<${Comp}/>`);
})();
