import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.GITHUB_PAGES === 'true'
  ? {
      output: 'export', trailingSlash: true, basePath: '/leadfair-materials', images: { unoptimized: true },
      webpack(config) {
        config.module.rules.unshift({ test: /\.tsx?$/, include: `${process.cwd()}/app`, enforce: 'pre', use: `${process.cwd()}/scripts/pages-paths.cjs` });
        return config;
      },
    }
  : {};

export default nextConfig;
