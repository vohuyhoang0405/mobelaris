import { Cart, LineItem } from "@medusajs/medusa"
import { computeAmount } from "app/helper/price"
import { HitItem } from "types/global"
import { Product, Region, Variant } from "types/medusa"
let eventListId = ""
const defaultAffiliation = "Mobelaris Webshop"
type GTMEcommerceItem = {
  item_id: string
  item_name: string
  affiliation: string
  currency: string
  coupon?: string
  discount: number
  item_brand: string
  item_category: string
  item_category2: string
  item_category3: string
  item_category4: string
  item_category5: string
  item_variant: string
  // item_list_name: string
  quantity?: number
  item_list_id: string
  price: number
}
type GTMEcommerceEvent =
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "add_shipping_info"
  | "add_payment_info"
  | "purchase"
  | "enhanced_conversion"

type GTMEcommerceItemListId = string
export type GTMEvent = {
  event: GTMEcommerceEvent
  event_id: string
  ecommerce: {
    item_list_id: GTMEcommerceItemListId
    value?: number
    quantity?: number
    currency?: string
    coupon?: string
    discount?: number
    shipping?: number
    shipping_tier?: string
    tax?: number
    affiliation?: "Mobelaris Webshop"
    transaction_id?: string
    items: GTMEcommerceItem[]
  }
}

export const transformVariantToGTMItem = ({
  variant,
  product,
  region,
  item_list_id,
}: {
  variant: Variant
  product: Product
  region: Region
  item_list_id: string
}): GTMEcommerceItem => {
  let categories =
    product.metadata?.google_product_category
      ?.split(">")
      .map((item) => item.trim()) || []
  product.metadata?.product_type &&
    categories.push(product.metadata?.product_type)
  categories.push(product.title)
  const [category1, category2, category3, category4, category5] = categories
  return {
    item_id: variant.sku,
    item_name: product.title + " " + variant.title,
    affiliation: defaultAffiliation,
    currency: region.currency_code.toUpperCase() || "",
    item_brand: "",
    item_category: category1 || "",
    item_category2: category2 || "",
    item_category3: category3 || "",
    item_category4: category4 || "",
    item_category5: category5 || "",
    item_variant: variant.sku,
    item_list_id: item_list_id,
    price: variant.price_formated.calculated_price,
    discount: 0,
    coupon: "",
  }
}
export const transformHitToGTMItem = ({
  item,
  item_list_name,
  region,
}: {
  item_list_name: string
  item: HitItem
  region: Region
}): GTMEcommerceItem => {
  const discountAmount = 0
  return {
    item_id: item.variant_sku[0] + "",
    item_name: item.title,
    item_brand: "",
    item_category: "",
    item_category2: "",
    item_category3: "",
    item_category4: "",
    item_category5: "",
    item_variant: item.variant_sku[0] + "",
    item_list_id: eventListId,
    affiliation: "",
    coupon: "",
    discount: computeAmount({
      amount: discountAmount,
      region,
      includeTaxes: false,
    }),
    currency: region.currency_code.toUpperCase() || "",
    price: computeAmount({
      amount: item.calculated_price,
      region,
      includeTaxes: false,
    }),
  }
}
export const transformCartItemToGTMItem = ({
  item,
  cart,
  listId,
  quantity,
}: {
  item: LineItem
  cart: Cart
  listId: string
  quantity: number
}): GTMEcommerceItem => {
  const variant = item.variant
  const product = variant.product
  let categories =
    product.metadata?.google_product_category
      ?.split(">")
      .map((item) => item.trim()) || []
  product.metadata?.product_type &&
    categories.push(product.metadata?.product_type)
  categories.push(product.title)
  const [category1, category2, category3, category4, category5] = categories
  return {
    item_id: variant.sku,
    item_name: variant.product.title + " " + variant.title,
    affiliation: defaultAffiliation,
    currency: cart.region.currency_code.toUpperCase(),
    item_brand: "",
    item_category: category1 || "",
    item_category2: category2 || "",
    item_category3: category3 || "",
    item_category4: category4 || "",
    item_category5: category5 || "",
    item_variant: variant.sku,
    item_list_id: listId,
    quantity: quantity || item.quantity,
    price: computeAmount({
      amount: item.unit_price,
      region: cart.region,
      includeTaxes: false,
    }),
    discount: computeAmount({
      amount: item.discount_total || 0,
      region: cart.region,
      includeTaxes: false,
    }),
    coupon: "",
  }
}
export const getEventId = () => {
  const date = new Date()
  const timestamp = date.getTime()
  const dateStr = timestamp + ""
  const event_id = `${timestamp}.${dateStr.substring(dateStr.length - 10)}`
  return event_id
}

export const pushGTMEvent = ({ event }: { event: GTMEvent }) => {
  console.log(event.event, { event })
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}
