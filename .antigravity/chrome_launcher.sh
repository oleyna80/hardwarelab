#!/bin/bash
CHROME_BIN="/home/dmitrii/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome"

nohup "$CHROME_BIN" \
  --headless \
  --remote-debugging-port=9222 \
  --remote-debugging-address=127.0.0.1 \
  --no-sandbox \
  --disable-gpu \
  --disable-dev-shm-usage \
  --disable-software-rasterizer \
  > chrome_debug.log 2>&1 &

echo "Chrome launched in background. Check chrome_debug.log for details."
