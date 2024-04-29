import { locales } from "@shop/store.config"

export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${locales
    .map((locale) => {
      return `<sitemap>
      <loc>https://www.mobelaris.com/${locale}/sitemap.xml</loc>
  </sitemap>`
    })
    .join("\n")}
  </sitemapindex>
  `,
    {
      headers: {
        "content-type": "application/xml;charset=UTF-8",
      },
    }
  )
}
