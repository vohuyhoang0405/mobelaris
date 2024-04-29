import { config } from "@shop/index"
import KlaviyoTracking from "app/components/klaviyo"
import clsx from "clsx"
import { Metadata } from "next"
import Script from "next/script"
import allFonts from "styles/fonts"
import { LocaleType } from "types/global"
import Provider from "../../[locale]/context/provider"
import { SourcesProvider } from "../../[locale]/context/sources"
import { getServerContext } from "../../helper"

export const metadata: Metadata = {
  ...config.metadata,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title:
      "Designer Classic Handmade Furniture & Lighting | Mobelaris - Checkout Cart",
    description:
      "Shop our designer classic handmade furniture & lighting at Mobelaris.",
    images: [
      {
        url: "https://www.mobelaris.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9bf74d41.png&w=640&q=75",
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
    title: "Mobelaris - Designer Classic Handmade Furniture & Lighting",
    description:
      "Mobelaris is passionate about contemporary design: furniture, art, tapestries, and accessories for your office or home. Explore our checkout cart for easy shopping.",
  },
}

export default async function Root({
  children,
  params,
}: {
  children: JSX.Element
  params: {
    locale: LocaleType
  }
}) {
  const context = await getServerContext(params.locale)
  const { locale, lang } = context
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
        <html
          lang={lang || locale}
          data-local={locale}
          data-reg={context.region.name}
          data-currency={context.region.currency_code}
        >
          <head>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
          </head>
          <body
            className={clsx(
              "flex min-h-screen flex-col",
              Object.values(allFonts).map((i) => i.variable),
              "font-body"
            )}
          >
            <KlaviyoTracking />
            <Script
              strategy="worker"
              defer
              src="https://www.googletagmanager.com/gtag/js?id=G-F1YFT0SB35"
            ></Script>
            <Script
              defer
              strategy="worker"
              type="text/javascript"
              src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
            ></Script>
            <Script
              id="gtag"
              strategy="worker"
              defer
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F1YFT0SB35');`,
              }}
            ></Script>
            <Script
              id="gtm.start"
              defer
              strategy="worker"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M5KJQ2K');`,
              }}
            ></Script>

            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-M5KJQ2K"
                height={0}
                width={0}
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
            {children}
          </body>
        </html>
      </SourcesProvider>
    </Provider>
  )
}
