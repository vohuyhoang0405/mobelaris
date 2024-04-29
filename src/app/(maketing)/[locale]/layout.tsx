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
export const metadata: Metadata = config.metadata
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
          <GTagEventEnterPage type="undefined" />
        </Html>
      </SourcesProvider>
    </Provider>
  )
}
