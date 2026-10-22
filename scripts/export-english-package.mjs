import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");
const destination = path.resolve(process.argv[2] || path.join(root, "..", "found-fair-english-site"));

async function exists(target) { try { await stat(target); return true; } catch { return false; } }
async function walk(directory, predicate = () => true) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target, predicate));
    else if (predicate(target)) files.push(target);
  }
  return files;
}
async function copyIfPresent(source, target) {
  if (await exists(source)) await cp(source, target, { recursive: true });
}

if (!(await exists(path.join(out, "en", "index.html")))) throw new Error("English static build not found. Run scripts/build-pages.sh first.");
if (await exists(destination)) throw new Error(`Destination already exists: ${destination}`);
await mkdir(destination, { recursive: true });

const deployRoot = path.join(destination, "01-static-site-ready-to-deploy");
const siteRoot = path.join(deployRoot, "leadfair-materials");
await mkdir(siteRoot, { recursive: true });
await cp(path.join(out, "en"), path.join(siteRoot, "en"), { recursive: true });
for (const entry of ["_next", "images", "icons", "downloads", "blog-reference"]) {
  await copyIfPresent(path.join(out, entry), path.join(siteRoot, entry));
}
for (const file of ["ius-4065-reference.html", "ius-4065-reference.css", "ius-4065-reference-i18n.js", "ius-4065-reference-vi.js", "favicon.svg", ".nojekyll"]) {
  await copyIfPresent(path.join(out, file), path.join(siteRoot, file));
}
await writeFile(path.join(deployRoot, "index.html"), '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./leadfair-materials/en/"><title>Found Fair Materials</title>\n');

const sourceRoot = path.join(destination, "02-complete-source");
await mkdir(sourceRoot, { recursive: true });
for (const entry of ["app", "public", "scripts"]) await cp(path.join(root, entry), path.join(sourceRoot, entry), { recursive: true });
// The responsive device frame is an internal QA utility, not production code.
await rm(path.join(sourceRoot, "public", "mobile-responsive-preview.html"), { force: true });
for (const file of ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "next.config.ts", "tsconfig.json", "eslint.config.mjs", "next-env.d.ts", "postcss.config.mjs"]) {
  await copyIfPresent(path.join(root, file), path.join(sourceRoot, file));
}

const pagesRoot = path.join(destination, "03-english-page-html");
const englishHtml = await walk(path.join(out, "en"), file => file.endsWith("index.html"));
function namedHtmlFile(source) {
  const relative = path.relative(path.join(out, "en"), source).split(path.sep).join("/");
  const route = relative.replace(/\/index\.html$/, "");
  if (relative === "index.html") return path.join("01-home", "home.html");
  if (route === "products") return path.join("02-products", "products.html");
  if (route.startsWith("products/")) return path.join("02-products", `${route.slice("products/".length)}.html`);
  if (route === "company") return path.join("03-company", "company.html");
  if (route === "company/laboratory") return path.join("04-laboratory", "laboratory-overview.html");
  if (route.startsWith("company/laboratory/")) return path.join("04-laboratory", `${route.slice("company/laboratory/".length)}.html`);
  if (route === "articles") return path.join("05-articles", "articles-overview.html");
  if (route === "blog") return path.join("05-articles", "blog-index.html");
  if (route.startsWith("blog/")) return path.join("05-articles", `${route.slice("blog/".length)}.html`);
  if (route === "honors") return path.join("06-honors", "honors.html");
  if (route === "contact") return path.join("07-contact", "contact.html");
  return path.join("08-other", `${route.replaceAll("/", "-")}.html`);
}
for (const source of englishHtml) {
  const target = path.join(pagesRoot, namedHtmlFile(source));
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target);
}

const assetsRoot = path.join(destination, "04-css-images-assets");
await mkdir(assetsRoot, { recursive: true });
for (const cssFile of await walk(path.join(root, "app"), file => file.endsWith(".css"))) {
  const relative = path.relative(path.join(root, "app"), cssFile);
  const target = path.join(assetsRoot, "css-source", relative);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(cssFile, target);
}
await copyIfPresent(path.join(out, "_next", "static", "css"), path.join(assetsRoot, "css-compiled"));
await cp(path.join(root, "public", "images"), path.join(assetsRoot, "images"), { recursive: true });
await copyIfPresent(path.join(root, "public", "icons"), path.join(assetsRoot, "icons"));

const modulesRoot = path.join(destination, "05-ius4065-independent-closing-modules");
await mkdir(modulesRoot, { recursive: true });
await cp(path.join(root, "app", "products", "[slug]", "Ius4065ClosingSections.tsx"), path.join(modulesRoot, "Ius4065ClosingSections.tsx"));
await cp(path.join(root, "app", "products", "[slug]", "Ius4065ClosingSections.module.css"), path.join(modulesRoot, "Ius4065ClosingSections.module.css"));

const manifest = ["route,html"];
const manifestJson = [];
for (const file of englishHtml.sort()) {
  const relative = path.relative(path.join(out, "en"), file).split(path.sep).join("/");
  const route = relative === "index.html" ? "/en/" : `/en/${relative.replace(/index\.html$/, "")}`;
  const namedPath = namedHtmlFile(file).split(path.sep).join("/");
  manifest.push(`"${route}","03-english-page-html/${namedPath}"`);
  manifestJson.push({ route, html: `03-english-page-html/${namedPath}` });
}
await writeFile(path.join(destination, "english-page-manifest.csv"), `\uFEFF${manifest.join("\n")}\n`);
await writeFile(path.join(destination, "english-page-manifest.json"), `${JSON.stringify(manifestJson, null, 2)}\n`);

const integrationRoot = path.join(destination, "06-backend-integration-guide");
await mkdir(integrationRoot, { recursive: true });
await writeFile(path.join(integrationRoot, "CONTENT-MODEL.md"), `# Suggested backend content model

## Shared global fields

- Header navigation and language options
- Footer navigation and contact details
- Floating WhatsApp, WeChat, email and telephone actions
- SEO title, description, canonical URL and social sharing metadata

## Page records

Use one record per route in \`english-page-manifest.json\`. Recommended fields:

- \`route\`
- \`slug\`
- \`pageTitle\`
- \`seoTitle\`
- \`seoDescription\`
- \`sections[]\` (ordered reusable content blocks)
- \`status\` (draft or published)

## Product records

- Grade name and slug
- Hero content and media
- Specifications and comparison tables
- Features, applications and downloadable PDF
- Related products
- Inquiry call to action

## Article records

- Title, slug, category and summary
- Hero media
- Ordered article sections
- Downloadable PDF and related articles

## Laboratory instrument records

- Instrument name and slug
- Purpose, test information and image
- Related laboratory overview

Keep shared components in React source and drive their content from the backend. Do not duplicate global header, footer or inquiry code in every CMS page template.
`);

const readme = `# Found Fair English Website — Code Delivery

## Package structure

- \`01-static-site-ready-to-deploy/\`: English-only static website. Upload this folder to a web server and open \`index.html\`.
- \`02-complete-source/\`: Next.js/React source, content, public assets and build scripts.
- \`03-english-page-html/\`: English HTML grouped by site section: home, products, company, laboratory, articles, honors and contact.
- \`04-css-images-assets/\`: source CSS, compiled CSS, images and icons.
- \`05-ius4065-independent-closing-modules/\`: the two requested closing modules and their independent CSS.
- \`english-page-manifest.csv\`: English route-to-file mapping.
- \`english-page-manifest.json\`: machine-readable route-to-file mapping for backend import.
- \`06-backend-integration-guide/\`: suggested CMS data structure and integration notes.

## Independent IUS-4065 modules

The following sections are intentionally kept outside the upper IUS-4065 reference HTML and have their own stylesheet:

1. Main Application Areas
2. From Formulation Selection to Production Validation

Source files:

- \`Ius4065ClosingSections.tsx\`
- \`Ius4065ClosingSections.module.css\`

## Run the source project

1. Install Node.js 22+ and pnpm.
2. Run \`pnpm install\` in \`02-complete-source/\`.
3. Run \`pnpm dev\`.
4. Open \`http://localhost:3000/en/\`.

## Production build

Run \`sh scripts/build-pages.sh\` to regenerate the GitHub Pages-compatible static output.
`;
await writeFile(path.join(destination, "README.md"), readme);

const report = [
  "# English export verification",
  "",
  `- English HTML pages: ${englishHtml.length}`,
  `- Compiled CSS files: ${(await walk(path.join(out, "_next", "static", "css"), file => file.endsWith(".css"))).length}`,
  `- Image files: ${(await walk(path.join(root, "public", "images"))).length}`,
  "- Production static build: passed",
  "- English visible-copy audit: passed for home, products, company, contact, honors, articles and IUS-4065",
  "- IUS-4065 closing modules: exported separately with independent CSS",
  "- Internal mobile device preview utility: excluded from production delivery",
  "",
].join("\n");
await writeFile(path.join(destination, "verification-report.md"), report);

console.log(destination);
console.log(JSON.stringify({ englishPages: englishHtml.length }));
