import { medusaServerClient } from "@lib/config.server"
import { transformProduct } from "app/helper/product"
const SITE_URL = process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL || "localhost:8000"
let changefreq = "weekly"
type SitemapUrl = {
  locale: string
  slug: string
  title: string
  changefreq: string
  image: string
  updatedAt: string
}
const pageHandles = [
  {
    type: "page",
    handle: "refunds-and-returns",
  },
  {
    type: "page",
    handle: "contact-us",
  },
  {
    type: "page",
    handle: "about",
  },
  {
    type: "page",
    handle: "term-and-condition",
  },
  {
    type: "page",
    handle: "privacy-policy",
  },
  {
    type: "page",
    handle: "faq",
  },
  {
    type: "page",
    handle: "transparency-policy",
  },

  {
    type: "page",
    handle: "photocontest",
  },
  {
    type: "page",
    handle: "ethical-trading-policy",
  },
  {
    type: "page",
    handle: "sign-up-today",
  },
  {
    type: "page",
    handle: "30",
  },
  {
    type: "page",
    handle: "trade",
  },
  {
    type: "page",
    handle: "account",
  },
  {
    type: "page",
    handle: "ordertracking",
  },
  {
    type: "page",
    handle: "wishlist",
  },
  {
    type: "page",
    handle: "cart",
  },
  {
    type: "page",
    handle: "checkout",
  },
  {
    type: "page",
    handle: "promo-offer",
  },
  {
    type: "page",
    handle: "terms-conditions",
  },
  {
    type: "page",
    handle: "privacy-policy",
  },
]
const toSitemapUrl = ({
  locale,
  slug,
  title,
  changefreq,
  image,
  updatedAt,
}: SitemapUrl) => {
  return `<url>
  <loc>${SITE_URL}/${locale}/${slug}</loc>
  <lastmod>${updatedAt}</lastmod>
  <changefreq>${changefreq}</changefreq>
  <image:image>
    <image:loc>${image}.png</image:loc>
    <image:title>${title}</image:title>
  </image:image>
  </url>`
}
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { locale: string }
  }
) {
  let pages: SitemapUrl[] = []
  const products = await medusaServerClient.products
    .list({ limit: 9999 })
    .then(({ products }) => products.map((p) => transformProduct(p)))
  products.forEach((product, index) => {
    const { handle, id, thumbnail, variants } = product
    let image = thumbnail || variants?.[0]?.images[0]?.src
    if (!handle) {
      throw new Error("Product handle is missing, porduct id: " + id)
    }
    if (!image) {
      throw new Error("Product image is missing, porduct id: " + id)
    }
    pages.push({
      slug: handle,
      title: handle.replaceAll("-", " "),
      changefreq,
      image: image,
      locale: params.locale,
      updatedAt: product.updated_at + "",
    })
    variants.forEach(async (v) => {
      let { id: variantId, metadata, images } = v
      let slug = metadata?.handle
      if (slug) {
        pages.push({
          slug,
          title: slug.replaceAll("-", " "),
          changefreq,
          image:
            images[0]?.src ||
            thumbnail ||
            `${SITE_URL}/images/variant/${slug}.png`,
          locale: params.locale,
          updatedAt: v.updated_at + "",
        })
      }
    })
  })

  const { collections } = await medusaServerClient.collections.list({
    limit: 9999,
  })
  collections.forEach(({ handle, id, title, metadata, updated_at }) => {
    pages.push({
      slug: handle,
      title: handle.replaceAll("-", " "),
      changefreq,
      image: `${SITE_URL}/images/collection/${handle}.png`,
      locale: params.locale,
      updatedAt: updated_at + "",
    })
  })
  pageHandles.forEach(({ handle, type }) => {
    if (type === "page") {
      pages.push({
        slug: handle,
        title: handle.replaceAll("-", " "),
        changefreq,
        image: `${SITE_URL}/images/page/${handle}.png`,
        locale: params.locale,
        updatedAt: new Date().toISOString(),
      })
    }
  })
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
  <loc>${SITE_URL}/${params.locale}</loc>
  <changefreq>${changefreq}</changefreq>
  </url>
  ${pages
    .map((item) => {
      return toSitemapUrl(item)
    })
    .join("\n")}
  </urlset>
  `,
    {
      headers: {
        "content-type": "application/xml;charset=UTF-8",
      },
    }
  )
}
