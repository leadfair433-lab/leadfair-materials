import { cp, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import beautify from "js-beautify";

const { html: beautifyHtml, css: beautifyCss } = beautify;
const htmlFormat = { indent_size: 2, wrap_line_length: 120, end_with_newline: true, extra_liners: [] };
const cssFormat = { indent_size: 2, selector_separator_newline: true, newline_between_rules: true, end_with_newline: true };

const root = process.cwd();
const flatRoot = path.resolve(process.argv[2] || path.join(root, "..", "峰晖网站-传统HTML交付版-2026-09-23"));
const preferred = path.resolve(process.argv[3] || path.join(root, "..", `峰晖网站-按栏目分类交付版-${new Date().toISOString().slice(0, 10)}`));

async function exists(file) { try { await stat(file); return true; } catch { return false; } }
async function uniqueDirectory(base) {
  if (!(await exists(base))) return base;
  for (let index = 2; ; index += 1) if (!(await exists(`${base}-${index}`))) return `${base}-${index}`;
}

function languageFor(filename) {
  if (filename.startsWith("en-")) return { code: "en", folder: "02-English" };
  if (filename.startsWith("vi-")) return { code: "vi", folder: "03-Tiếng-Việt" };
  return { code: "zh-tw", folder: "01-繁體中文" };
}
function bareName(filename) { return filename.replace(/^(?:en-|vi-)/, "").replace(/\.html$/, ""); }
function sectionFor(filename) {
  const language = languageFor(filename);
  const name = bareName(filename);
  if (name === "index") return { ...language, section: "01-首页", output: "index.html", title: "首页" };
  if (name === "products") return { ...language, section: "02-产品", output: "index.html", title: "产品总览" };
  if (name.startsWith("product-")) return { ...language, section: "02-产品", output: `${name.slice(8)}.html`, title: name.slice(8).toUpperCase() };
  if (name === "company") return { ...language, section: "03-企业介绍", output: "index.html", title: "企业介绍" };
  if (name === "laboratory") return { ...language, section: "03-企业介绍", output: "laboratory.html", title: "实验室仪器总览" };
  if (name.startsWith("laboratory-")) return { ...language, section: "03-企业介绍", output: `${name}.html`, title: `实验室-${name.slice(11)}` };
  if (name === "honors") return { ...language, section: "04-企业荣誉", output: "index.html", title: "企业荣誉" };
  if (name === "contact") return { ...language, section: "05-联系我们", output: "index.html", title: "联系我们" };
  if (name === "articles") return { ...language, section: "06-Blog文章", output: "index.html", title: "文章总览" };
  if (name === "blog") return { ...language, section: "06-Blog文章", output: "blog.html", title: "Blog列表" };
  if (name.startsWith("article-")) return { ...language, section: "06-Blog文章", output: `${name}.html`, title: `文章-${name.slice(8)}` };
  return { ...language, section: "07-其他页面", output: `${name}.html`, title: name };
}
function collect(content, prefix, extensions) {
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...new Set(content.match(new RegExp(`${escaped}[^\\s\\"'<>),]+\\.(?:${extensions})`, "g")) || [])];
}
async function copyReferences(references, destinationSection) {
  for (const reference of references) {
    const clean = decodeURIComponent(reference.replace(/^\.\.\//, "").replace(/^\.\//, "").split(/[?#]/)[0]);
    const source = path.join(flatRoot, clean);
    if (!(await exists(source))) continue;
    const target = path.join(destinationSection, clean);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(source, target);
  }
}

if (!(await exists(flatRoot))) throw new Error(`找不到传统 HTML 目录：${flatRoot}`);
const destination = await uniqueDirectory(preferred);
await mkdir(destination, { recursive: true });
const htmlFiles = (await readdir(flatRoot)).filter(file => file.endsWith(".html") && file !== "ius-4065-reference.html").sort();
const pageMap = new Map(htmlFiles.map(filename => [filename, sectionFor(filename)]));
const manifest = ["语言,栏目,页面,HTML文件"];

for (const filename of htmlFiles) {
  const info = pageMap.get(filename);
  const sectionDirectory = path.join(destination, info.folder, info.section);
  await mkdir(path.join(sectionDirectory, "css"), { recursive: true });
  await mkdir(path.join(sectionDirectory, "images"), { recursive: true });
  await mkdir(path.join(sectionDirectory, "js"), { recursive: true });

  const sourceCssName = filename.replace(/\.html$/, ".css");
  const outputCssName = info.output.replace(/\.html$/, ".css");
  const css = await readFile(path.join(flatRoot, "css", sourceCssName), "utf8");
  await writeFile(path.join(sectionDirectory, "css", outputCssName), beautifyCss(css, cssFormat));

  let html = await readFile(path.join(flatRoot, filename), "utf8");
  html = html.replace(`css/${sourceCssName}`, `css/${outputCssName}`);
  html = html.replace(/href="([^"]+\.html)(#[^"]*)?"/g, (attribute, targetName, hash = "") => {
    const target = pageMap.get(targetName);
    if (!target) return attribute;
    const from = path.join(info.folder, info.section);
    const to = path.join(target.folder, target.section, target.output);
    return `href="${path.relative(from, to).split(path.sep).join("/")}${hash}"`;
  });
  await writeFile(path.join(sectionDirectory, info.output), beautifyHtml(html, htmlFormat));

  await copyReferences(new Set([
    ...collect(html, "images/", "png|jpe?g|webp|gif|svg|avif"),
    ...collect(css, "../images/", "png|jpe?g|webp|gif|svg|avif"),
    ...collect(html, "js/", "js"),
  ]), sectionDirectory);

  if (html.includes("ius-4065-reference.html")) {
    await cp(path.join(flatRoot, "ius-4065-reference.html"), path.join(sectionDirectory, "ius-4065-reference.html"));
    await cp(path.join(flatRoot, "ius-4065-reference.css"), path.join(sectionDirectory, "ius-4065-reference.css"));
    const referenceHtml = await readFile(path.join(flatRoot, "ius-4065-reference.html"), "utf8");
    const referenceCss = await readFile(path.join(flatRoot, "ius-4065-reference.css"), "utf8");
    await copyReferences(new Set([
      ...collect(referenceHtml, "./images/", "png|jpe?g|webp|gif|svg|avif"),
      ...collect(referenceCss, "./images/", "png|jpe?g|webp|gif|svg|avif"),
    ]), sectionDirectory);
  }

  manifest.push(`${info.code},${info.section},${info.title},${info.folder}/${info.section}/${info.output}`);
}

await writeFile(path.join(destination, "页面目录清单.csv"), `\uFEFF${manifest.join("\n")}`);
await writeFile(path.join(destination, "README-交付说明.txt"), `峰晖材料网站｜按栏目分类交付版

目录层级：语言 → 栏目。

每个栏目目录采用参考图结构：
- css/：栏目内每个 HTML 对应的同名 CSS
- images/：该栏目页面使用的图片与图标
- js/：该栏目页面使用的脚本
- *.html：该栏目下的每一页

示例：
02-产品/index.html 对应 css/index.css；
02-产品/ius-4065.html 对应 css/ius-4065.css。

页面目录清单.csv 列出了全部页面位置。
`);
console.log(destination);
console.log(JSON.stringify({ pages: htmlFiles.length }));
