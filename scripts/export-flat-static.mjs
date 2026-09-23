import { cp, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import beautify from "js-beautify";

const { html: beautifyHtml, css: beautifyCss } = beautify;
const htmlFormat = { indent_size: 2, wrap_line_length: 120, end_with_newline: true, extra_liners: [] };
const cssFormat = { indent_size: 2, selector_separator_newline: true, newline_between_rules: true, end_with_newline: true };

const root = process.cwd();
const out = path.join(root, "out");
const preferred = path.resolve(process.argv[2] || path.join(root, "..", `峰晖网站-传统HTML交付版-${new Date().toISOString().slice(0, 10)}`));

async function exists(file) {
  try { await stat(file); return true; } catch { return false; }
}

async function destinationFor(base) {
  if (!(await exists(base))) return base;
  for (let index = 2; ; index += 1) {
    const candidate = `${base}-${index}`;
    if (!(await exists(candidate))) return candidate;
  }
}

async function walk(directory, predicate = () => true) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(absolute, predicate));
    else if (predicate(absolute)) result.push(absolute);
  }
  return result;
}

function pageName(locale, route) {
  const prefix = locale === "zh-tw" ? "" : `${locale}-`;
  if (route === "") return `${prefix}index.html`;
  const parts = route.split("/").filter(Boolean);
  if (parts[0] === "products" && parts.length === 1) return `${prefix}products.html`;
  if (parts[0] === "products") return `${prefix}product-${parts[1]}.html`;
  if (parts[0] === "articles") return `${prefix}articles.html`;
  if (parts[0] === "blog" && parts.length === 1) return `${prefix}blog.html`;
  if (parts[0] === "blog") return `${prefix}article-${parts[1]}.html`;
  if (parts[0] === "company" && parts.length === 1) return `${prefix}company.html`;
  if (parts[0] === "company" && parts[1] === "laboratory" && parts.length === 2) return `${prefix}laboratory.html`;
  if (parts[0] === "company" && parts[1] === "laboratory") return `${prefix}laboratory-${parts[2]}.html`;
  if (parts[0] === "contact") return `${prefix}contact.html`;
  if (parts[0] === "honors") return `${prefix}honors.html`;
  return `${prefix}${parts.join("-")}.html`;
}

if (!(await exists(out))) throw new Error("找不到 out/，请先运行 sh scripts/build-pages.sh");
const destination = await destinationFor(preferred);
await mkdir(destination, { recursive: true });

const routeMap = new Map();
const pages = [];
for (const locale of ["zh-tw", "en", "vi"]) {
  const localeRoot = path.join(out, locale);
  for (const htmlFile of await walk(localeRoot, file => file.endsWith(`${path.sep}index.html`) || file === path.join(localeRoot, "index.html"))) {
    const relative = path.relative(localeRoot, htmlFile).split(path.sep).join("/");
    const route = relative === "index.html" ? "" : relative.replace(/\/index\.html$/, "");
    const filename = pageName(locale, route);
    pages.push({ locale, route, filename, source: htmlFile });
    const localizedRoute = `/leadfair-materials/${locale}/${route}${route ? "/" : ""}`;
    routeMap.set(localizedRoute, filename);
    routeMap.set(localizedRoute.replace(/\/$/, ""), filename);
    const localRoute = `/${locale}/${route}${route ? "/" : ""}`;
    routeMap.set(localRoute, filename);
    routeMap.set(localRoute.replace(/\/$/, ""), filename);
    if (locale === "zh-tw") {
      const defaultRoute = `/leadfair-materials/${route}${route ? "/" : ""}`;
      routeMap.set(defaultRoute, filename);
      routeMap.set(defaultRoute.replace(/\/$/, ""), filename);
      if (route) {
        routeMap.set(`/${route}/`, filename);
        routeMap.set(`/${route}`, filename);
      }
    }
  }
}

function rewriteHtml(source) {
  let html = source
    .replaceAll("/leadfair-materials/_next/static/css/", "css/")
    .replaceAll("/leadfair-materials/_next/static/chunks/", "js/")
    .replaceAll("/leadfair-materials/_next/static/", "js/static/")
    .replaceAll("/leadfair-materials/images/", "images/")
    .replaceAll("/leadfair-materials/icons/", "images/icons/")
    .replaceAll("/leadfair-materials/ius-4065-reference.html", "ius-4065-reference.html")
    .replaceAll("/leadfair-materials/ius-4065-reference.css", "ius-4065-reference.css");
  html = html.replace(/href="([^"]+)"/g, (attribute, href) => {
    if (/^(?:https?:|mailto:|tel:|#)/.test(href)) return attribute;
    const match = href.match(/^([^?#]+)(.*)$/);
    if (!match) return attribute;
    const filename = routeMap.get(match[1]);
    return filename ? `href="${filename}${match[2]}"` : attribute;
  });
  return html;
}

const cssSource = path.join(out, "_next", "static", "css");
const cssDestination = path.join(destination, "css");
await mkdir(cssDestination, { recursive: true });
for (const page of pages) {
  const original = await readFile(page.source, "utf8");
  const cssFiles = [...new Set([...original.matchAll(/href=["']\/leadfair-materials\/_next\/static\/css\/([^"']+\.css)["']/g)].map(match => match[1]))];
  const cssName = page.filename.replace(/\.html$/, ".css");
  const cssParts = [];
  for (const filename of cssFiles) {
    cssParts.push((await readFile(path.join(cssSource, filename), "utf8"))
      .replaceAll("/leadfair-materials/images/", "../images/")
      .replaceAll("/leadfair-materials/icons/", "../images/icons/"));
  }
  await writeFile(path.join(cssDestination, cssName), beautifyCss(cssParts.join("\n"), cssFormat));

  let keptStylesheet = false;
  const html = rewriteHtml(original).replace(/<link rel="stylesheet" href="css\/[^"]+\.css"[^>]*\/?>(?:<\/link>)?/g, () => {
    if (keptStylesheet) return "";
    keptStylesheet = true;
    return `<link rel="stylesheet" href="css/${cssName}"/>`;
  });
  await writeFile(path.join(destination, page.filename), beautifyHtml(html, htmlFormat));
}

const chunksSource = path.join(out, "_next", "static", "chunks");
const jsDestination = path.join(destination, "js");
await mkdir(jsDestination, { recursive: true });
for (const jsFile of await walk(chunksSource, file => file.endsWith(".js"))) {
  const relative = path.relative(chunksSource, jsFile);
  const target = path.join(jsDestination, relative);
  await mkdir(path.dirname(target), { recursive: true });
  const js = (await readFile(jsFile, "utf8"))
    .replaceAll("/leadfair-materials/images/", "images/")
    .replaceAll("/leadfair-materials/icons/", "images/icons/")
    .replaceAll("/leadfair-materials/ius-4065-reference.html", "ius-4065-reference.html");
  await writeFile(target, js);
}
for (const entry of await readdir(path.join(out, "_next", "static"), { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "chunks" || entry.name === "css") continue;
  await cp(path.join(out, "_next", "static", entry.name), path.join(jsDestination, "static", entry.name), { recursive: true });
}

await cp(path.join(root, "public", "images"), path.join(destination, "images"), { recursive: true });
await cp(path.join(root, "public", "icons"), path.join(destination, "images", "icons"), { recursive: true });
await writeFile(path.join(destination, "ius-4065-reference.html"), beautifyHtml(await readFile(path.join(root, "public", "ius-4065-reference.html"), "utf8"), htmlFormat));
await writeFile(path.join(destination, "ius-4065-reference.css"), beautifyCss(await readFile(path.join(root, "public", "ius-4065-reference.css"), "utf8"), cssFormat));

const rows = ["语言,原路由,HTML文件", ...pages.map(page => `${page.locale},/${page.locale}/${page.route},${page.filename}`)];
await writeFile(path.join(destination, "页面对应表.csv"), `\uFEFF${rows.join("\n")}`);
await writeFile(path.join(destination, "README-打开说明.txt"), `峰晖材料网站｜传统 HTML 交付版

目录结构：
- 根目录：全部页面 HTML
- css：页面样式表
- images：全部图片与图标
- js：页面脚本

打开方式：
1. 可直接双击 index.html 查看繁体中文首页。
2. 推荐使用任意静态服务器打开，以确保浏览器脚本功能完整。
3. 服务商可按照“页面对应表.csv”查找每个路由对应的 HTML 文件。

注意：本目录专为传统 HTML/CSS/JS 交接生成，所有资源路径均已改为相对路径，不依赖公开网址。
`);

console.log(destination);
console.log(JSON.stringify({ pages: pages.length }));
