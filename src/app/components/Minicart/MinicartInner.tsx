import useDebounce from "@lib/hooks/use-debounce"
import { LineItem } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"
import clsx from "clsx"

import { useStore } from "app/[locale]/context/store-context"
import { useFormatPrice } from "app/[locale]/hooks/use-format-price"
import { repalceImage } from "app/helper/image/loader"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const Link = dynamic(() => import("../Link"))

const LineItem = ({
  item,
  formatAmount,
  updateItem,
  removeItem,
}: {
  item: LineItem
}) => {
  const thumb = item.variant.metadata.images?.filter(Boolean)[0]
  const t = useT()
  const title = t(item.title)
  const des = t(item.description)
  return (
    <div className="relative flex items-start gap-3 pr-8 text-sm">
      <div className="cart-image w-1/4 max-w-[75px] flex-shrink-0">
        <Link
          href={`/${item.variant.product.handle}?variant=${item.variant.id}`}
          title={title}
        >
          <div
            className="relative w-full"
            style={{ paddingBottom: "129.62356792144024%" }}
          >
            <img
              className="lazyload-fade lazyautosizes lazyloaded absolute inset-0 h-full w-full bg-transparent object-contain"
              data-sizes="auto"
              alt={title + " image"}
              src={repalceImage(thumb).replace("/e_trim", "/e_trim,w_300")}
            />
          </div>
        </Link>
      </div>
      <div className="cart-title flex-1">
        <div className="font-heading font-bold">{title}</div>
        <div className="text-xs">{des}</div>
        <div className="">
          <div className="flex-1 ">
            <b className="hidden">{t("Price")}</b>
            <div
              className="order-discount onsale font-sans font-bold leading-10"
              data-cart-item-final-price
            >
              {formatAmount(item.unit_price)}
            </div>
          </div>
          <div className="flex items-center gap-2 leading-relaxed">
            <b className="">{t("QTY")}: </b>
            <QuantityInput
              key={item.quantity}
              value={item.quantity}
              onChange={updateItem}
            />
          </div>
        </div>
      </div>
      <button
        onClick={removeItem}
        className="remove absolute right-[-1px] top-[-1px]"
      >
        <span className="btn btn-square btn-ghost btn-xs transform leading-none text-primary">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={2}
            version="1.1"
            viewBox="0 0 17 17"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g />
            <path d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z" />
          </svg>
        </span>
      </button>
    </div>
  )
}
const QuantityInput = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>()
  const [quantity, setQuantity] = useState(value)
  const quanityDebounced = useDebounce(quantity, 300)
  const [loading, setLoading] = useState()
  useEffect(() => {
    if (value !== quanityDebounced) {
      setLoading(true)
      onChange(quanityDebounced)
    }
  }, [quanityDebounced])

  return (
    <div
      className={clsx("flex border text-center leading-loose ", {
        "pointer-events-none opacity-60": loading,
      })}
    >
      <input
        disabled={loading}
        ref={inputRef}
        min={1}
        type="number"
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="input input-sm min-h-[30px] w-[70px] !pr-0 pl-3"
        value={quantity}
      />
    </div>
  )
}
const CartEmpty = () => {
  const t = useT()
  return (
    <div id="shopping-cart" className="w-full text-center">
      <div className="flex w-full flex-col flex-wrap justify-center gap-6 lg:flex-row lg:gap-12">
        <div className="w-full max-w-full space-y-4">
          <h1 className="page-title flex justify-between gap-6 border-b pb-6 text-2xl">
            {t("My Cart")}
          </h1>
          <p>{t("Your cart is currently empty.")}</p>
        </div>
      </div>
    </div>
  )
}
function MiniCartContent() {
  const { updateItem, cart } = useStore()
  const formatAmount = useFormatPrice()
  const { push } = useRouter()
  const t = useT()
  if (cart?.items && cart?.items.length === 0) return <CartEmpty />
  return (
    <div>
      <div className="flex w-full flex-col flex-wrap justify-center ">
        <div className="max-w-full space-y-4 py-6 text-center lg:text-left">
          {cart?.items
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((item) => (
              <LineItem
                key={item.id}
                item={item}
                updateItem={(value) =>
                  updateItem({
                    lineId: item.id,
                    quantity: value,
                  })
                }
                removeItem={() =>
                  updateItem({
                    lineId: item.id,
                    quantity: 0,
                  })
                }
                formatAmount={formatAmount}
              />
            ))}
        </div>
        <div className="cart-final-details space-y-3 border-y py-3">
          <div className="subtotal flex items-baseline justify-between">
            <p className="title text-sm uppercase">{t("Cart Subtotal")}:</p>
            <p className="subtotal-price">
              <span className="cart-original-total money font-sans font-bold">
                {formatAmount(cart?.subtotal || 0)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full flex-col justify-between gap-3">
        <Link
          href="/checkout/cart"
          className="btn-magic group !btn-block !h-[40px] !text-lg !text-primary"
        >
          <div className="text-white group-hover:text-primary">
            {t("View cart")}
          </div>
        </Link>
        <Link
          href="/checkout"
          className="btn-magic group !btn-block !max-h-[40px] !text-lg !text-primary"
        >
          <div className="text-white group-hover:text-primary">
            {t("CHECKOUT")}
          </div>
        </Link>
      </div>
    </div>
  )
}
export default MiniCartContent
