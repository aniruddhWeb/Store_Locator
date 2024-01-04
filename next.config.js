const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
})

const moduleExports = {
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    SESSION_DOMAIN: process.env.NEXT_PUBLIC_SESSION_DOMAIN,
    PUBLIC_WEBSITE: process.env.NEXT_PUBLIC_WEBSITE,
    LARAVEL_WEBSITE: process.env.NEXT_PUBLIC_LARAVEL_WEBSITE,
    IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    CAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY,
    SITEMAP_URL: process.env.NEXT_PUBLIC_SITEMAP_URL,
    DISABLE_IMAGES: process.env.NEXT_PUBLIC_DISABLE_IMAGES,
  },
  serverRuntimeConfig: {
    PUBLIC_WEBSITE: process.env.NEXT_PUBLIC_WEBSITE,
    CONTENTFUL_SPACE: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    CONTENTFUL_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN,
    SITEMAP_URL: process.env.NEXT_PUBLIC_SITEMAP_URL,
    SESSION_DOMAIN: process.env.NEXT_PUBLIC_SESSION_DOMAIN,
    DISABLE_IMAGES: process.env.NEXT_PUBLIC_DISABLE_IMAGES,
  },
  // build time
  env: {
    NEXT_PUBLIC_WEBSITE: process.env.NEXT_PUBLIC_WEBSITE,
    NEXT_PUBLIC_SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    NEXT_PUBLIC_SESSION_DOMAIN: process.env.NEXT_PUBLIC_SESSION_DOMAIN,
    NEXT_PUBLIC_LARAVEL_WEBSITE: process.env.NEXT_PUBLIC_LARAVEL_WEBSITE,
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    NEXT_PUBLIC_DISABLE_IMAGES: process.env.NEXT_PUBLIC_DISABLE_IMAGES,
    CONTENTFUL_SPACE: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    CONTENTFUL_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN,
    CAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY,
    SITEMAP_URL: process.env.NEXT_PUBLIC_SITEMAP_URL,
  },
  images: {
    minimumCacheTTL: 60,
    domains: ['dz8osaahf9pd7.cloudfront.net', 'images.ctfassets.net', 'web.dev.leafytest.com', 'web.stage.leafytest.com', 'web.prod.leafytest.com', 'leafythings.com'],
  },
  optimizeFonts: true,
  async rewrites() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SITEMAP_URL + 'sitemap.xml');
      const xmlText = await response.text();
      const matches = xmlText.match(/(sitemap-)\w+.xml/g);
      return (matches || []).map(item => ({
        source: `/${item}`,
        destination: '/sitemap.xml',
      }));
    } catch (e) {
      return [];
    }
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withBundleAnalyzer(moduleExports);
