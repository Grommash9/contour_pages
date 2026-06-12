# Contour infographics

React-based (no build step) explanatory images for Contour. Edit the source,
re-render to PNG, iterate.

## Render

```bash
bash render.sh        # renders all 5 options to renders/optionN.png (2400×3000, 2×)
```

Each option is a standalone HTML file using React + [htm](https://github.com/developit/htm)
loaded from `vendor/` (vendored so rendering works offline). Open any `optionN.html`
directly in a browser to tweak live.

- Canvas: 1200×1500 (rendered at `--force-device-scale-factor=2` → 2400×3000).
- Shared building blocks (tokens, illustrations, Phone, Frame, Tag) live in `shared.js`.
- Subjects (`Chair`, `Person`, `Plant`) render in two modes: `mode="photo"` (filled,
  a real-photo stand-in) and `mode="line"` (glowing contour outline — what the app overlays).
  Swap any subject for a real `<img>` when you have actual before/after photos.

## The 5 concepts

1. **Overlay explainer** (dark) — phone showing a chair with its glowing contour offset; "line it up."
2. **Before/after grid** (light, FlipperHelper style) — fitness / plants / restorations pairs.
3. **Problem vs solution** — misaligned "by eye" ✗ vs aligned "with Contour" ✓.
4. **How it works 1·2·3** — pick a reference → line up contours → capture & compare.
5. **Progress time-lapse** (dark) — Day 1→90 figures, all the exact same frame.

## Notes
- Brand tokens in `shared.js` (`T`): accent `#334B90`, green `#2DA44E`, contour glow `#41E0FF`.
- Illustrations are placeholders for real photography — they double as the app's
  line-art "contour" visual language.
