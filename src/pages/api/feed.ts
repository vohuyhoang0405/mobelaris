import { medusaServerClient } from "@lib/config.server"
import { localsMap } from "@shop/store.config"
import { get } from "lodash-es"
import { computeAmount } from "medusa-react"
import { NextRequest, NextResponse } from "next/server"
import { json2tsv } from "tsv-json/dist/source"

export default async function handler(req: NextRequest, res: NextResponse) {
  // Check for secret to confirm this is a valid request
  const regId = req.query.reg
  const lang = req.query.lang
  console.log("feed: ", { regId, lang })
  const { regions } = await medusaServerClient.regions.list()
  const region = regions.find((item) => item.id === regId)
  let products = await medusaServerClient.products
    .list({
      limit: 1,
      region_id: region?.id,
      currency_code: region?.currency_code,
    })
    .then((res) => res.products)
  if (!region) {
    return res.status(401).json({ message: "Region not found " + regId })
  }

  const currencyCode = region.currency_code.toUpperCase()
  const countryCode = region.countries[0].iso_2.toUpperCase()
  const locale = localsMap.find(
    (item) => item.countryCode === region.countries[0].iso_2
  )?.locale
  if (!locale) {
    return res.status(401).json({ message: "locale not found " + regId })
  }

  const attrmap = {
    id: "id",
    material: "metadata.material",
    short_title: "",
    title: (v, lang) => `${v.product.title} ${v.title}`,
    description: (v, lang) => `${v.product.description} `,
    link: (v, lang) =>
      v?.metadata?.handle
        ? `${process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL}/${locale}/${v.metadata.handle}`
        : `${process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL}/${locale}/${v.product.handle}?variant=${v.id}`,
    image_link: "images.0.src",
    additional_image_link: (v) => v.images?.map((item) => item.src)?.join(","),
    price: "original_price",
    sale_price: "calculated_price",
    google_product_category: "product.metadata.google_product_category",
    product_type: "product.metadata.product_type",
    gtin: "",
    brand: "Designer Editions",
    mpn: "",
    product_detail: "",
    product_highlight: "",
    identifier_exists: "",
    condition: "new",
    availability: "in stock",
    adult: "",
    sell_on_google_quantity: "",
    item_group_id: "",
    age_group: "",
    gender: "",
    color: "metadata.color",
    size: "",
    pattern: "",
    size_type: "",
    size_system: "",
    promotion_id: "",
    custom_label_0: "",
    custom_label_1: "product.metadata.inspiredOf",
    custom_label_2: "sv",
    custom_label_3: "product.metadata.product_type",
    custom_label_4: "",
    "shipping(country:region:postal_code:location_id:location_group_name:service:price:min_handling_time:max_handling_time:min_transit_time:max_transit_time)":
      () => `${countryCode}::::::0 ${currencyCode}::::`,
    included_destination: () => "Shopping_ads,Free_listings,Display_ads",
    excluded_destination: "",
    energy_efficiency_class: "",
    min_energy_efficiency_class: "",
    max_energy_efficiency_class: "",
    shipping_label: "",
    cost_of_goods_sold: "",
    multipack: "",
    is_bundle: "",
    shopping_ads_excluded_country: "",
    transit_time_label: "",
    shipping_weight: "",
    unit_pricing_measure: "",
    unit_pricing_base_measure: "",
    installment: "",
    shipping_length: "",
    shipping_width: "",
    shipping_height: "",
    min_handling_time: "",
    max_handling_time: "",
    "tax(country:location_group_name:location_id:postal_code:region:rate:tax_ship)":
      "",
    tax_category: "",
    pickup_sla: "",
    pickup_method: "",
    link_template: "",
    ads_redirect: "",
    availability_date: "",
    expiration_date: "",
  }
  const keys = Object.keys(attrmap)
  try {
    let allvariant = products.flatMap((p) => {
      const { maximumFractionDigits, minimumFractionDigits } =
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: region.currency_code,
        }).resolvedOptions()
      return p.variants.map((v) => {
        const original_price =
          new Intl.NumberFormat("en-US", {
            currency: region.currency_code,
            maximumFractionDigits,
            minimumFractionDigits,
          }).format(
            computeAmount({
              amount: v.original_price,
              region: region,
              includeTaxes: false,
            })
          ) +
          " " +
          currencyCode
        const calculated_price =
          new Intl.NumberFormat("en-US", {
            currency: region.currency_code,
            maximumFractionDigits,
            minimumFractionDigits,
          }).format(
            computeAmount({
              amount: v.calculated_price,
              region: region,
              includeTaxes: false,
            })
          ) +
          " " +
          currencyCode
        return {
          ...v,
          original_price,
          calculated_price,
          product: p,
        }
      })
    })
    let rows = allvariant.map((v) => {
      return keys.map((key) => {
        if (attrmap[key] === "") {
          return ""
        }
        if (typeof attrmap[key] === "function") {
          return "" + attrmap[key](v, lang) || ""
        }
        return "" + get(v, attrmap[key], "")
      })
    })
    rows.unshift(keys)
    res.setHeader("Content-Type", "application/tsv")
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + locale + "-" + region.currency_code + ".tsv"
    )
    return res.send(json2tsv(rows))
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err)
    return res.status(500).send("Error revalidating")
  }
}
