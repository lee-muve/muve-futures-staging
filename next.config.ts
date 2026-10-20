import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Job applications include a CV (up to 4MB, see lib/careers/shared.ts).
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      // Images uploaded from the dashboard (Vercel Blob).
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Cover photos of the sample blog posts.
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      // The site has launched: the home page is at /. The pre-launch preview address goes there for good.
      { source: '/home', destination: '/', permanent: true },
      // The coming-soon page is switched off. To bring it back, replace this with
      // { source: '/', destination: '/coming-soon', permanent: false }.
      { source: '/coming-soon', destination: '/', permanent: false },
    ];
  },
};

export default nextConfig;
