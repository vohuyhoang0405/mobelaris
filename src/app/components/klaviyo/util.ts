"use client"
import { Cart } from "@medusajs/medusa"
import { computeAmount, formatAmount } from "app/helper/price"
import { Product, Variant } from "types/medusa"

export const klaviyoStartedCheckout = (
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
) => {
  console.log({ cart })
  window._learnq = window._learnq || []
  cart.emai &&
    window._learnq.push([
      "identify",
      {
        $email: cart.email,
      },
    ])
  console.log(["track", "Started Checkout", cart])
  window._learnq.push([
    "track",
    "Started Checkout",
    {
      $event_id: cart.id,
      $value: computeAmount({
        amount: cart.subtotal,
        region: cart.region,
        includeTaxes: false,
      }),
      ItemNames: cart.items.map((item) => item.title),
      CheckoutURL: window.location.href,
      // "Categories": ["Fiction", "Children", "Classics"],
      Items: cart.items.map((item) => ({
        ProductID: item.variant.sku,
        SKU: item.variant.sku,
        ProductName: item.title + " " + item.variant.title,
        Quantity: item.quantity,
        ItemPrice: formatAmount({
          amount: item.unit_price,
          region: cart.region,
        }),
        RowTotal: formatAmount({
          amount: item.subtotal,
          region: cart.region,
        }),
        ProductURL:
          window.location.origin +
          `/products/${item.variant.product.handle}/${item.variant.id}`,
        ImageURL: item.thumbnail,
        // "ProductCategories": ["Fiction", "Children"]
      })),
    },
  ])
}

export const klaviyoTrackingProduct = (
  product: Product,
  variant: Variant,
  region
) => {
  window._learnq = window._learnq || []
  var item = {
    ProductName: product.title + " " + variant.title,
    ProductID: variant.sku,
    SKU: variant.sku,
    Categories: product.tags.map((item) => item.value),
    ImageURL: variant.images?.[0]?.src,
    URL: window.location.href,
    Brand: "Designer Editions",
    Price: formatAmount({
      amount: variant.calculated_price,
      region,
    }),
    CurrencyCode: region.currency_code,
    CompareAtPrice: variant.original_price,
  }
  window._learnq.push(["track", "Viewed Product", item])
}

export const klaviyoAddedToCart = (
  cart: Cart,
  quantity: number,
  variantId: string
) => {
  window._learnq = window._learnq || []
  const lineItem = cart.items.find((item) => item.variant.id === variantId)
  const variant = lineItem?.variant

  window._learnq.push([
    "track",
    "Added to Cart",
    {
      $value: computeAmount({
        amount: cart.subtotal,
        region: cart.region,
        includeTaxes: false,
      }),
      AddedItemProductName: variant.product.title + " " + variant.title,
      AddedItemProductID: variant.sku,
      AddedItemSKU: variant.sku,
      AddedItemImageURL: lineItem?.thumbnail,
      AddedItemURL:
        window.location.origin +
        `/products/${variant.product.handle}/${variant.id}`,
      AddedItemPrice: formatAmount({
        amount: lineItem?.unit_price,
        region: cart.region,
      }),
      AddedItemQuantity: quantity,
      ItemNames: cart.items.map((item) => item.title),
      CheckoutURL: window.location.origin + "/checkout",
      Items: cart.items.map((item) => ({
        ProductID: item.variant.sku,
        SKU: item.variant.sku,
        ProductName: item.title + " " + item.variant.title,
        Quantity: item.quantity,
        ItemPrice: formatAmount({
          amount: item.unit_price,
          region: cart.region,
        }),
        RowTotal: formatAmount({
          amount: item.subtotal,
          region: cart.region,
        }),
        ProductURL:
          window.location.origin +
          `/products/${item.variant.product.handle}/${item.variant.id}`,
        ImageURL: item.thumbnail,
        // "ProductCategories": ["Fiction", "Children"]
      })),
    },
  ])
}
