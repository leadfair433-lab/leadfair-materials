import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // `docs` and `out` are generated static-site deliverables. `public` also
  // contains a vendor-supplied standalone reference page, so none of these
  // folders should be treated as editable application source by ESLint.
  globalIgnores([
    '.next/**',
    '.vinext/**',
    '.wrangler/**',
    'out/**',
    'docs/**',
    'public/**',
    'build/**',
    '交接备份/**',
    '网站交接包_*/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      // This site intentionally uses normal anchors so the locale/base-path
      // rewriting script can produce portable static HTML for GitHub Pages
      // and for the service-provider handoff package.
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
]);

export default eslintConfig;
