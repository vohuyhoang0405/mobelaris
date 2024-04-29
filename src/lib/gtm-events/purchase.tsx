"use client"

import { Cart } from "@medusajs/medusa"
import { useStore } from "app/[locale]/context/store-context"
import { computeAmount } from "app/helper/price"
import { useEffect } from "react"
import {
  GTMEvent,
  getEventId,
  pushGTMEvent,
  transformCartItemToGTMItem,
} from "."
export const trigleGTMpurchaseEvent = ({ cart }: { cart: Cart }) => {
  if (!cart?.items?.length) return
  let region = cart?.region
  const event_id = getEventId()
  let itemListId = ""
  const data: GTMEvent = {
    event: "purchase",
    event_id: event_id,
    ecommerce: {
      item_list_id: itemListId,
      value: computeAmount({
        amount: cart.total || 0,
        region: region,
        includeTaxes: false,
      }),
      coupon: cart.discounts.map((discount) => discount.code).join(","),
      shipping: computeAmount({
        amount: cart.shipping_total || 0,
        region: region,
        includeTaxes: false,
      }),
      tax: computeAmount({
        amount: cart.tax_total || 0,
        region: region,
        includeTaxes: false,
      }),
      transaction_id: cart.id,
      affiliation: "Mobelaris Webshop",
      payment_type: cart?.payment_session?.provider_id,
      currency: region.currency_code.toUpperCase(),
      items: cart.items.map((item) =>
        transformCartItemToGTMItem({
          item,
          cart,
          listId: itemListId,
        })
      ),
    },
  }
  pushGTMEvent({ event: data })
}
const GTMpurchaseEvent = () => {
  const { cart } = useStore()
  useEffect(() => {
    if (!cart?.items?.length) return
    trigleGTMpurchaseEvent({ cart })
  }, [cart?.items.length])

  return null
}

export default GTMpurchaseEvent
