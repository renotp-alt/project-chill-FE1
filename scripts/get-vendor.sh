#!/bin/bash
set -euo pipefail

# Download React, ReactDOM, and Babel UMD builds into ./vendor
cd "$(dirname "$0")/.."
mkdir -p vendor

fetch() {
  local url="$1"; shift
  local out="$1"; shift
  if [ -f "$out" ]; then
    echo "✓ $out already exists"
  else
    echo "↓ Downloading $(basename "$out")"
    curl -fsSL "$url" -o "$out"
    echo "✓ Saved $out"
  fi
}

fetch https://unpkg.com/react@18/umd/react.development.js vendor/react.development.js
fetch https://unpkg.com/react-dom@18/umd/react-dom.development.js vendor/react-dom.development.js
fetch https://unpkg.com/@babel/standalone/babel.min.js vendor/babel.min.js

echo "All vendor files are ready in ./vendor"

