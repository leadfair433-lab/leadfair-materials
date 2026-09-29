from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "public/images/ius-reference"
BLUE = "#5794e6"
NAVY = "#244d80"
LIGHT = "#8fb7eb"
INK = "#17243a"
MUTED = "#607086"
GRID = "#d9e2ec"


def font(size, bold=False):
    name = "Arial Bold.ttf" if bold else "Arial.ttf"
    return ImageFont.truetype(f"/System/Library/Fonts/Supplemental/{name}", size)


def centered(draw, xy, text, fnt, fill=INK):
    box = draw.textbbox((0, 0), text, font=fnt)
    draw.text((xy[0] - (box[2] - box[0]) / 2, xy[1]), text, font=fnt, fill=fill)


def vertical_text(image, center, text, fnt):
    box = fnt.getbbox(text)
    layer = Image.new("RGBA", (box[2] - box[0] + 20, box[3] - box[1] + 20), "white")
    ImageDraw.Draw(layer).text((10, 10), text, font=fnt, fill=INK)
    layer = layer.rotate(90, expand=True)
    image.paste(layer, (int(center[0] - layer.width / 2), int(center[1] - layer.height / 2)), layer)


def small_chart(filename, title, ylabel, values, suffix="", comparison_label="Comparison Material", note="EVA 7470M / comparison material = 60 / 40 PHR; expansion ratio 160%; lower values are better."):
    w, h = 1674, 1046
    image = Image.new("RGB", (w, h), "white")
    d = ImageDraw.Draw(image)
    d.text((36, 30), title, font=font(40, True), fill="#111111")
    left, top, right, bottom = 175, 130, 1620, 815
    maximum = 50 if max(values) > 10 else 4.2
    steps = 5 if maximum == 50 else 4
    for i in range(steps + 1):
        y = bottom - (bottom - top) * i / steps
        d.line((left, y, right, y), fill=GRID, width=2)
        label = f"{int(maximum * i / steps)}" if maximum == 50 else f"{int(i)}%"
        box = d.textbbox((0, 0), label, font=font(24))
        d.text((left - box[2] - 15, y - 13), label, font=font(24), fill="#333333")
    labels = ["DF610", "ENGAGE 8842", "IUS-4065"]
    xs = [380, 850, 1320]
    bar_w = 260
    for x, label, value, color in zip(xs, labels, values, [BLUE, BLUE, NAVY]):
        y = bottom - (bottom - top) * value / maximum
        d.rectangle((x - bar_w / 2, y, x + bar_w / 2, bottom), fill=color)
        value_label = f"{value:g}{suffix}"
        centered(d, (x, y - 44), value_label, font(25, True))
        centered(d, (x, bottom + 20), label, font(23), "#222222")
    vertical_text(image, (48, (top + bottom) / 2), ylabel, font(28, True))
    centered(d, ((left + right) / 2, bottom + 76), comparison_label, font(27, True), "#111111")
    centered(d, (w / 2, 940), note, font(21), MUTED)
    image.save(OUT / filename, optimize=True)


def timed_chart(filename="eva-foam-thermal-shrinkage-ius-4065-comparison-en.png", title="Thermal Shrinkage at 70°C by Heating Time", ylabel="Thermal Shrinkage (%)", comparison_label="Comparison Material", note="EVA 7470M / comparison material = 60 / 40 PHR; expansion ratio 160%; lower values are better.", legend_labels=None):
    w, h = 2401, 1466
    image = Image.new("RGB", (w, h), "white")
    d = ImageDraw.Draw(image)
    centered(d, (w / 2, 35), title, font(46, True), "#111111")
    left, top, right, bottom = 210, 150, 2320, 1260
    maximum = 9
    for i in range(10):
        y = bottom - (bottom - top) * i / maximum
        d.line((left, y, right, y), fill=GRID, width=2)
        d.text((145, y - 16), f"{i}%", font=font(26), fill="#222222")
    legend = [(LIGHT, label) for label in (legend_labels or ["70°C / 20 min", "70°C / 40 min", "70°C / 60 min"])]
    legend[1] = (BLUE, legend[1][1])
    legend[2] = (NAVY, legend[2][1])
    lx = 230
    for color, label in legend:
        d.rectangle((lx, 90, lx + 44, 112), fill=color)
        d.text((lx + 60, 80), label, font=font(27), fill="#222222")
        lx += 360
    labels = ["DF610", "ENGAGE 8842", "IUS-4065"]
    series = [[3.60, 5.26, 7.11], [3.20, 7.01, 8.10], [0.68, 0.68, 1.38]]
    centers = [560, 1240, 1920]
    bw = 145
    for center, label, values in zip(centers, labels, series):
        for j, (value, color) in enumerate(zip(values, [LIGHT, BLUE, NAVY])):
            x1 = center + (j - 1) * bw
            y = bottom - (bottom - top) * value / maximum
            d.rectangle((x1, y, x1 + bw, bottom), fill=color)
            centered(d, (x1 + bw / 2, y - 40), f"{value:.2f}%", font(27, True))
        centered(d, (center + bw / 2, bottom + 25), label, font(29), "#111111")
    vertical_text(image, (62, (top + bottom) / 2), ylabel, font(32, True))
    centered(d, (w / 2, bottom + 92), comparison_label, font(31, True), "#111111")
    centered(d, (w / 2, 1405), note, font(23), MUTED)
    image.save(OUT / filename, optimize=True)


if __name__ == "__main__":
    small_chart("visual-03-en.png", "Foamed-Product Hardness Comparison", "Hardness (Asker C)", [41, 42, 35])
    small_chart("visual-04-en.png", "Thermal Shrinkage at 70°C for 40 Minutes", "Thermal Shrinkage (%)", [3.60, 3.20, 0.68], "%")
    timed_chart()
    vi_note = "EVA 7470M / vật liệu so sánh = 60 / 40 PHR; tỷ lệ nở 160%; giá trị càng thấp càng tốt."
    small_chart("visual-03-vi.png", "So sánh độ cứng sản phẩm xốp", "Độ cứng (Asker C)", [41, 42, 35], comparison_label="Vật liệu so sánh", note=vi_note)
    small_chart("visual-04-vi.png", "Độ co nhiệt ở 70°C trong 40 phút", "Độ co nhiệt (%)", [3.60, 3.20, 0.68], "%", "Vật liệu so sánh", vi_note)
    timed_chart("eva-foam-thermal-shrinkage-ius-4065-comparison-vi.png", "Độ co nhiệt ở 70°C theo thời gian gia nhiệt", "Độ co nhiệt (%)", "Vật liệu so sánh", vi_note, ["70°C / 20 phút", "70°C / 40 phút", "70°C / 60 phút"])
