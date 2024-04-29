import { config } from "@shop/index"
import Html from "app/components/Html"
import { GTagEventEnterPage } from "app/components/googleTag"
import { Metadata } from "next"
import Provider from "../../[locale]/context/provider"
import { SourcesProvider } from "../../[locale]/context/sources"
import { getServerContext } from "../../helper"

export async function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }))
}
export default async function Root({
  children,
  params,
}: {
  children: JSX.Element
  params: {
    locale: string
  }
}) {
  const context = await getServerContext(params.locale)
  return (
    <Provider
      {...{
        locale: context.locale,
        langCode: context.langCode,
        region: context.region,
        pageProps: {},
      }}
    >
      <SourcesProvider name="root" value={{}}>
        {/* @ts-expect-error Server Component */}
        <Html lang={context.langCode} locale={context.locale} context={context}>
          {children}
          <GTagEventEnterPage type="thank_you" />
        </Html>
      </SourcesProvider>
    </Provider>
  )
}
export const metadata: Metadata = {
  title: "Order Confirmation - Mobelaris",
  description:
    "Thank you for your order! Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title:
      "Order Confirmation - Designer Classic Handmade Furniture & Lighting | Mobelaris",
    description:
      "Thank you for your order! Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
    images: [
      {
        url: "https://www.mobelaris.com",
        width: 1200,
        height: 630,
        alt: "Mobelaris",
      },
    ],
    type: "website",
    url: "https://www.mobelaris.com/en/order-confirmation",
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
