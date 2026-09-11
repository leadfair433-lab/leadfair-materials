import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const backup = path.join(root, '交接备份', '2026-09-04');
const source = path.join(backup, '01-网站源码');
if (fs.existsSync(source)) throw new Error('Backup already exists; refusing to overwrite.');
fs.mkdirSync(source, { recursive: true });
const items = ['app', 'public', 'scripts', '.gitignore', '.openai/hosting.json', 'package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'next.config.ts', 'vite.config.ts', 'tsconfig.json', 'postcss.config.mjs', 'eslint.config.mjs'];
for (const item of items) {
  const dest = path.join(source, item);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(path.join(root, item), dest, { recursive: true, errorOnExist: true, force: false });
}
fs.cpSync(path.join(root, 'out'), path.join(backup, '02-已生成静态网站'), { recursive: true, errorOnExist: true, force: false });
const assets = path.join(backup, '03-设计参考与原始素材');
fs.mkdirSync(assets);
for (const name of ['IUS-4065-product-photo.jpg', 'IUS-4065-product-visual.png', '原料网站-完整页面长图.jpg', '原料网站-完整页面长图.png']) {
  fs.copyFileSync(path.join(root, name), path.join(assets, name), fs.constants.COPYFILE_EXCL);
}
const list = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f);
    else {
      const data = fs.readFileSync(f);
      list.push({ file: path.relative(backup, f), bytes: data.length, sha256: crypto.createHash('sha256').update(data).digest('hex') });
    }
  }
}
walk(backup);
fs.writeFileSync(path.join(backup, '文件校验清单.json'), JSON.stringify({ createdAt: new Date().toISOString(), files: list }, null, 2));
for (const f of list) {
  const actual = crypto.createHash('sha256').update(fs.readFileSync(path.join(backup, f.file))).digest('hex');
  if (actual !== f.sha256) throw new Error(`Checksum failed: ${f.file}`);
}
console.log(JSON.stringify({ backup, files: list.length, bytes: list.reduce((n, f) => n + f.bytes, 0), verified: true }));
