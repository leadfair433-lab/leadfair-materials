import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
function visit(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) visit(path);
    else if (path.endsWith('.css')) writeFileSync(path, readFileSync(path, 'utf8').replace(/url\((["']?)\/images\//g, 'url($1/leadfair-materials/images/'));
  }
}
visit('out');
