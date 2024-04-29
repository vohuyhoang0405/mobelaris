"use client"

import { useStore } from "app/[locale]/context/store-context"
import { computeAmount } from "app/helper/price"
import { useEffect } from "react"
import {
  GTMEvent,
  getEventId,
  pushGTMEvent,
  transformCartItemToGTMItem,
} from "."

const GTMBeginCheckoutEvent = () => {
  const { cart } = useStore()
  useEffect(() => {
    if (!cart?.items?.length) return
    let region = cart?.region
    const event_id = getEventId()
    const pathName = window.location.pathname
    let itemListId = ""
    const data: GTMEvent = {
      event: "begin_checkout",
      event_id: event_id,
      ecommerce: {
        item_list_id: itemListId,
        value: computeAmount({
          amount: cart.total || 0,
          region: region,
          includeTaxes: false,
        }),
        coupon: cart.discounts.map((discount) => discount.code).join(","),
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
  }, [cart?.items.length])

  return null
}

export default GTMBeginCheckoutEvent
