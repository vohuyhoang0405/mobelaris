"use client"
import { SHOW_TAX } from "@lib/constants"
import { Order } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"
import { formatAmount } from "medusa-react"

type OrderSummaryProps = {
  order: Order
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return formatAmount({ amount, region: order.region, includeTaxes: false })
  }
  const t = useT()
  return (
    <div>
      <h2 className="text-base-semi">{t("Summary")}</h2>
      <div className="text-small-regular my-2 text-gray-700">
        <div className="text-base-regular mb-2 flex items-center justify-between text-gray-900">
          <span>{t("Subtotal")}</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>{t("Discount")}</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>{t("Discount")}</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>{t("Shipping")}</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          {SHOW_TAX && (
            <div className="flex items-center justify-between">
              <span>{t("Taxes")}</span>
              <span>{getAmount(order.tax_total)}</span>
            </div>
          )}
        </div>
        <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />
        <div className="text-base-regular mb-2 flex items-center justify-between text-gray-900">
          <span>{t("Total")}</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
