#!/usr/bin/env python3
"""Generate downloadable Traditional Chinese product sheets from the built site."""

from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path

from lxml import html
from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable,
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DOCS = ROOT / "docs"
OUTPUT = ROOT / "output" / "pdf"
DOWNLOADS = PUBLIC / "downloads" / "products"
SLUGS = ["ius-4065", "lf-et78a", "lf-hr53a", "gte-8030", "gte-8075"]

NAVY = colors.HexColor("#0B2A4A")
BLUE = colors.HexColor("#124BFF")
PALE = colors.HexColor("#EAF3FF")
LIME = colors.HexColor("#D5FF51")
INK = colors.HexColor("#142538")
MUTED = colors.HexColor("#5D7082")
LINE = colors.HexColor("#D7E2EC")

pdfmetrics.registerFont(TTFont("LeadFairTC", "/System/Library/Fonts/STHeiti Medium.ttc", subfontIndex=0))
FONT = "LeadFairTC"


def clean(value: str | None) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def text(node) -> str:
    return clean(" ".join(node.itertext())) if node is not None else ""


def local_image(src: str | None) -> Path | None:
    if not src:
        return None
    src = src.split("?")[0].lstrip("./")
    if src.startswith("leadfair-materials/"):
        src = src[len("leadfair-materials/"):]
    if src.startswith("images/"):
        candidate = PUBLIC / src
        return candidate if candidate.exists() else None
    return None


class Hero(Flowable):
    def __init__(self, image_path: Path, eyebrow: str, name: str, title: str, summary: str, metrics: list[tuple[str, str]]):
        super().__init__()
        self.width = 178 * mm
        self.height = 106 * mm
        self.image_path = image_path
        self.eyebrow = eyebrow
        self.name = name
        self.title = title
        self.summary = summary
        self.metrics = metrics[:3]

    def draw(self):
        canvas = self.canv
        canvas.saveState()
        radius = 7 * mm
        clip = canvas.beginPath()
        clip.roundRect(0, 0, self.width, self.height, radius)
        canvas.clipPath(clip, stroke=0, fill=0)
        with PILImage.open(self.image_path) as source:
            iw, ih = source.size
        scale = max(self.width / iw, self.height / ih)
        dw, dh = iw * scale, ih * scale
        canvas.drawImage(str(self.image_path), (self.width - dw) / 2, (self.height - dh) / 2, dw, dh, mask="auto")
        canvas.setFillColor(colors.Color(0.025, 0.12, 0.23, alpha=0.88))
        canvas.rect(0, 0, self.width * 0.67, self.height, stroke=0, fill=1)
        canvas.setFillColor(colors.white)
        x = 13 * mm
        y = self.height - 16 * mm
        canvas.setFont(FONT, 8)
        canvas.setFillColor(colors.HexColor("#9EC3FF"))
        canvas.drawString(x, y, self.eyebrow[:70])
        y -= 18 * mm
        canvas.setFillColor(colors.white)
        canvas.setFont(FONT, 29)
        canvas.drawString(x, y, self.name)
        y -= 13 * mm
        canvas.setFont(FONT, 15)
        canvas.drawString(x, y, self.title[:32])
        y -= 10 * mm
        p = Paragraph(self.summary, ParagraphStyle("heroSummary", fontName=FONT, fontSize=8.4, leading=13, textColor=colors.HexColor("#D7E4EE")))
        _, ph = p.wrap(self.width * 0.52, 30 * mm)
        p.drawOn(canvas, x, y - ph)
        y -= ph + 9 * mm
        if self.metrics:
            box_w = 40 * mm
            for index, (value, label) in enumerate(self.metrics):
                bx = x + index * (box_w + 3 * mm)
                canvas.setStrokeColor(colors.Color(1, 1, 1, alpha=0.3))
                canvas.roundRect(bx, y - 18 * mm, box_w, 18 * mm, 3 * mm, stroke=1, fill=0)
                canvas.setFillColor(LIME)
                canvas.setFont(FONT, 12)
                canvas.drawString(bx + 4 * mm, y - 7 * mm, value[:16])
                canvas.setFillColor(colors.white)
                canvas.setFont(FONT, 6.5)
                canvas.drawString(bx + 4 * mm, y - 13 * mm, label[:18])
        canvas.restoreState()


styles = getSampleStyleSheet()
BODY = ParagraphStyle("BodyTC", parent=styles["BodyText"], fontName=FONT, fontSize=9.3, leading=15, textColor=INK, spaceAfter=6)
H2 = ParagraphStyle("H2TC", parent=styles["Heading2"], fontName=FONT, fontSize=20, leading=26, textColor=INK, spaceBefore=10, spaceAfter=9)
H3 = ParagraphStyle("H3TC", parent=styles["Heading3"], fontName=FONT, fontSize=12, leading=17, textColor=INK, spaceBefore=5, spaceAfter=5)
EYEBROW = ParagraphStyle("EyebrowTC", parent=BODY, fontName=FONT, fontSize=7.5, leading=10, textColor=BLUE, spaceBefore=8, spaceAfter=4)
NOTE = ParagraphStyle("NoteTC", parent=BODY, fontName=FONT, fontSize=7.6, leading=11, textColor=MUTED)


def paragraph(value: str, style=BODY) -> Paragraph:
    return Paragraph(value.replace("&", "&amp;"), style)


def table_flow(rows: list[list[str]], header=True, widths=None) -> Table:
    data = [[paragraph(cell, ParagraphStyle("cell", parent=BODY, fontSize=7.2, leading=10, textColor=colors.white if header and r == 0 else INK)) for cell in row] for r, row in enumerate(rows)]
    table = Table(data, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    commands = [
        ("FONTNAME", (0, 0), (-1, -1), FONT),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    if header:
        commands.extend([("BACKGROUND", (0, 0), (-1, 0), NAVY), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white)])
        if len(rows) > 1:
            commands.append(("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F4F8FC")]))
    table.setStyle(TableStyle(commands))
    return table


def image_flow(path: Path | None, max_width=178 * mm, max_height=78 * mm):
    if not path:
        return None
    with PILImage.open(path) as im:
        iw, ih = im.size
    scale = min(max_width / iw, max_height / ih)
    return Image(str(path), width=iw * scale, height=ih * scale)


def page_decor(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(16 * mm, 13 * mm, A4[0] - 16 * mm, 13 * mm)
    canvas.setFont(FONT, 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(16 * mm, 8 * mm, "峰暉塑膠｜產品資料")
    canvas.drawRightString(A4[0] - 16 * mm, 8 * mm, f"{doc.product_name}   {doc.page}")
    canvas.restoreState()


def ius_content() -> tuple[dict, list]:
    tree = html.fromstring((PUBLIC / "ius-4065-reference.html").read_text(encoding="utf-8"))
    header = tree.cssselect("body > header")[0]
    metrics = [(text(node.cssselect("strong")[0]), text(node.cssselect("span")[0])) for node in header.cssselect(".metric")]
    meta = {
        "eyebrow": text(header.cssselect(".eyebrow")[0]),
        "name": "IUS-4065",
        "title": "超柔軟低收縮彈性體",
        "summary": text(header.cssselect("p")[0]),
        "metrics": metrics,
        "image": PUBLIC / "images/ius-reference/visual-01.jpg",
    }
    sections = []
    for section in tree.cssselect("main > section"):
        sections.append(section)
        if "applications" in (section.get("class") or "").split():
            break
    return meta, sections


def modular_content(slug: str) -> tuple[dict, list]:
    tree = html.fromstring((DOCS / "zh-tw" / "products" / slug / "index.html").read_text(encoding="utf-8"))
    hero = tree.cssselect(".modular-product-hero")[0]
    specs = []
    for item in hero.cssselect(".modular-product-specs > div"):
        specs.append((text(item.cssselect("dd")[0]), text(item.cssselect("dt")[0])))
    meta = {
        "eyebrow": text(hero.cssselect(".modular-product-intro > span")[0]),
        "name": text(hero.cssselect("h1")[0]),
        "title": text(hero.cssselect("h2")[0]),
        "summary": text(hero.cssselect(".modular-product-intro > p")[0]),
        "metrics": specs,
        "image": local_image(hero.cssselect("img")[0].get("src")),
    }
    sections = tree.cssselect(".product-modules > .product-module")
    app = tree.cssselect(".product-fixed-applications")
    if app:
        sections.append(app[0])
    return meta, sections


def add_section(story: list, section, is_ius=False):
    eyebrow = section.cssselect(".eyebrow, .product-module-heading > span")
    heading = section.cssselect("h2")
    if eyebrow:
        story.append(paragraph(text(eyebrow[0]).upper(), EYEBROW))
    if heading:
        story.append(paragraph(text(heading[0]), H2))

    lead_paragraphs = section.xpath(".//p[not(ancestor::article) and not(ancestor::figcaption)]")
    for node in lead_paragraphs:
        value = text(node)
        if value:
            story.append(paragraph(value, NOTE if "note" in (node.get("class") or "") else BODY))

    cards = section.cssselect("article")
    if cards:
        cells = []
        for card in cards:
            title_nodes = card.cssselect("h3")
            body_nodes = card.cssselect("p")
            cell = []
            if title_nodes:
                cell.append(paragraph(text(title_nodes[0]), H3))
            for body in body_nodes:
                cell.append(paragraph(text(body), NOTE))
            cells.append(cell)
        grid = []
        for index in range(0, len(cells), 2):
            row = cells[index:index + 2]
            if len(row) == 1:
                row.append([])
            grid.append(row)
        card_table = Table(grid, colWidths=[86 * mm, 86 * mm], hAlign="LEFT")
        card_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOX", (0, 0), (-1, -1), 0.5, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE), ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F7FAFD")), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7)]))
        story.extend([card_table, Spacer(1, 5 * mm)])

    for source_table in section.cssselect("table"):
        rows = []
        for row in source_table.cssselect("tr"):
            rows.append([text(cell) for cell in row.cssselect("th, td")])
        if rows:
            width = 178 * mm / max(1, len(rows[0]))
            story.extend([table_flow(rows, widths=[width] * len(rows[0])), Spacer(1, 6 * mm)])

    lists = section.cssselect("ul")
    for source_list in lists:
        if source_list.xpath("ancestor::article"):
            continue
        bullets = [[paragraph("•", BODY), paragraph(text(item), BODY)] for item in source_list.xpath("./li")]
        if bullets:
            bullet_table = Table(bullets, colWidths=[5 * mm, 165 * mm], hAlign="LEFT")
            bullet_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("TEXTCOLOR", (0, 0), (0, -1), BLUE)]))
            story.extend([bullet_table, Spacer(1, 4 * mm)])

    image_nodes = section.cssselect("figure img") if is_ius else section.cssselect("figure img")
    for node in image_nodes[:2]:
        image = image_flow(local_image(node.get("src")))
        if image:
            caption = node.getparent().cssselect("figcaption")
            group = [image]
            if caption:
                group.append(paragraph(text(caption[0]), ParagraphStyle("caption", parent=NOTE, alignment=TA_CENTER)))
            story.extend([KeepTogether(group), Spacer(1, 5 * mm)])


def build_pdf(slug: str):
    meta, sections = ius_content() if slug == "ius-4065" else modular_content(slug)
    output = OUTPUT / f"{slug}-product-sheet-zh-tw.pdf"
    doc = SimpleDocTemplate(str(output), pagesize=A4, leftMargin=16 * mm, rightMargin=16 * mm, topMargin=16 * mm, bottomMargin=18 * mm, title=f"{meta['name']} 產品資料", author="峰暉塑膠")
    doc.product_name = meta["name"]
    story = [Hero(meta["image"], meta["eyebrow"], meta["name"], meta["title"], meta["summary"], meta["metrics"]), Spacer(1, 8 * mm)]
    for index, section in enumerate(sections):
        if index:
            story.append(Spacer(1, 3 * mm))
        add_section(story, section, is_ius=slug == "ius-4065")
    story.extend([Spacer(1, 7 * mm), paragraph("資料僅供材料選型與配方開發參考，實際性能依配方、製程及測試條件而定。", NOTE)])
    doc.build(story, onFirstPage=page_decor, onLaterPages=page_decor)
    shutil.copy2(output, DOWNLOADS / output.name)
    print(output)


def parse_args():
    parser = argparse.ArgumentParser(description="Generate downloadable product PDF sheets.")
    parser.add_argument("--product", action="append", choices=SLUGS, help="Product slug to generate. Repeat for multiple products.")
    parser.add_argument("--all", action="store_true", help="Generate every configured product PDF.")
    return parser.parse_args()


def main():
    args = parse_args()
    selected = SLUGS if args.all else (args.product or ["ius-4065"])
    OUTPUT.mkdir(parents=True, exist_ok=True)
    DOWNLOADS.mkdir(parents=True, exist_ok=True)
    for slug in selected:
        build_pdf(slug)


if __name__ == "__main__":
    main()
