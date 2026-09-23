import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const input = process.argv[2];
if (!input) throw new Error("Usage: node scripts/import-ius-reference.mjs <reference.html>");

const imageDir = path.resolve("public/images/ius-reference");
fs.mkdirSync(imageDir, { recursive: true });

let html = fs.readFileSync(input, "utf8");
if (/<script\b/i.test(html) || /\bon\w+\s*=/i.test(html) || /javascript:/i.test(html)) {
  throw new Error("Reference contains executable content; inspect it before importing.");
}

let index = 0;
html = html.replace(/data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)/g, (_match, format, encoded) => {
  index += 1;
  const extension = format === "jpeg" ? "jpg" : format;
  const name = `visual-${String(index).padStart(2, "0")}.${extension}`;
  const output = path.join(imageDir, name);
  fs.writeFileSync(output, Buffer.from(encoded, "base64"));
  if (![3, 4].includes(index) && extension === "png") {
    const jpegName = name.replace(/\.png$/, ".jpg");
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "75", "-Z", "1400", output, "--out", path.join(imageDir, jpegName)], { stdio: "ignore" });
    fs.unlinkSync(output);
    return `./images/ius-reference/${jpegName}`;
  }
  return `./images/ius-reference/${name}`;
});

if (index !== 6) throw new Error(`Expected six reference images, found ${index}`);
html = html.replace("</head>", '<link rel="stylesheet" href="./ius-4065-reference.css"></head>');
html = html.replace("</body>", `<script>
  const reportHeight = () => parent.postMessage({ type: "ius4065:height", height: document.body.scrollHeight }, location.origin);
  addEventListener("load", reportHeight);
  addEventListener("message", (event) => {
    if (event.origin === location.origin && event.data?.type === "ius4065:measure") reportHeight();
  });
  new ResizeObserver(reportHeight).observe(document.body);
</script></body>`);
fs.writeFileSync(path.resolve("public/ius-4065-reference.html"), html);
console.log(`Imported IUS-4065 reference page with ${index} separate image files.`);
