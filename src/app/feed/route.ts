// https://www.mobelaris.com/api/feed?secret=all&reg=reg_01GPSR0ZQE8DD18EVC07T5W34H
import { medusaServerClient } from "@lib/config.server"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { localsMap } from "@shop/store.config"
import { repalceImage } from "app/helper/image/loader"
import { computeAmount } from "app/helper/price"
import { get } from "lodash-es"
import { NextResponse } from "next/server"
import { cache } from "react"
import { json2tsv } from "tsv-json/dist/source"

const getScv = cache(async (regId: string) => {
  console.log({ regId })
  const { regions } = await medusaServerClient.regions.list()
  const region = regions.find((item) => item.id === regId)
  let products = await medusaServerClient.products
    .list({
      limit: 99999,
      region_id: region?.id,
      currency_code: region?.currency_code,
    })
    .then((res) => res.products)
  if (!region) {
    return NextResponse.json(
      { error: "Region not found " + regId },
      { status: 500 }
    )
  }

  const currencyCode = region.currency_code.toUpperCase()
  const countryCode = region.countries[0].iso_2.toUpperCase()
  const locale =
    localsMap.find((item) => item.countryCode === region.countries[0].iso_2)
      ?.locale || "eu"

  const attrmap = {
    id: "id",
    material: "metadata.material",
    short_title: "",
    title: (v, lang) => `${v.product.title} ${v.title}`,
    description: (v, lang) =>
      `${removeHTMLTags(v.product.metadata.description_1 || "")} `,
    link: (v, lang) =>
      v?.metadata?.handle
        ? `${process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL}/${locale}/${v.metadata.handle}`
        : `${process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL}/${locale}/${v.product.handle}?variant=${v.id}`,
    image_link: (v) =>
      repalceImage(v.metadata.images.filter(Boolean)?.[0] || ""),
    additional_image_link: (v) =>
      v.metadata.images.filter(Boolean).map(repalceImage)?.join(","),
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
    custom_label_2: countryCode,
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
          return "" + attrmap[key](v) || ""
        }
        return "" + get(v, attrmap[key], "")
      })
    })
    rows.unshift(keys)
    const res = new Response(json2tsv(rows), {
      headers: {
        "Content-Type": "application/tsv",
        "Content-Disposition": `attachment; filename=${region.name}-${region.currency_code}.tsv`,
      },
    })
    return res
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err)
    return NextResponse.json({ error: err }, { status: 500 })
  }
})
export async function GET(
  req: Request,
  { params }: { params: { regid: string } }
) {
  // Check for secret to confirm this is a valid request
  const { searchParams } = new URL(req.url)
  const regId = searchParams.get("reg") || "reg_01GPSR0ZQE8DD18EVC07T5W34H"
  const lang = searchParams.get("lang")
  console.log("feed: ", { regId, lang })
  return await getScv(regId)
}

export async function generateStaticParams() {
  return []
}
