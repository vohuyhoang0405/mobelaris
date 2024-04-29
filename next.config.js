module.exports = async () => {
  const isProd = process.env.NODE_ENV === "production"
  process.env__NEXT_PRIVATE_PREBUNDLED_REACT = "next"
  /** @type {import('next').NextConfig} */
  const config = {
    experimental: {
      ppr: true,
      nextScriptWorkers: true,
      swcMinify: false,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    assetPrefix: isProd ? process.env.NEXT_PUBLIC_ASSET_PREFIX_URL : undefined,
    images: {
      formats: ["image/avif", "image/webp"],
      domains: [
        "assets.tina.io",
        "imageproxy.designereditions.com",
        "blog.mobelaris.com",
        "shopify-app-instagram-feed.hieunguyen.dev",
        "shopify-app-instagram-feed.mobelaris.com",
      ],
      deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1921],
      imageSizes: [64, 128, 256, 384],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    async redirects() {
      return [
        {
          source: "/en-eu/:slug*",
          destination: "/eu/:slug*", // Redirect from /en-eu to /eu
          permanent: true,
        },
        {
          source: "/at/:slug*",
          destination: "/de-at/:slug*", // Redirect from /at to /de-at
          permanent: true,
        },
        {
          source: "/:locale/product-tags/:slug",
          destination: "/:locale/:slug", // Redirect from /:locale/product-tags/:slug to /:locale/:slug
          permanent: true,
        },
      ]
    },
    rewrites() {
      return [
        {
          source: "/admin",
          destination: "/_next_tina/index.html",
        },
        {
          source: "/:locale/admin",
          destination: "/_next_tina/index.html",
        },
        {
          source: "/:locale/_next_tina",
          destination: "/_next_tina/index.html",
        },
        {
          source: "/:locale/api/v1/trans",
          destination: "https://medusa.designereditions.com/api/trans",
        },
        {
          source: "/:locale/_next_api/v1/:path*",
          destination: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + "/:path*",
        },
        {
          source: "/_next_api/v1/:path*",
          destination: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + "/:path*",
        },
      ]
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  }

  console.log("next.config.js", JSON.stringify(config, null, 2))
  return config
}
