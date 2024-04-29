import { SHOW_TAX } from "@lib/constants"
import { Cart } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"
import { formatAmount } from "medusa-react"
import React from "react"

type CartTotalsProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = cart

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }
  const t = useT()
  return (
    <div>
      <div className="text-small-regular text-gray-700">
        <div className="text-base-regular mb-2 flex items-center justify-between text-gray-900">
          <span>{t("Subtotal")}</span>
          <span>{getAmount(subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {!!discount_total && (
            <div className="flex items-center justify-between">
              <span>{t("Discount")}</span>
              <span>- {getAmount(discount_total)}</span>
            </div>
          )}
          {!!gift_card_total && (
            <div className="flex items-center justify-between">
              <span>{t("Gift card")}</span>
              <span>- {getAmount(gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>{t("Shipping")}</span>
            <span>{getAmount(shipping_total)}</span>
          </div>
          {SHOW_TAX && (
            <div className="flex items-center justify-between">
              <span>{t("Taxes")}</span>
              <span>{getAmount(tax_total)}</span>
            </div>
          )}
        </div>
        <div className="my-4 h-px w-full border-b " />
        <div className="text-base-regular mb-2 flex items-center justify-between border-b pb-4 text-gray-900">
          <span>{t("Total")}</span>
          <span className="text-xl font-bold ">{getAmount(total)}</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotals
