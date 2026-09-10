import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.GITHUB_PAGES === 'true'
  ? {
      output: 'export', trailingSlash: true, basePath: '/leadfair-materials', images: { unoptimized: true },
      env: { NEXT_PUBLIC_BASE_PATH: '/leadfair-materials' },
      webpack(config) {
        config.module.rules.unshift({ test: /\.tsx?$/, include: `${process.cwd()}/app`, enforce: 'pre', use: `${process.cwd()}/scripts/pages-paths.cjs` });
        return config;
      },
    }
  : {};

export default nextConfig;
