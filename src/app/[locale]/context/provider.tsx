"use client"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import { Region } from "@medusajs/medusa"
import { QueryClient } from "@tanstack/react-query"
import { CartProvider, MedusaProvider } from "medusa-react"
import { ReactNode } from "react"
import { LangType, LocaleType } from "types/global"
import { AccountProvider } from "./account-context"
import { OtherConsumer, OtherProvider } from "./other-context"
import { StoreProvider } from "./store-context"

// Font files can be colocated inside of `pages`
function Provider({
  children,
  pageProps,
  locale,
  region,
  langCode,
}: {
  children: ReactNode
  locale: LocaleType
  region: Region
  langCode: LangType
  pageProps: { dehydratedState?: unknown; countdown: string }
}) {
  return (
    <OtherProvider>
      <OtherConsumer>
        {({ ready }) => {
          return (
            <>
              <MedusaProvider
                baseUrl={MEDUSA_BACKEND_URL}
                queryClientProviderProps={{
                  client: new QueryClient({
                    defaultOptions: {
                      queries: {
                        staleTime: 1000 * 60 * 60 * 24,
                        retry: 1,
                        enabled: ready,
                      },
                    },
                  }),
                }}
              >
                <CartProvider>
                  <StoreProvider
                    locale={locale}
                    langCode={langCode}
                    region={region}
                    pageProps={pageProps}
                    ready={ready}
                  >
                    <AccountProvider>{children}</AccountProvider>
                  </StoreProvider>
                </CartProvider>
              </MedusaProvider>
            </>
          )
        }}
      </OtherConsumer>
    </OtherProvider>
  )
}

export default Provider
