#!/bin/bash
# Render every Contour infographic + logo to PNG using headless Chrome.
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$DIR/renders"
shot() { # file  width  height  scale  [query]
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor="$4" --window-size="$2,$3" --virtual-time-budget=4000 \
    --screenshot="$DIR/renders/$1.png" "file://$DIR/$1.html$5" >/dev/null 2>&1
}

# Original concept set (2400x3000 @2x)
for n in 1 2 3 4 5; do shot "option$n" 1200 1500 2; done

# "How it works" variants at App Store screenshot size (6.9" = 1320x2868, exact px)
for v in 4a 4b 4c; do shot "option$v" 1320 2868 1; done

# App icon drafts (1024x1024, opaque) — logo.html reads ?n=
for n in 1 2 3 4 5; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1024,1024 --virtual-time-budget=3000 \
    --screenshot="$DIR/renders/logo$n.png" "file://$DIR/logo.html?n=$n" >/dev/null 2>&1
done

echo "Done -> $DIR/renders"
