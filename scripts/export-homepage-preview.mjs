import { cp, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const flatRoot = path.resolve(process.argv[2]);
const preferred = path.resolve(process.argv[3] || path.join(process.cwd(), "..", "峰晖网站-首页源码预览-2026-09-23"));

async function exists(file) {
  try { await stat(file); return true; } catch { return false; }
}

async function uniqueDirectory(base) {
  if (!(await exists(base))) return base;
  for (let index = 2; ; index += 1) {
    const candidate = `${base}-${index}`;
    if (!(await exists(candidate))) return candidate;
  }
}

function references(content, expression) {
  return [...new Set([...content.matchAll(expression)].map(match => match[1].split(/[?#]/)[0]))];
}

async function copyRelative(relative, destination) {
  const decoded = decodeURIComponent(relative);
  const source = path.join(flatRoot, decoded);
  if (!(await exists(source))) return;
  const target = path.join(destination, decoded);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target, { recursive: true });
}

if (!(await exists(path.join(flatRoot, "index.html")))) throw new Error(`找不到首页文件：${flatRoot}/index.html`);

const destination = await uniqueDirectory(preferred);
const homepage = path.join(destination, "01-繁體中文", "01-首页");
await mkdir(path.join(homepage, "css"), { recursive: true });
await mkdir(path.join(homepage, "images"), { recursive: true });
await mkdir(path.join(homepage, "js"), { recursive: true });

const html = await readFile(path.join(flatRoot, "index.html"), "utf8");
const css = await readFile(path.join(flatRoot, "css", "index.css"), "utf8");
await writeFile(path.join(homepage, "index.html"), html);
await writeFile(path.join(homepage, "css", "index.css"), css);

const htmlReferences = new Set(references(html, /(?:src|href)=["'](?:\.\/)?((?:images|js)\/[^"']+)/g));
for (const match of html.matchAll(/(?:imageSrcSet|srcset)=["']([^"']+)/g)) {
  for (const candidate of match[1].split(",")) htmlReferences.add(candidate.trim().split(/\s+/)[0]);
}
for (const reference of htmlReferences) {
  await copyRelative(reference, homepage);
}
for (const reference of references(css, /url\(["']?\.\.\/((?:images)\/[^"')]+)/g)) {
  await copyRelative(reference, homepage);
}

await writeFile(path.join(destination, "README-预览说明.txt"), `峰晖材料网站｜首页规范源码预览

目录：01-繁體中文 / 01-首页

- index.html：已按 HTML 层级逐行缩进整理
- css/index.css：已按选择器与属性逐行整理
- images/：首页实际引用的图片和图标
- js/：首页运行所需脚本

请服务商先检查本预览的代码格式。确认后可用同一规范重新导出全站所有页面。
`);

console.log(destination);
