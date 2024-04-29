"use client"

import { useStore } from "app/[locale]/context/store-context"
import { usePathname } from "next/navigation"
import { Suspense, useEffect } from "react"
import { Product, Variant } from "types/medusa"
import {
  GTMEvent,
  getEventId,
  pushGTMEvent,
  transformVariantToGTMItem,
} from "."

const GTMVViewItemEvent = ({
  product,
  variant,
}: {
  product: Product
  variant: Variant
}) => {
  const pathName = usePathname()
  const { region } = useStore()
  useEffect(() => {
    const event_id = getEventId()
    let itemListId = ""
    const data: GTMEvent = {
      event: "view_item",
      event_id: event_id,
      ecommerce: {
        item_list_id: itemListId,
        value: variant.price_formated.calculated_price,
        currency: region.currency_code.toUpperCase(),
        items: [
          transformVariantToGTMItem({
            product,
            variant,
            item_list_id: itemListId,
            region,
          }),
        ],
      },
    }
    pushGTMEvent({ event: data })
  }, [product, variant, region])

  return null
}

export default ({
  product,
  variant,
}: {
  product: Product
  variant: Variant
}) => {
  return (
    <Suspense fallback={null}>
      <GTMVViewItemEvent product={product} variant={variant} />
    </Suspense>
  )
}
