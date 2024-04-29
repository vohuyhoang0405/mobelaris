"use client"
import { Order } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"
import Link from "app/components/Link"
import Logo from "app/components/Logo"
import dynamic from "next/dynamic"
import React from "react"

const Items = dynamic(() => import("./components/items"))
const OrderDetails = dynamic(() => import("./components/order-details"))
const OrderSummary = dynamic(() => import("./components/order-summary"))
const PaymentDetails = dynamic(() => import("./components/payment-details"))
const ShippingDetails = dynamic(() => import("./components/shipping-details"))

type OrderCompletedTemplateProps = {
  order: Order
}

const Help = () => {
  const t = useT()
  return (
    <div>
      <h2 className="text-base-semi">{t("Need help?")}</h2>
      <div className="text-base-regular my-2">
        <ul className="flex flex-col gap-y-2">
          <li>
            <Link href="/pages/contact-us">{t("Contact")}</Link>
          </li>
          <li>
            <Link href="/pages/30-day-returns">{t("Return & Refunds")}</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {
  const t = useT()
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div
        className="flex flex-col items-center justify-center pb-6 text-center"
        id="logo"
      >
        <div className="first_logo text-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </div>
      <div className="content-container flex justify-center">
        <div className="h-full w-full max-w-4xl bg-white">
          <OrderDetails order={order} />
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <div className="grid grid-cols-1 gap-4 border-b border-gray-200 p-10 lg:grid-cols-2">
            <PaymentDetails
              payments={order.payments}
              paymentStatus={order.payment_status}
            />
            <ShippingDetails
              shippingMethods={order.shipping_methods}
              address={order.shipping_address}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 p-10 lg:grid-cols-2">
            <Help />
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
      <div className="content-container mx-auto mt-6 flex max-w-4xl justify-between gap-6">
        <Link
          href={"/pages/contact-us"}
          className="flex max-w-[200px] items-center gap-2"
        >
          {t("Need helps? Contact us.")}
        </Link>
        <Link href={"/"} className="btn ">
          {t("Continue to shopping")}
        </Link>
      </div>
    </div>
  )
}

export default OrderCompletedTemplate
