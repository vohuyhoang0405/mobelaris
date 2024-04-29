import { medusaServerClient } from "@lib/config.server"
import { translateAndSave } from "@lib/translation"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { Product } from "@medusajs/medusa"
import { localsMap } from "@shop/store.config"
import { repalceImage } from "app/helper/image/loader"
import { computeAmount } from "app/helper/price"
import { get } from "lodash-es"
import { NextResponse } from "next/server"
import { cache } from "react"
import { json2tsv } from "tsv-json/dist/source"
import { Variant } from "types/medusa"
type V = Variant & {
  product: Product
}
const getScv = cache(async (regId: string, supfix?: string) => {
  console.log({ regId })
  const { regions } = await medusaServerClient.regions.list()
  const region = regions.find((item) => item.id === regId)
  let products = await medusaServerClient.products
    .list({
      limit: 9999,
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
  const countryCode = region.countries?.[0]?.iso_2.toUpperCase()
  const { locale, langCode } = localsMap.find(
    (item) => item.countryCode === region.countries?.[0]?.iso_2
  ) || { locale: "eu", langCode: "en" }

  const attrmap = {
    ID: "sku",
    "Item title": (v: V) =>
      `${
        v.translations.find((item) => item.key === "product.title")?.value ||
        v.product.title
      } - ${
        v.translations.find((item) => item.key === `variant.${v.id}.title`)
          ?.value || v.title
      }`,
    "Final URL": (v: V) =>
      v?.metadata?.handle
        ? `${process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL}/${supfix || locale}/${
            v.metadata.handle
          }`
        : `${process.env.NEXT_PUBLIC_MEDUSA_FRONTEND_URL}/${locale}/${v.product.handle}?variant=${v.id}`,
    "Image URL": (v: V) =>
      repalceImage(v.metadata.images.filter(Boolean)?.[0] || ""),
    "Item subtitle": (v: V) =>
      `${
        v.translations.find((item) => item.key === "product.title")?.value ||
        v.product.title
      } - ${
        v.translations.find((item) => item.key === `variant.${v.id}.title`)
          ?.value || v.title
      }`,
    "Item description": (v: V) =>
      removeHTMLTags(
        String(
          v.translations.find((item) => item.key === "metadata.description_1")
            ?.value || v.product.metadata?.description_1
        )
      ) || "",
    "Item category": "product.metadata.google_product_category",
    Price: "original_price",
    "Sale price": "calculated_price",
  }
  const keys = Object.keys(attrmap)
  try {
    let allvariant = (
      await Promise.all(
        products.flatMap(async (p) => {
          const product = p
          let translations: {
            key: string
            value: string
          }[] = []
          const { maximumFractionDigits, minimumFractionDigits } =
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: region.currency_code,
            }).resolvedOptions()
          if (langCode !== "en") {
            translations = (
              await translateAndSave({
                langCode,
                resources: [
                  {
                    key: "product.title",
                    value: product.title,
                  },
                  {
                    key: `metadata.description`,
                    value: product?.metadata?.description,
                  },
                  {
                    key: `metadata.description_1`,
                    value: product.metadata?.description_1,
                  },
                  ...(function getVariantsResources(product: Product) {
                    return product.variants
                      .flatMap((variant) => {
                        return [
                          {
                            key: `variant.${variant.id}.title`,
                            value: variant.title as string,
                          },
                        ]
                      })
                      .filter((item) => item.value)
                  })(product),
                ],
              })
            ).resources
          }
          return p.variants.map((v) => {
            const original_price =
              computeAmount({
                amount: v.original_price,
                region: region,
                includeTaxes: false,
              }) +
              " " +
              currencyCode
            const calculated_price =
              computeAmount({
                amount: v.calculated_price,
                region: region,
                includeTaxes: false,
              }) +
              " " +
              currencyCode
            return {
              ...v,
              original_price,
              calculated_price,
              product: p,
              translations,
            }
          })
        })
      )
    ).flatMap((item) => item)
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
  { params }: { params: { handle: [regid: string, locale: string] } }
) {
  // Check for secret to confirm this is a valid request
  const [regId, locale] = params.handle
  return await getScv(regId, locale)
}

export async function generateStaticParams() {
  // const { regions } = await medusaServerClient.regions.list();
  // return regions.map((reg) => ({
  //   regid: reg.id,
  // }));
  return []
}
export const revalidate = 86400
