"use client"

import { Cart } from "@medusajs/medusa"
import { useStore } from "app/[locale]/context/store-context"
import { computeAmount } from "app/helper/price"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { Product, Variant } from "types/medusa"
import {
  GTMEvent,
  getEventId,
  pushGTMEvent,
  transformCartItemToGTMItem,
  transformVariantToGTMItem,
} from "."

const GTMRemoveFromCartEvent = ({
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
      event: "remove_from_cart",
      event_id: event_id,
      ecommerce: {
        item_list_id: itemListId,
        value: variant.price_formated.original_price,
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
export const trigleRemoveFromCartEvent = ({
  cart,
  variantId,
  quantity,
  itemListId,
}: {
  cart: Cart
  quantity: number
  variantId: string
  itemListId?: string
}) => {
  const event_id = getEventId()
  let item = cart.items.find((item) => item.variant_id === variantId)
  let value = computeAmount({
    amount: item ? item.unit_price * quantity : 0,
    region: cart.region,
    includeTaxes: false,
  })
  let region = cart.region
  let listId = ""
  const data: GTMEvent = {
    event: "remove_from_cart",
    event_id: event_id,
    ecommerce: {
      item_list_id: listId,
      value: value,
      quantity,
      currency: region.currency_code.toUpperCase(),
      items: [
        transformCartItemToGTMItem({
          item,
          cart,
          listId,
          quantity,
        }),
      ],
    },
  }
  pushGTMEvent({ event: data })
}

export default GTMRemoveFromCartEvent
