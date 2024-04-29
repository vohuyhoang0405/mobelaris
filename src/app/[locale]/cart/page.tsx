import { redirect } from "next/navigation"
import { getServerContext } from "../../helper"
import { BasePageType } from "../types"

async function Cart({ params }: BasePageType) {
  const context = await getServerContext(params.locale)
  return redirect("/" + context.locale + "/checkout/cart")
}
export const metadata = {
  title: "Cart",
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
export default Cart
