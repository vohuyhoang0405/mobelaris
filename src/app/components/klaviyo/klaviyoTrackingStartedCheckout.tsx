"use client"
import { useStore } from "app/[locale]/context/store-context"
import React from "react"
import { klaviyoStartedCheckout } from "./util"

interface Props {}

const KlaviyoTrackingStartedCheckout: React.FC<Props> = ({}) => {
  const { cart } = useStore()
  React.useEffect(() => {
    cart?.id && cart.items.length && klaviyoStartedCheckout(cart)
  }, [cart?.id])
  return null
}

export default KlaviyoTrackingStartedCheckout
