import { config } from "@shop/index"
import Delay from "app/components/Delay"
import ErrorBoundary from "app/components/ErrorBoundary"
import Html from "app/components/Html"
import { Viewport } from "next"
import { Revalidate } from "next/dist/server/lib/revalidate"
import dynamicNext from "next/dynamic"
import { Suspense } from "react"
import client from "../../../tina/__generated__/client"
import Layout from "../components/Layout"
import { getServerContext } from "../helper"
import Provider from "./context/provider"
import { SourcesProvider } from "./context/sources"
import { BasePageType } from "./types"
const NewLetter = dynamicNext(() => import("app/components/NewLetter"), {
  loading: () => null,
  ssr: false,
})
const Cookies = dynamicNext(() => import("app/components/Cookies"), {
  loading: () => null,
  ssr: false,
})

export default async function Root({
  children,
  params,
  adminbar,
}: {
  children: React.ReactNode
  adminbar: React.ReactNode
} & BasePageType) {
  const context = await getServerContext(params.locale)
  const countdown = (
    await client.queries.homepage({
      relativePath: `/${context.langCode}.json`,
    })
  )?.data?.homepage?.blocks?.[0]?.datetime
  const trustpilot = (await import("@content/others/trustpilot.json")).default
  let date = new Date().toISOString()
  return (
    <ErrorBoundary>
      <Provider
        {...{
          locale: context.locale,
          langCode: context.langCode,
          region: context.region,
          pageProps: { countdown },
        }}
      >
        <SourcesProvider
          name="root"
          value={{
            "trustpilot.reviews_number":
              trustpilot.field.find((i) => i.name === "reviews_number")
                ?.value || "972",
            ...context.translations,
            updateAt: date,
          }}
        >
          <Html
            locale={params.locale}
            lang={context.langCode}
            context={context}
          >
            <Layout context={context}>{children}</Layout>
            <ErrorBoundary>
              <Suspense>
                <Delay>
                  <>
                    <NewLetter />
                    <Cookies />
                  </>
                </Delay>
              </Suspense>
            </ErrorBoundary>
          </Html>
        </SourcesProvider>
      </Provider>
    </ErrorBoundary>
  )
}
export async function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }))
}

export const dynamic = "force-static"
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export const revalidate: Revalidate = false
// false | 'force-cache' | 0 | number

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
