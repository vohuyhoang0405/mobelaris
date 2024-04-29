"use client"
import { Cart } from "@medusajs/medusa"
import { useStore } from "app/[locale]/context/store-context"
import useDebounce from "app/[locale]/hooks/use-debounce"
import { computeAmount, useCart } from "medusa-react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
const EVENTS = {
  PRODUCT_PAGE_VIEW: "Product Page View",
  COLLECTIONS_PAGE_VIEW: "Collections Page View",
  PRODUCT_PAGE_SCROLL: "Product Page Scroll",
  SITE_SEARCH: "Site search",
  SUBSCRIBE_TO_MAILING_LIST: "Subscribe to mailing list",
  BEGIN_CHECKOUT: "Begin checkout",
  PURCHASES: "purchase",
}
type Item = {
  item_id: string
  item_name: string
  affiliation: string
  coupon: string
  discount: string
  index: string
  item_brand: string
  item_category: string
  item_category2: string
  item_category3: string
  item_category4: string
  item_category5: string
  item_list_id: string
  item_list_name: string
  item_variant: string
  location_id: string
  price: string
  quantity: number
}
type Transaction = {
  transaction_id: string
  value: string
  tax: string
  shipping: string
  currency: string
  coupon?: string
  items: Item[]
}
export const gtagEvents = {
  SUBSCRIBE_TO_MAILING_LIST: ({ email }: { email: string }) => {
    window.gtag("event", EVENTS.SUBSCRIBE_TO_MAILING_LIST, {
      email: email,
    })
  },
  SUBSCRIBE_TO_MAILING_LIST_ENGAGEMENT: ({ email }: { email: string }) => {
    console.log({ email })
    window.gtag("event", EVENTS.SUBSCRIBE_TO_MAILING_LIST, {
      event_category: "Engagement",
      email: email,
    })
  },
  BEGIN_CHECKOUT: ({
    cart,
  }: {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">
  }) => {
    const formatter = (num: number = 0) => {
      return new Intl.NumberFormat("en-US", {
        currency: cart.region.currency_code,
        minimumFractionDigits: 0,
      }).format(
        computeAmount({
          amount: num,
          region: cart.region,
          includeTaxes: false,
        })
      )
    }
    try {
      let data: Transaction = {
        transaction_id: cart.id,
        items: cart.items.map((item) => {
          return {
            item_id: item.variant.sku,
            item_name: item.title,
            affiliation: "",
            coupon: cart.discounts?.[0]?.code || "",
            discount: formatter(item.discount_total || 0),
            index: "",
            item_brand: "",
            item_category: item.variant.product.tags?.[0]?.value || "",
            item_category2: item.variant.product.tags?.[1]?.value || "",
            item_category3: item.variant.product.tags?.[2]?.value || "",
            item_category4: item.variant.product.tags?.[3]?.value || "",
            item_category5: item.variant.product.tags?.[4]?.value || "",
            item_list_id: "",
            item_list_name: "",
            item_variant: "",
            location_id: "",
            price: formatter(item.unit_price || 0),
            quantity: item.quantity,
          }
        }),
        value: formatter(cart.total),
        tax: formatter(cart.tax_total || 0),
        shipping: formatter(cart.shipping_total),
        currency: cart.region.currency_code,
        coupon: cart.discounts?.[0]?.code || "",
      }
      console.log({ data })
      window.gtag("event", EVENTS.BEGIN_CHECKOUT)
    } catch (error) {}
  },
  PURCHASES: ({
    cart,
  }: {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">
  }) => {
    const formatter = (num: number = 0) => {
      return new Intl.NumberFormat("en-US", {
        currency: cart.region.currency_code,
        minimumFractionDigits: 0,
      }).format(
        computeAmount({
          amount: num,
          region: cart.region,
          includeTaxes: false,
        })
      )
    }
    try {
      let data: Transaction = {
        transaction_id: cart.id,
        items: cart.items.map((item) => {
          return {
            item_id: item.variant.sku,
            item_name: item.title,
            affiliation: "",
            coupon: cart.discounts?.[0]?.code || "",
            discount: formatter(item.discount_total || 0),
            index: "",
            item_brand: "",
            item_category: item.variant.product.tags?.[0]?.value || "",
            item_category2: item.variant.product.tags?.[1]?.value || "",
            item_category3: item.variant.product.tags?.[2]?.value || "",
            item_category4: item.variant.product.tags?.[3]?.value || "",
            item_category5: item.variant.product.tags?.[4]?.value || "",
            item_list_id: "",
            item_list_name: "",
            item_variant: "",
            location_id: "",
            price: formatter(item.unit_price || 0),
            quantity: item.quantity,
          }
        }),
        value: formatter(cart.total),
        tax: formatter(cart.tax_total || 0),
        shipping: formatter(cart.shipping_total),
        currency: cart.region.currency_code,
        coupon: cart.discounts?.[0]?.code || "",
      }
      console.log({ data })
      window.gtag("event", EVENTS.PURCHASES, data)
    } catch (error) {
      console.error(error)
    }
  },
}
export const GTagEvent = ({ event }: { event: string }) => {
  const pathName = usePathname()
  useEffect(() => {
    try {
      window.gtag("event", event, {})
    } catch (error) {
      console.error(error)
    }
  }, [event, pathName])
  return null
}
export const GTagEventProductPageView = () => {
  return <GTagEvent event={EVENTS.PRODUCT_PAGE_VIEW} />
}
export const GTagEventColleftionPageView = () => {
  return <GTagEvent event={EVENTS.COLLECTIONS_PAGE_VIEW} />
}
export const GTagEventProductPageScroll = () => {
  const pathName = usePathname()

  useEffect(() => {
    let hadSent = false
    let animationFrameId: number | null = null

    const getScrollPercent = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.body.clientHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const trackLength = documentHeight - windowHeight
      return Math.round((scrollTop / trackLength) * 100)
    }

    const handleEvent = function () {
      if (hadSent || getScrollPercent() <= 50) return
      hadSent = true
      window.gtag &&
        window.gtag("event", EVENTS.PRODUCT_PAGE_SCROLL, {
          event_category: "Engagement",
          event_label: "Scrolled to 50% of page",
        })
    }

    const handleScroll = () => {
      if (animationFrameId) return
      animationFrameId = requestAnimationFrame(() => {
        handleEvent()
        animationFrameId = null
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathName])

  return null
}

export const GTagEventSiteSearch = ({
  search_keyword,
}: {
  search_keyword?: string
}) => {
  const deferrsearch_keyword = useDebounce(search_keyword, 300)

  useEffect(() => {
    const handleSiteSearch = () => {
      try {
        if (deferrsearch_keyword && deferrsearch_keyword.length) {
          window.gtag("event", EVENTS.SITE_SEARCH, {
            event_category: "Engagement",
            search_keyword: deferrsearch_keyword,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    handleSiteSearch()

    return () => {}
  }, [deferrsearch_keyword])

  return null
}
export const GTagEventBeginCheckout = () => {
  const { cart } = useCart()

  useEffect(() => {
    const handleBeginCheckout = () => {
      try {
        if (cart?.id && cart?.items.length) {
          gtagEvents.BEGIN_CHECKOUT({
            cart,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (cart?.items.length) {
      handleBeginCheckout()
    }

    return () => {}
  }, [cart?.items.length])

  return null
}

export const GTagEventEnterPage = ({
  type,
}: {
  type:
    | "home"
    | "plp"
    | "pdp"
    | "cart"
    | "search_results"
    | "checkout_begin"
    | "checkout_shipping"
    | "checkout_payment"
    | "thank_you"
    | "blog"
    | "account"
    | "undefined"
}) => {
  const pathName = usePathname()
  const { region } = useStore()

  useEffect(() => {
    const handleEnterPage = () => {
      const date = new Date()
      const timestamp = date.getTime()
      const dateStr = timestamp + ""
      const site_version =
        new Date(date.getFullYear(), date.getMonth(), 1).getTime() + ""
      const event_id = `${timestamp}.${dateStr.substring(dateStr.length - 10)}`
      const data = {
        event: "page_info",
        event_id: event_id,
        page: [
          {
            type: type,
            currency: region.currency_code.toUpperCase(),
            breadcrumb: pathName,
            site_version: site_version,
          },
        ],
      }
      console.log("page_info", pathName, { data })
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(data)
    }

    handleEnterPage()

    return () => {}
  }, [pathName, type, region.currency_code])

  return null
}
