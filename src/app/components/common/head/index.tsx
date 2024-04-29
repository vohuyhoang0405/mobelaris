import { localsMap } from "@lib/constants"
import { repalceImage } from "@lib/image/loader"
import { useStore } from "app/[locale]/context/store-context"
import { upperCase } from "lodash"
import { computeAmount } from "medusa-react"
import NextHead from "next/head"
import { usePathname } from "next/navigation"
import Script from "next/script"
import React from "react"
import { Product, Variant } from "types/medusa"
import defaultcontent from "../../../../../content/store/mobelaris.json"

const HOST = process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL
const defaultSeo = defaultcontent.blocks.find(
  (item) => item._template === "seo"
)
const defaultIcon = defaultcontent.blocks.find(
  (item) => item._template === "icon"
)

type HeadProps = {
  title?: string
  description?: string | null
  image?: string | null
  children?: any
}

const Head: React.FC<HeadProps> = ({
  title = defaultSeo?.title,
  description = defaultSeo?.description,
  image,
  children,
}) => {
  let finalTitle = `${title} | Designer Editions`
  const pathname = usePathname()
  const alternateUrls = localsMap?.map(
    ({ countryCode, langCode, locale }, i) => {
      if (locale === "en") {
        return (
          <link
            key={i}
            rel="alternate"
            hrefLang="x-default"
            href={HOST + pathname}
          />
        )
      }
      return (
        <link
          key={i}
          rel="alternate"
          hrefLang={
            countryCode ? `${langCode}-${countryCode.toUpperCase()}` : langCode
          }
          href={HOST + "/" + locale + pathname}
        />
      )
    }
  )

  return (
    <NextHead>
      <title>{finalTitle}</title>
      <meta itemProp="name" content={title} />
      {description && <meta itemProp="description" content={description} />}
      {description && <meta name="description" content={description} />}
      {image && <meta itemProp="image" content={repalceImage(image)} />}
      <link rel="icon" href={defaultIcon} />
      {children}
      {alternateUrls}
    </NextHead>
  )
}

export const ProductHead: React.FC<{ product: Product }> = ({ product }) => {
  const { region } = useStore()
  const url = HOST + `/product/${product.handle}`
  const imageUrl =
    product.images?.[0]?.url || product.variants[0].metadata.images[0]
  const title = `${product.title}`
  const description = (product.metadata.description_1 || "")
    .replace(/<[^>]*>?/gm, "")
    .trim()
  const { maximumFractionDigits, minimumFractionDigits } =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: region.currency_code,
    }).resolvedOptions()
  const amount = new Intl.NumberFormat("en-US", {
    currency: region.currency_code,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(
    computeAmount({
      amount: product.price.original_price,
      region: region,
      includeTaxes: false,
    })
  )
  const currencyCode = upperCase(region.currency_code)
  const ogImages = product.images.map((item, i) => {
    return <meta key={i} property="og:image" content={repalceImage(item.url)} />
  })

  return (
    <Head title={title} description={description} image={imageUrl}>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />
      <meta property="og:site_name" content="Designer Editions" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="product" />
      <meta property="og:description" content={description} />
      <meta property="og:price:amount" content={amount} />
      <meta property="og:price:currency" content={currencyCode} />
      {ogImages}
      <Script
        defer
        strategy="worker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            id: product.metadata.sku,
            url: url,
            image: imageUrl,
            name: title,
            brand: "Designer Editions",
            description: description,
            sku: product.metadata.sku,
            offers: {
              "@type": "Offer",
              price: amount,
              priceCurrency: currencyCode,
              availability: "http://schema.org/InStock",
              priceValidUntil: "2030-01-01",
              url: url,
            },
          }),
        }}
      ></Script>
    </Head>
  )
}

export const ProductVariantHead: React.FC<{
  product: Product
  variant: Variant
}> = ({ product, variant }) => {
  const { region } = useStore()
  const url = HOST + `/product/${product.handle}/${variant.id}`
  const imageUrl =
    variant.images?.[0]?.src || variant.variants?.[0].metadata.images[0]
  const title = `${product.title} - ${variant.title}`
  const description = (product.metadata.description_1 || "")
    .replace(/<[^>]*>?/gm, "")
    .trim()
  const { maximumFractionDigits, minimumFractionDigits } =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: region.currency_code,
    }).resolvedOptions()
  const amount = new Intl.NumberFormat("en-US", {
    currency: region.currency_code,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(
    computeAmount({
      amount: variant.original_price,
      region: region,
      includeTaxes: false,
    })
  )
  const currencyCode = upperCase(region.currency_code)
  const ogImages = variant.images.map((item, i) => {
    return <meta key={i} property="og:image" content={repalceImage(item.src)} />
  })

  return (
    <Head url={url} title={title} description={description} image={imageUrl}>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />
      <meta property="og:site_name" content="Designer Editions" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="product" />
      <meta property="og:description" content={description} />
      <meta property="og:price:amount" content={amount} />
      <meta property="og:price:currency" content={currencyCode} />
      {ogImages}
      <Script
        defer
        strategy="worker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            id: variant.sku,
            url: url,
            image: imageUrl,
            name: title,
            brand: "Designer Editions",
            description: description,
            sku: variant.sku,
            offers: {
              "@type": "Offer",
              price: amount,
              priceCurrency: currencyCode,
              availability: "http://schema.org/InStock",
              priceValidUntil: "2030-01-01",
              url: url,
            },
          }),
        }}
      />
    </Head>
  )
}

export default Head
