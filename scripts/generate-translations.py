from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

import argostranslate.translate as argos

ROOT = Path(__file__).resolve().parents[1]
HAN = re.compile(r"[\u3400-\u9fff]")
LATIN = re.compile(r"[A-Za-z]{3}")


class VisibleTextParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.skip = 0
        self.values: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"script", "style"}:
            self.skip += 1
        if self.skip:
            return
        for key, value in attrs:
            if key in {"placeholder", "aria-label", "title", "alt"} and value and HAN.search(value):
                self.values.add(value.strip())

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style"} and self.skip:
            self.skip -= 1

    def handle_data(self, data: str) -> None:
        value = data.strip()
        if not self.skip and value and HAN.search(value):
            self.values.add(value)


def split_bilingual(value: str) -> tuple[str, str] | None:
    lines = [line.strip() for line in value.splitlines() if line.strip()]
    if len(lines) >= 2 and HAN.search(lines[0]) and LATIN.search(lines[-1]):
        return lines[0], lines[-1]
    return None


def collect_existing_english() -> dict[str, str]:
    articles = json.loads((ROOT / "app/content/technical-articles.json").read_text("utf-8"))
    pairs: dict[str, str] = {}
    for article in articles:
        if article.get("englishTitle"):
            pairs[article["title"]] = article["englishTitle"]
        for section in article.get("sections", []):
            pair = split_bilingual(section.get("title", ""))
            if pair:
                pairs[pair[0]] = pair[1]
                pairs[section["title"]] = pair[1]
            blocks = section.get("blocks", [])
            index = 0
            while index < len(blocks):
                block = blocks[index]
                text = block.get("text", "")
                pair = split_bilingual(text)
                if pair:
                    pairs[text] = pair[1]
                if HAN.search(text) and index + 1 < len(blocks):
                    following = blocks[index + 1].get("text", "")
                    if LATIN.search(following) and not HAN.search(following):
                        pairs[text] = following
                for row in block.get("rows", []) or []:
                    for cell in row:
                        cell_text = cell.get("text", "")
                        cell_pair = split_bilingual(cell_text)
                        if cell_pair:
                            pairs[cell_text] = cell_pair[1]
                index += 1
    return pairs


def main() -> None:
    parser = VisibleTextParser()
    for page in (ROOT / "out/zh-tw").rglob("*.html"):
        parser.feed(page.read_text("utf-8"))

    english = collect_existing_english()
    values = sorted(parser.values, key=lambda item: (len(item), item))
    for index, source in enumerate(values, 1):
        if source not in english:
            english[source] = argos.translate(source, "zh", "en")
        if index % 40 == 0:
            print(f"English {index}/{len(values)}", flush=True)

    vietnamese: dict[str, str] = {}
    for index, source in enumerate(values, 1):
        vietnamese[source] = argos.translate(english[source], "en", "vi")
        if index % 40 == 0:
            print(f"Vietnamese {index}/{len(values)}", flush=True)

    output = {"en": {key: english[key] for key in values}, "vi": vietnamese}
    target = ROOT / "app/content/site-translations.json"
    target.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", "utf-8")
    print(f"Wrote {len(values)} phrases to {target}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(error, file=sys.stderr)
        raise
