export const IS_BROWSER = typeof window !== "undefined"

export const SITE_URL =
  process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL || "localhost:8000"

export const SHOW_TAX = false

export const SEARCH_CONFIG = {
  sort: ["number_of_sale:desc"],
  attributesToRetrieve: [
    "guarantee",
    "tags_value",
    "variant_sku",
    "calculated_price",
    "handle",
    "number_of_sale",
    "original_price",
    "thumbnail",
    "title",
    "select_guarantee",
  ],
  attributesToHighlight: [""],
}
