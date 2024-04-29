"use client"
import { useStore } from "app/[locale]/context/store-context"
import React from "react"
import { Product } from "types/medusa"
import { klaviyoTrackingProduct } from "./util"

interface Props {
  product: Product
  variantid?: string
}

const KlaviyoTrackingProduct: React.FC<Props> = ({ product, variantid }) => {
  const { region } = useStore()
  React.useEffect(() => {
    if (!product) return
    const variant =
      product.variants.find((v) => v.id === variantid) || product.variants[0]
    klaviyoTrackingProduct(product, variant, region)
  }, [product, variantid, region])
  return null
}

export default KlaviyoTrackingProduct
