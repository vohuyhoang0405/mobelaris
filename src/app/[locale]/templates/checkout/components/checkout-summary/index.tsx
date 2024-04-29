"use client"
import { LineItem } from "@medusajs/medusa"
import { CartFeatures } from "app/[locale]/templates/cart/CartFeatures/CartFeatures"
import Image from "app/components/Image"
import { formatAmount, useCart } from "medusa-react"
import dynamic from "next/dynamic"
import { CheckoutCards } from "../../CheckoutCards"

const CartTotals = dynamic(() => import("../cart-totals"))
const DiscountCode = dynamic(() => import("../discount-code"))

const LineItem = ({ item, formatAmount }: { item: LineItem }) => {
  const thumb = item.variant.metadata.images?.filter(Boolean)[0]
  return (
    <div className="cart-item relative flex flex-row items-center gap-6">
      <div className="cart-image w-1/3 max-w-[64px] rounded-xl border bg-white">
        <a
          href={`/products/${item.variant.product.handle}?variant=${item.variant.id}`}
          title={item.title}
        >
          <div
            className="relative isolate w-full"
            style={{ paddingBottom: "100%" }}
          >
            <Image
              className="lazyload-fade lazyautosizes lazyloaded absolute inset-0 h-full w-full bg-transparent object-contain"
              data-sizes="auto"
              alt={item.title + " image"}
              src={thumb}
            />
            <div className="absolute right-0 top-0 z-10 translate-x-[50%] translate-y-[-50%] rounded-full bg-base-300 px-2 py-1 text-sm leading-none">
              {item.quantity}
            </div>
          </div>
        </a>
      </div>
      <div className="cart-title flex-1">
        <h4 className="text-base">{item.title}</h4>
        <p className="text-sm ">{item.description}</p>
      </div>
      <div className="cart-price flex flex-col items-end text-center">
        {item.original_total !== item.total && (
          <>
            <span className="text-sm line-through" style={{ marginRight: 5 }}>
              {formatAmount(item.original_total)}
            </span>
            <span className="text-sm" style={{ marginRight: 5 }}>
              -{formatAmount(item.discount_total)}
            </span>
          </>
        )}
        <span className="" style={{ marginRight: 5 }}>
          {formatAmount(item.total)}
        </span>
      </div>
    </div>
  )
}
const CheckoutSummary = () => {
  const { cart } = useCart()

  if (!cart?.id) {
    return null
  }
  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }

  return (
    <div className="sticky top-0 flex flex-col gap-6 ">
      <div className="space-y-2 pb-6">
        {cart?.items.map((item) => (
          <LineItem key={item.id} item={item} formatAmount={getAmount} />
        ))}
      </div>
      <div className="border-y py-6">
        <DiscountCode cart={cart} />
      </div>
      <div className="py-6">
        <CartTotals cart={cart} />
      </div>
      <CheckoutCards />
      <CartFeatures />
    </div>
  )
}

export default CheckoutSummary
