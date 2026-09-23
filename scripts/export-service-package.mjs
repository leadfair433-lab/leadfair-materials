import { cp, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const exportRoot = path.resolve(
  process.argv[2] || path.join(projectRoot, "..", `峰晖网站-服务商交付包-${new Date().toISOString().slice(0, 10)}`),
);
const staticRoot = path.join(projectRoot, "out");

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function uniqueDirectory(preferred) {
  if (!(await exists(preferred))) return preferred;
  for (let index = 2; ; index += 1) {
    const candidate = `${preferred}-${index}`;
    if (!(await exists(candidate))) return candidate;
  }
}

async function walk(directory, predicate = () => true) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute, predicate));
    else if (predicate(absolute)) files.push(absolute);
  }
  return files;
}

function routeForHtml(file) {
  const relative = path.relative(staticRoot, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

function categoryForRoute(route) {
  const normalized = route.replace(/^\/(zh-tw|en|vi)(?=\/)/, "");
  if (normalized === "/") return "01-首页";
  if (normalized.startsWith("/products")) return "02-产品页";
  if (normalized.startsWith("/company/laboratory")) return "03-实验室页";
  if (normalized.startsWith("/company")) return "04-企业介绍";
  if (normalized.startsWith("/articles") || normalized.startsWith("/blog")) return "05-文章页";
  if (normalized.startsWith("/honors")) return "06-企业荣誉";
  if (normalized.startsWith("/contact")) return "07-联络页面";
  if (normalized.startsWith("/admin")) return "08-后台原型";
  return "09-系统页面";
}

function localeForRoute(route) {
  const match = route.match(/^\/(zh-tw|en|vi)(?=\/)/);
  return match?.[1] || "默认繁中";
}

function safePageName(route) {
  return (route === "/" ? "首页" : route.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "__")) + ".html";
}

async function resolveStaticReference(htmlFile, rawReference) {
  const cleaned = rawReference
    .replaceAll("&amp;", "&")
    .split("#")[0]
    .split("?")[0];
  if (!cleaned || cleaned.includes("${") || /^(?:https?:|mailto:|tel:|data:|javascript:|#)/.test(cleaned)) return null;

  const filesystemReference = decodeURIComponent(cleaned);

  let candidate;
  if (filesystemReference.startsWith("/")) {
    const withoutBase = filesystemReference.replace(/^\/leadfair-materials(?=\/|$)/, "") || "/";
    candidate = path.join(staticRoot, withoutBase.replace(/^\//, ""));
  } else {
    candidate = path.resolve(path.dirname(htmlFile), filesystemReference);
  }
  if (await exists(candidate)) return null;
  if (await exists(path.join(candidate, "index.html"))) return null;
  if (await exists(`${candidate}.html`)) return null;
  return cleaned;
}

async function auditStaticExport(htmlFiles) {
  const missing = [];
  const referencePattern = /(?:src|href)=["']([^"']+)["']/g;
  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    for (const match of html.matchAll(referencePattern)) {
      const unresolved = await resolveStaticReference(htmlFile, match[1]);
      if (unresolved) missing.push(`${routeForHtml(htmlFile)} -> ${unresolved}`);
    }
  }
  return [...new Set(missing)].sort();
}

if (!(await exists(staticRoot))) {
  throw new Error("找不到 out/。请先运行 sh scripts/build-pages.sh。 ");
}

const destination = await uniqueDirectory(exportRoot);
await mkdir(destination, { recursive: true });

const staticDestination = path.join(destination, "01-静态网站-可直接部署");
await cp(staticRoot, staticDestination, { recursive: true });

const sourceDestination = path.join(destination, "02-完整源码");
await mkdir(sourceDestination, { recursive: true });
for (const directory of ["app", "scripts"]) {
  await cp(path.join(projectRoot, directory), path.join(sourceDestination, directory), { recursive: true });
}
for (const filename of [
  "package.json",
  "pnpm-lock.yaml",
  "next.config.ts",
  "tsconfig.json",
  "eslint.config.mjs",
  "next-env.d.ts",
  "README.md",
]) {
  const source = path.join(projectRoot, filename);
  if (await exists(source)) await cp(source, path.join(sourceDestination, filename));
}

const htmlFiles = (await walk(staticRoot, file => file.endsWith(".html")))
  .filter(file => !file.includes(`${path.sep}_next${path.sep}`))
  .sort();
const htmlDestination = path.join(destination, "03-各页面HTML源码");
const manifestRows = [];
for (const htmlFile of htmlFiles) {
  const route = routeForHtml(htmlFile);
  const category = categoryForRoute(route);
  const locale = localeForRoute(route);
  const targetDirectory = path.join(htmlDestination, category, locale);
  await mkdir(targetDirectory, { recursive: true });
  const filename = safePageName(route);
  await cp(htmlFile, path.join(targetDirectory, filename));
  manifestRows.push({ category, locale, route, filename });
}

const assetsDestination = path.join(destination, "04-CSS与图片资源");
await mkdir(assetsDestination, { recursive: true });
const sourceCssRoot = path.join(assetsDestination, "01-CSS源码-按模块");
for (const cssFile of await walk(path.join(projectRoot, "app"), file => file.endsWith(".css"))) {
  const relative = path.relative(path.join(projectRoot, "app"), cssFile);
  const target = path.join(sourceCssRoot, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(cssFile, target);
}
const compiledCss = path.join(staticRoot, "_next", "static", "css");
if (await exists(compiledCss)) {
  await cp(compiledCss, path.join(assetsDestination, "02-CSS编译成品"), { recursive: true });
}
for (const standaloneCss of ["ius-4065-reference.css"]) {
  const source = path.join(projectRoot, "public", standaloneCss);
  if (await exists(source)) await cp(source, path.join(sourceCssRoot, standaloneCss));
}
await cp(path.join(projectRoot, "public", "images"), path.join(assetsDestination, "03-图片"), { recursive: true });
if (await exists(path.join(projectRoot, "public", "icons"))) {
  await cp(path.join(projectRoot, "public", "icons"), path.join(assetsDestination, "04-图标"), { recursive: true });
}
const otherPublicDestination = path.join(assetsDestination, "05-public其他文件");
await mkdir(otherPublicDestination, { recursive: true });
for (const publicEntry of ["blog-reference", "favicon.svg", "ius-4065-reference.html"]) {
  const source = path.join(projectRoot, "public", publicEntry);
  if (await exists(source)) {
    await cp(source, path.join(otherPublicDestination, publicEntry), { recursive: true });
  }
}

const csv = [
  "分类,语言,页面路由,HTML文件",
  ...manifestRows.map(row => [row.category, row.locale, row.route, row.filename]
    .map(value => `"${value.replaceAll('"', '""')}"`).join(",")),
].join("\n");
await writeFile(path.join(destination, "页面清单.csv"), `\uFEFF${csv}`);

const missingReferences = await auditStaticExport(htmlFiles);
const auditText = [
  "# 静态导出检查报告",
  "",
  `- 生成时间：${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}`,
  `- HTML 页面文件：${htmlFiles.length}`,
  `- CSS 文件：${(await walk(staticRoot, file => file.endsWith(".css"))).length}`,
  `- 图片文件：${(await walk(path.join(projectRoot, "public", "images"))).length}`,
  `- 未解析的本地链接或资源：${missingReferences.length}`,
  "",
  ...(missingReferences.length ? ["## 需要服务商复核", "", ...missingReferences.map(item => `- ${item}`)] : ["所有已扫描的站内 HTML、CSS、JS 与图片引用均能在静态导出中找到。"]),
  "",
].join("\n");
await writeFile(path.join(destination, "静态导出检查报告.md"), auditText);

const readme = `# 峰晖材料网站｜服务商交付说明

本交付包用于服务商进行后台/CMS 接入与二次开发，不需要先拥有公开链接。

## 目录

- \`01-静态网站-可直接部署/\`：完整静态构建结果，包含 HTML、编译后的 CSS/JS 与运行所需资源。
- \`02-完整源码/\`：Next.js/React 页面源码、内容资料、构建脚本与项目配置。图片为避免重复占用空间，统一放在第 4 目录；复制回 \`public/\` 即可。
- \`03-各页面HTML源码/\`：按“页面类型 → 语言”分类的逐页 HTML，方便快速查找和比对。
- \`04-CSS与图片资源/\`：CSS 源码、编译 CSS、全部图片及图标。
- \`页面清单.csv\`：每个页面的分类、语言、路由和 HTML 文件名。
- \`静态导出检查报告.md\`：本次导出的资源完整性检查。

## 本地启动源码

1. 安装 Node.js 20+ 与 pnpm。
2. 将 \`04-CSS与图片资源/03-图片\` 放入源码项目的 \`public/images\`，将 \`04-图标\` 放入 \`public/icons\`；再把 \`05-public其他文件\` 内的内容复制到 \`public/\`。
3. 在 \`02-完整源码\` 目录执行 \`pnpm install\`。
4. 执行 \`pnpm dev\`，访问 \`http://localhost:3000/zh-tw/\`。

## 重新导出

- 静态构建：\`sh scripts/build-pages.sh\`
- 服务商交付包：\`node scripts/export-service-package.mjs\`

## 后台接入建议

- 产品资料：\`app/content/products.ts\`
- 实验室资料：\`app/content/laboratory.ts\`
- 文章资料：\`app/content/blog-data.ts\`
- 全站样式：\`app/globals.css\`
- 产品样式：\`app/product.css\`
- 实验室样式：\`app/laboratory.css\`
- 4065 参考详情页：\`public/ius-4065-reference.html\` 与 \`public/ius-4065-reference.css\`

服务商完成 CMS 接入后，建议先发布到测试链接验收，再替换正式公开链接。
`;
await writeFile(path.join(destination, "README-交付说明.md"), readme);

console.log(destination);
console.log(JSON.stringify({ html: htmlFiles.length, missingReferences: missingReferences.length }));
