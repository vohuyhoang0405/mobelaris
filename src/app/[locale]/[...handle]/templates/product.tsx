import { LangCodeType } from "@lib/TranslateAndSaveType"
import { medusaServerClient } from "@lib/config.server"
import { SITE_URL } from "@lib/constants"
import { translateAndSave } from "@lib/translation"
import { createAlternates } from "@shop/store.config"
import InstagramProductPage from "app/[locale]/instagram/components/InstagramProductPage"
import { GTagEventEnterPage } from "app/components/googleTag"
import { getServerContext } from "app/helper"
import { transformProductWithRegion } from "app/helper/product"
import { truncate } from "lodash-es"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import Script from "next/script"
import { Suspense } from "react"
import { Product as Productschema, WithContext } from "schema-dts"
import { LocaleType } from "types/global"
import { Product, Region } from "types/medusa"

const ProductPageTemplate = dynamic(
  () => import("../../products/[...handle]/components")
)

export const fetchProduct = async (handle: string, region: Region) => {
  let product = await medusaServerClient.products
    .list({
      handle,
      region_id: region.id,
      currency_code: region.currency_code,
    })
    .then(({ products }) => {
      return transformProductWithRegion(products[0], region)
    })
    .catch((err) => {
      // console.error("error found when building " + handle + " product page")
      return null
    })
  return product
}
export const getTranslatedProduct = async (
  handle: string,
  region: Region,
  langCode: LangCodeType
) => {
  const product = await fetchProduct(handle, region)
  if (!product) {
    return null
  }
  if (langCode === "en") {
    return product
  }

  let translations = await translateAndSave({
    langCode,
    resources: [
      {
        key: product.title,
        value: product.title,
      },
      {
        key: product.description || "",
        value: product.description || "",
      },
      {
        key: `metadata.description`,
        value: product.metadata.description,
      },
      {
        key: `metadata.description_1`,
        value: product.metadata.description_1,
      },
      {
        key: `metadata.description_2`,
        value: product.metadata.description_2,
      },
      {
        key: `metadata.product_information`,
        value: product.metadata.product_information,
      },
      {
        key: `metadata.inspiredOfInformation`,
        value: product.metadata?.inspiredOfInformation || "",
      },
      ...(function getVariantsResources(product: Product) {
        return product.variants
          .flatMap((variant) => {
            return [
              {
                key: `variant.${variant.id}.metadata.leadtime`,
                value: variant.metadata.leadtime as string,
              },
            ]
          })
          .filter((item) => item.value)
      })(product),
    ],
  })
  return {
    ...product,
    inspiredOf: String(product.metadata.inspiredOf),
    inspiredOfInformation: String(translations?.[6]?.value),
    title: translations.resources?.[0]?.value || product.title,
    description: translations.resources?.[1]?.value || product.description,
    metadata: {
      ...product.metadata,
      description:
        translations.resources?.[2]?.value || product.metadata.description,
      description_1:
        translations.resources?.[3]?.value || product.metadata.description_1,
      description_2:
        translations.resources?.[4]?.value || product.metadata.description_2,
      product_information:
        translations.resources?.[5]?.value ||
        product.metadata.product_information,
    },
    en: {
      title: product.title,
      description: product.description,
    },
    translations: translations.resources,
  }
}
export const getStaticProps = async ({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}) => {
  const [locale, producthandle, variantId] = exacPageParams({ params })
  const { langCode, region } = await getServerContext(params.locale)
  const product = await getTranslatedProduct(producthandle, region, langCode)
  const variant =
    product?.variants.find(
      (v) => v.id === variantId || v.metadata.handle === producthandle
    ) || product?.variants[0]
  if (!product) return null
  const url = [producthandle, variantId].join("/")
  let title = (product.title + " " + (variant?.title || "")).trim()
  let thumbnail = (variant?.images?.[0]?.src || product.thumbnail)
    ?.replace("/image/upload/", "/image/upload/w_400/")
    .replaceAll("e_trim", "")
  let productUrl = SITE_URL + "/" + locale + "/" + url
  const description = truncate(product.description || "", {
    length: 160,
    separator: " ",
  })
  let images = thumbnail
    ? [
        {
          url: thumbnail,
          width: 742,
          height: 328,
          alt: title,
        },
      ].filter(Boolean)
    : []
  let meta: Metadata = {
    title: title,
    description: description,
    twitter: {
      title: title,
      description: description,
      images,
    },
    openGraph: {
      title: title,
      description: description,
      url: productUrl,
      images,
    },

    alternates: createAlternates({
      currentLocale: params.locale,
      pathname: "/" + producthandle,
    }),
  }
  const jsonLd: WithContext<Productschema> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: String(product.thumbnail),
    description: String(product.description),
    id: `${productUrl}/#/schema/Product`,
    url: meta.openGraph?.url,
    brand: "Mobelaris",
    sku: product.metadata.sku,
    offers: {
      "@type": "Offer",
      price: product.price_formated.calculated_price,
      priceCurrency: region.currency_code,
      availability: "http://schema.org/InStock",
      priceValidUntil: "2030-01-01",
      url: productUrl,
    },
  }
  return {
    product,
    variant,
    meta,
    jsonLd,
  }
}

const ProductTemplate = async ({
  product,
  variantId,
  meta,
  jsonLd,
}: {
  product: Product
  variantId?: string
  meta: Metadata
  jsonLd?: any
}) => {
  return (
    <>
      {jsonLd && (
        <Script
          defer
          strategy="worker"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductPageTemplate {...{ product, variantId }}>
        <Suspense>
          <InstagramProductPage id={product.id} />
        </Suspense>
      </ProductPageTemplate>
      <GTagEventEnterPage type="pdp" />
    </>
  )
}

export const exacPageParams = ({
  params: { locale, handle },
}: {
  params: { locale: LocaleType; handle: string[] }
}) => {
  return [locale, ...handle]
}
const templatePage = {
  Component: ProductTemplate,
  getStaticProps: getStaticProps,
  getStaticPaths: async () => {
    return []
  },
}
export default templatePage
