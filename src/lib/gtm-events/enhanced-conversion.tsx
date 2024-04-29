"use client"

import { Cart } from "@medusajs/medusa"
import { GTMEvent, getEventId, pushGTMEvent } from "."
export const trigleGTMenhancedConversionEvent = ({ cart }: { cart: Cart }) => {
  const event_id = getEventId()
  const data: GTMEvent = {
    event: "enhanced_conversion",
    event_id: event_id,
    user: [
      {
        email: cart?.email,
        phone_number: cart?.shipping_address?.phone,
        first_name: cart?.shipping_address?.first_name,
        last_name: cart?.shipping_address?.last_name,
        country: cart?.shipping_address?.country_code,
        region: cart?.region.name,
        city: cart.shipping_address?.city,
        postal_code: cart?.shipping_address?.postal_code,
        street_address:
          cart?.shipping_address?.address_1 +
          " " +
          cart?.shipping_address?.address_2,
      },
    ],
  }
  pushGTMEvent({ event: data })
}
