import CustomPageTina from "@lib/tina/CustomPageTina"
import { config } from "@shop/index"
import { getServerContext } from "app/helper"
import { LocaleType } from "types/global"
async function Page({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}) {
  const context = await getServerContext(params.locale)
  const [content, collection, lang, filename] = params.handle
  return (
    <>
      <CustomPageTina relativePath={"/" + lang + "/" + filename} />
    </>
  )
}
export const metadata = {
  title: "Preview",
  description:
    "Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
  openGraph: {
    title: "Designer Classic Handmade Furniture & Lighting | Mobelaris",
    description:
      "Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
    images: [
      {
        url: "https://www.mobelaris.com",
        width: 1200,
        height: 630,
        alt: "Mobelaris",
      },
    ],
    type: "website",
    url: "https://www.mobelaris.com/en/checkout/cart",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mobelaris",
    creator: "@mobelaris",
    title: "Mobelaris",
    description:
      "We are passionate about contemporary design: furniture, art, tapestries, and accessories for your office or home",
    images: "https://twitter.com/mobelaris/photo",
  },
}
export async function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }))
}
export default Page
