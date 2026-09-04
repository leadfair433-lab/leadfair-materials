#!/bin/sh
set -eu
GITHUB_PAGES=true pnpm exec next build --webpack
node scripts/pages-css.mjs
touch out/.nojekyll
