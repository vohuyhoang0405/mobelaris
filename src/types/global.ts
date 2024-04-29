import { Product } from "@medusajs/medusa"
import { localsMap } from "@shop/store.config"
import { Hit } from "meilisearch"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

export type CollectionData = {
  id: string
  title: string
}

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type StoreNavData = {
  collections: CollectionData[]
  hasMoreCollections: boolean
  featuredProducts: Product[]
}

// page props for store pages (products and collection pages)
export type StoreProps<T extends unknown> = {
  page: {
    data: T
  }
}

// page props for non-store pages (home, about, contact, etc)
export type SiteProps = {
  site: {
    navData: StoreNavData
  }
}

export type PrefetchedPageProps = {
  notFound: boolean
}

// For pages with nested layouts
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout<P = {}, IP = P> = AppProps<P> & {
  Component: NextPageWithLayout<P, IP>
}

export type ProductPreviewType = {
  id: string
  title: string
  handle: string | null
  thumbnail: string | null
  price?: {
    calculated_price: string
    original_price: string
    difference: string
    price_type: "default" | "sale"
  }
}

export type InfiniteProductPage = {
  response: {
    products: Product[]
    count: number
  }
}

export type LangType = (typeof localsMap)[number]["langCode"]
export type LocaleType = (typeof localsMap)[number]["locale"]
export type CountryType = (typeof localsMap)[number]["countryCode"]

export type HitItem = Hit<{
  select_guarantee: string
  guarantee: string
  calculated_price: number
  handle: string
  number_of_sale: number
  original_price: number
  tags_value: string[]
  thumbnail: string
  title: string
  variant_sku: string[]
}>
