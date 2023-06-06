const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['shared', 'ui', 'tailwind-config'],
  serverRuntimeConfig: {
    uniformProjectId: process.env.UNIFORM_PROJECT_ID,
    uniformApiKey: process.env.UNIFORM_API_KEY,
    uniformCliBaseUrl: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    uniformEdgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global',
    uniformPreviewSecret: process.env.UNIFORM_PREVIEW_SECRET || 'javadrip',
  },
  publicRuntimeConfig: {
    buildTimeStamp: new Date().valueOf(),
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
    appVersion: process.env.npm_package_version || '',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.contentstack.io' },
      { protocol: 'https', hostname: 'unresolved' }, // For cases where the data obtained are unresolved
    ],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This is added to make bundled enhancers work, otherwise you might get an error on startup.
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
