#!/bin/sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
PDF_REQUIREMENTS="$PROJECT_ROOT/scripts/product-pdf-requirements.txt"

has_pdf_dependencies() {
  "$1" -c 'import cssselect, lxml, PIL, reportlab' >/dev/null 2>&1
}

PDF_RUNTIME="${PDF_PYTHON:-}"
if [ -n "$PDF_RUNTIME" ] && ! has_pdf_dependencies "$PDF_RUNTIME"; then
  echo "PDF_PYTHON does not include the required PDF packages: $PDF_RUNTIME" >&2
  exit 1
fi

if [ -z "$PDF_RUNTIME" ]; then
  BUNDLED_PYTHON="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3"
  if [ -x "$BUNDLED_PYTHON" ] && has_pdf_dependencies "$BUNDLED_PYTHON"; then
    PDF_RUNTIME="$BUNDLED_PYTHON"
  elif command -v python3 >/dev/null 2>&1 && has_pdf_dependencies "$(command -v python3)"; then
    PDF_RUNTIME="$(command -v python3)"
  else
    PDF_VENV="$PROJECT_ROOT/.product-pdf-venv"
    if [ ! -x "$PDF_VENV/bin/python3" ]; then
      python3 -m venv "$PDF_VENV"
    fi
    "$PDF_VENV/bin/python3" -m pip install --disable-pip-version-check -r "$PDF_REQUIREMENTS"
    PDF_RUNTIME="$PDF_VENV/bin/python3"
  fi
fi

cd "$PROJECT_ROOT"
exec "$PDF_RUNTIME" scripts/generate-product-pdfs.py "$@"
