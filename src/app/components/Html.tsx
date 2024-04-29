import { ServerContextType } from "app/helper"
import clsx from "clsx"
import Script from "next/script"
import { PropsWithChildren } from "react"
import allFonts from "styles/fonts"
import { LangType, LocaleType } from "types/global"
import GoogleAnalytics from "./GoogleAnalytics"
import HackPageSpeed from "./HackPageSpeed"
import KlaviyoTracking from "./klaviyo"

export default async function Html({
  locale,
  lang,
  children,
  context,
}: PropsWithChildren<{
  locale: LocaleType
  lang: LangType
  context: ServerContextType
}>) {
  return (
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
        {/* @ts-expect-error Server Component */}
        <HackPageSpeed>
          <GoogleAnalytics />
          <KlaviyoTracking />
          <Script
            defer
            strategy="worker"
            type="text/javascript"
            src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          ></Script>
        </HackPageSpeed>
        {children}
      </body>
    </html>
  )
}
