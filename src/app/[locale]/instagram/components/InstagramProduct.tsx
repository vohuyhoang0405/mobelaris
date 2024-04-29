"use client"

import { medusaClient } from "@lib/config"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { useQuery } from "@tanstack/react-query"
import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import ProductCard from "app/components/ProductCard"
import { transformProduct } from "app/helper/product"
import { Product, Variant } from "types/medusa"

const InstagramProductCard = ({
  product,
  variant,
}: {
  product: Product
  variant?: Variant
}) => {
  const t = useT()
  if (variant) {
    const title = t(product.title + " " + variant.title)
    const saleDifference = getPercentageDiff(
      variant.original_price,
      variant.calculated_price
    )
    let url = variant.metadata.handle
      ? "/" + variant.metadata.handle
      : `/${product.handle}?variant=${variant.id}`
    return (
      <ProductCard
        {...{
          title: title,
          calculated_price: variant.calculated_price,
          original_price: variant.original_price,
          url,
          image1: variant.images[0]?.src || product.thumbnail,
          salepercent: saleDifference && saleDifference + "%",
        }}
      ></ProductCard>
    )
  }
  const title = t(product.title)
  const saleDifference = getPercentageDiff(
    product.price.original_price,
    product.price.calculated_price
  )
  return (
    <ProductCard
      {...{
        title: title,
        calculated_price: product.price.calculated_price,
        original_price: product.price.original_price,
        url: `/${product.handle}`,
        image1: product.thumbnail || product.images[0]?.url || undefined,
        salepercent: saleDifference && saleDifference + "%",
      }}
    ></ProductCard>
  )
}

function InstagramProduct({
  id,
  variant,
}: {
  id: string
  variant?: {
    id: string
  }
}) {
  const region = useStore()?.region
  const { data: product } = useQuery(
    ["product", id],
    async () => {
      const { products } = await medusaClient.products.list({
        limit: 99999,
        region_id: region?.id,
        currency_code: region?.currency_code,
        id: id,
      })
      return transformProduct(products[0])
    },
    {
      enabled: !!id,
    }
  )
  if (!product) {
    return <div className="bg-gray-100 pb-[100%]"></div>
  }
  const v = product.variants.find((v) => v.id === variant?.id)
  return (
    <InstagramProductCard
      {...{
        product,
        variant: v,
      }}
    ></InstagramProductCard>
  )
}

export default InstagramProduct
