#!/bin/sh
set -eu
sh scripts/generate-product-pdf.sh --product ius-4065
GITHUB_PAGES=true pnpm exec next build --webpack
node scripts/pages-css.mjs
touch out/.nojekyll
