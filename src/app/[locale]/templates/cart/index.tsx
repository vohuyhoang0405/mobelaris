"use client"
import useDebounce from "@lib/hooks/use-debounce"
import { repalceImage } from "@lib/image/loader"
import { LineItem } from "@medusajs/medusa"
import { T, useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import { useFormatPrice } from "app/[locale]/hooks/use-format-price"
import Container from "app/components/Container"
import Features from "app/components/Features"
import Image from "app/components/Image"
import Link from "app/components/Link"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { CartFeatures } from "./CartFeatures/CartFeatures"
import stepbgimg from "./checkout-graphic.png"
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
  const title = t(item.title) + " " + t(item.description)
  return (
    <div className="cart-item relative flex flex-row flex-wrap items-start gap-2 border-b py-6 lg:items-center lg:gap-6">
      <div className="cart-image w-1/4 max-w-[105px] flex-shrink-0">
        <Link
          href={`/${item.variant.product.handle}?variant=${item.variant.id}`}
          title={title}
        >
          <div
            className="relative w-full"
            style={{ paddingBottom: "129.62356792144024%" }}
          >
            <Image
              className="lazyload-fade lazyautosizes lazyloaded absolute inset-0 h-full w-full bg-transparent object-contain"
              data-sizes="auto"
              sizes="200px"
              alt={title + " image"}
              src={repalceImage(thumb)}
            />
          </div>
        </Link>
      </div>
      <div className="cart-title flex-1 text-left text-xs lg:text-base">
        <h4 className="text-[1em] font-bold ">{title}</h4>
        {!!item.variant?.metadata?.leadtime && (
          <div className="mt-4 text-[0.9em]">
            <div className="inline font-bold ">
              <T>Shipping days/weeks</T>:{" "}
            </div>
            {t(item?.variant?.metadata?.leadtime)}
          </div>
        )}
      </div>
      <div className="item-pricing hidden w-[8rem] min-w-[100px] flex-col  gap-3 text-right  lg:flex">
        <b className="hidden">{t("Price")}</b>
        <div className="order-discount onsale text-lg font-bold leading-10">
          {formatAmount(item.unit_price)}
        </div>
      </div>
      <div className="cart-qty selector-wrapper flex items-baseline justify-end gap-2 self-end text-right lg:w-[8rem] lg:items-center lg:self-auto">
        <b className="lg:hidden">{t("QTY")}:</b>
        <QuantityInput
          key={item.quantity}
          value={item.quantity}
          onChange={updateItem}
        />
      </div>
      <div className="line-pricing hidden w-[8rem]  min-w-[100px] flex-col gap-3 text-right lg:flex">
        <b className="hidden">{t("Total")}</b>
        <p>
          <span
            className="cart-item-price money onsale text-lg font-bold leading-10"
            style={{ marginRight: 5 }}
          >
            {formatAmount(item.total)}
          </span>
        </p>
      </div>
      <div className="absolute right-0 top-6 flex justify-center lg:relative lg:top-0 lg:w-[4rem]">
        <button
          onClick={removeItem}
          className="remove flex h-6 w-6 items-center justify-center border text-right"
        >
          <span className="btn btn-square btn-ghost btn-xs transform border-red-300 leading-none hover:bg-red-100">
            <svg
              className="text-red-500"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={1}
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
    </div>
  )
}
const QuantityInput = ({ value, onChange }) => {
  const inputRef = useRef()
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
      className={clsx("", {
        "pointer-events-none opacity-60": loading,
      })}
    >
      <input
        disabled={loading}
        ref={inputRef}
        min={1}
        type="number"
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="input input-sm min-h-[30px] w-[70px] bg-gray-100 !pr-0 pl-3 text-center  ring-[1px] ring-gray-100 ring-offset-2"
        value={quantity}
      />
    </div>
  )
}
const CartEmpty = () => {
  const t = useT()
  return (
    <Container className="w-full py-12">
      <div className="flex w-full flex-col flex-wrap justify-center gap-6 lg:flex-row lg:gap-12">
        <p>{t("Your cart is currently empty.")}</p>
      </div>
    </Container>
  )
}
function CartTemplate({ showagreeTerm = false }) {
  const { updateItem, cartCount, cart, locale } = useStore()
  const formatAmount = useFormatPrice()
  const [agreeTerm, setAgreeTerm] = useState(true)
  const { push: nextPush } = useRouter()
  const t = useT()
  const push = (url: string) => {
    nextPush("/" + locale + url)
  }
  return (
    <>
      <Container className="mx-auto w-full !max-w-5xl py-6 font-button">
        <div className="relative isolate mx-auto grid max-w-md  grid-cols-3 items-start justify-center before:absolute before:left-[15%] before:right-[15%] before:top-[24px] before:border-b before:border-gray-300 before:content-['']">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full border-[4px] border-solid border-white bg-white bg-cover font-title  text-3xl text-secondary before:absolute before:inset-0 before:z-[-1] before:rounded-full before:bg-white">
              <div
                className="flex h-[45px] w-[45px] items-center justify-center text-center"
                style={{
                  background: `url(${stepbgimg.src}) 100%/100% no-repeat`,
                }}
              >
                1
              </div>
            </div>
            <div className="font-[800]">{t("Shopping cart")}</div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center text-black ">
            <div className="relative flex  h-[54px] w-[54px] items-center justify-center rounded-full border-[4px] border-solid border-white bg-white bg-cover font-title  text-3xl before:absolute before:inset-0 before:z-[-1] before:rounded-full before:bg-white">
              <div
                className="flex h-[45px] w-[45px] items-center justify-center text-center opacity-40"
                style={{
                  background: `url(${stepbgimg.src}) 100%/100% no-repeat`,
                }}
              >
                2
              </div>
            </div>
            <div className="opacity-40">{t("Checkout")}</div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center text-black ">
            <div className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full border-[4px] border-solid border-white bg-white bg-cover font-title  text-3xl before:absolute before:inset-0 before:z-[-1] before:rounded-full before:bg-white">
              <div
                className="flex h-[45px] w-[45px] items-center justify-center text-center opacity-40"
                style={{
                  background: `url(${stepbgimg.src}) 100%/100% no-repeat`,
                }}
              >
                3
              </div>
            </div>
            <div className="opacity-40">{t("Order Complete")}</div>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-3 lg:flex-row">
          <Link
            href="/"
            className="btn-magic group !btn-block !text-lg !text-secondary lg:!w-[270px] lg:max-w-[40%]"
          >
            <span className="text-white group-hover:text-secondary">
              <T>CONTINUE SHOPPING</T>
            </span>
          </Link>
          <button
            onClick={() => {
              if (!showagreeTerm) {
                push("/checkout")
              } else {
                if (agreeTerm) {
                  push("/checkout")
                } else {
                  alert(
                    t(
                      "You must agree with the terms and conditions of sales to check out"
                    )
                  )
                }
              }
            }}
            className="btn-magic group !btn-block !text-lg !text-primary lg:!w-[270px] lg:max-w-[40%]"
          >
            <div className="text-white group-hover:text-primary">
              <T>PROCEED TO CHECKOUT</T>
            </div>
          </button>
        </div>
        <div
          className="mt-6 flex w-full flex-col justify-center gap-6 lg:gap-6"
          id="cartform"
        >
          <div className="hidden gap-6 border-b py-1 font-button text-lg font-bold uppercase lg:flex">
            <div>{t("Item")}</div>
            <div className="flex-1"></div>
            <div className="w-[8rem] text-right">{t("Price")}</div>
            <div className="w-[8rem] text-right">{t("QTY")}</div>
            <div className="w-[8rem] text-right">{t("Subtotal")}</div>
            <div className="w-[4rem] text-right"></div>
          </div>
          <div className="max-w-full text-center lg:text-left">
            {cart && cart?.items && cart?.items.length === 0 && <CartEmpty />}
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
          <div className="flex grid-cols-12 flex-col gap-6 lg:grid">
            <div
              id="basket-right"
              className="col-span-7 col-start-6 flex-1 border p-6 lg:p-12"
            >
              <div className="cart-final-details space-y-3">
                <div className="subtotal flex justify-between">
                  <p className="title text-xl uppercase">{t("Subtotal")}</p>
                  <p className="subtotal-price">
                    <span className="cart-original-total money text-xl">
                      {formatAmount(cart?.subtotal || 0)}
                    </span>
                  </p>
                </div>
                <div className="total flex justify-between border-t pt-3">
                  <h3 className="title text-2xl uppercase">{t("Total")}</h3>
                  <h3 className="total-price">
                    <span className="cart-original-total money text-2xl">
                      {formatAmount(cart?.subtotal || 0)}
                    </span>
                    <span className="cart-total" />
                  </h3>
                </div>
                {/*  <div class="klara-block">  <p>or as low as <span class="price-block">$398</span>/mo.<a class="learn-more-btn js-no-transition" href="#">Learn more</a></p> </div> <div class="shipping-date-details">             <div class="wrap">               <p>Your order ships in 2 days</p>             </div>           </div> */}
              </div>
            </div>
            <div className="cart-buttons col-span-full row-start-2 flex flex-wrap items-center justify-between gap-6">
              <div>
                <T>{`*Please note we send the full order when all items are in stock`}</T>
              </div>
              <button
                onClick={() => {
                  window.gtag("event", "s_website_begin checkout", {})
                  if (!showagreeTerm) {
                    push("/checkout")
                  } else {
                    if (agreeTerm) {
                      push("/checkout")
                    } else {
                      alert(
                        t(
                          "You must agree with the terms and conditions of sales to check out"
                        )
                      )
                    }
                  }
                }}
                className={clsx(
                  "btn-magic group !btn-block !text-lg !text-primary lg:!w-[270px] lg:max-w-[40%]",
                  !cartCount && "btn-disabled"
                )}
              >
                <div className="text-white group-hover:text-primary">
                  {t("PROCEED TO CHECKOUT")}
                </div>
              </button>
              {showagreeTerm && (
                <div
                  style={{ marginBottom: 20, display: "none" }}
                  className="flex items-start gap-3"
                >
                  <input
                    style={{ height: 30 }}
                    type="checkbox"
                    id="CartTerms"
                    defaultChecked={agreeTerm}
                    onChange={(e) => setAgreeTerm(e.target.checked)}
                    className="cart__terms-checkbox peer order-2 h-[1.4rem] flex-shrink-0 leading-[1.4rem]"
                  />
                  <label
                    htmlFor="CartTerms"
                    className="text-label order-2 flex-1 text-left leading-[1.4rem] "
                  >
                    <span className="text-sm leading-[1.9]">
                      {t("I agree with the")}{" "}
                      <a
                        href="/pages/terms-conditions"
                        style={{ color: "black" }}
                        target="_blank"
                        className="js-no-transition text-secondary underline"
                      >
                        {t("terms and conditions")}
                      </a>
                    </span>
                  </label>
                </div>
              )}
            </div>
            <div className="col-span-5 col-start-1 row-start-1 border p-6 lg:grid">
              <CartFeatures />
            </div>
          </div>
        </div>
        <div className="h-12"></div>
      </Container>
      <Features />
    </>
  )
}
export default CartTemplate
