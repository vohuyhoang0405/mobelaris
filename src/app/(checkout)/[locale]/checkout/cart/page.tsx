import GTMViewCartEvent from "@lib/gtm-events/view-cart"
import { translateAndSave } from "@lib/translation"
import { config } from "@shop/index"
import { SourcesProvider } from "app/[locale]/context/sources"
import CartTemplate from "app/[locale]/templates/cart"
import { GTagEventEnterPage } from "app/components/googleTag"
import { getServerContext } from "app/helper"
import { Metadata } from "next"
import { LocaleType } from "types/global"

let strings = {
  "5 Years warranty": "5 jaar garantie",
  "7 days a week support": "7 dagen per week ondersteuning",
  "CONTINUE SHOPPING": "VERDER WINKELEN",
  Checkout: "Kassa",
  "Delivered 10 - 12 weeks": "Geleverd 10 - 12 weken",
  Item: "Item",
  "Order Complete": "Bestel compleet",
  "PROCEED TO CHECKOUT": "GA DOOR NAAR DE KASSA",
  Price: "Prijs",
  QTY: "QTY",
  "Secure checkout": "Veilig afrekenen",
  "Shipping days/weeks": "Verzenddagen/weken",
  "Shopping cart": "Winkelwagen",
  "Special Edition/Soaped - Oak": "Speciale editie/gezeept - Eik",
  Subtotal: "Subtotaal",
  Total: "Totaal",
}

async function Cart({ params }: { params: { locale: LocaleType } }) {
  const context = await getServerContext(params.locale)

  const translatedText = await translateAndSave({
    resources: Object.keys(strings).map((key) => ({
      key,
      value: key,
    })),
    langCode: context.langCode,
  })

  return (
    <SourcesProvider
      name="Cart"
      value={translatedText.resources.reduce(
        (acc: { [key: string]: string }, cur) => {
          acc[cur.key] = cur.value
          return acc
        },
        {}
      )}
    >
      <CartTemplate />
      <GTagEventEnterPage type="cart" />
      <GTMViewCartEvent />
    </SourcesProvider>
  )
}

export async function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: "View and Manage Your Shopping Cart | Mobelaris",
  description:
    "Explore and organize your selected items with ease on Mobelaris. Discover designer classic handmade furniture & lighting, and enjoy our 7-day-a-week support, secure shopping, and special discounts.",
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
