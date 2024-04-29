import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { Product as MedusaProduct } from "@medusajs/medusa"
import { uniq } from "lodash"
import { Product, Region, Variant } from "types/medusa"
import { repalceImage } from "./image/loader"
import { computeAmount } from "./price"
const colorDetectString = `woods / finishes, choose colours:, woods - finishes, color, colour, fabric, choose color, choose colour, finish, wood options, choose
upholstery, upholstery, choose upholstery, upholstery, upholstery*, choose wood options, choose. finish, upholstery,
choose colours`
export const isVisibleVariant = (variant: Variant) => {
  return variant.inventory_quantity > 0 || variant.allow_backorder === true
}

export function transformProduct(product: MedusaProduct): Product {
  let options: any = product.options.map((option, i) => {
    return {
      ...option,
      position: i + 1,
      type: colorDetectString.includes(option.title.trim().toLowerCase())
        ? "color"
        : "default",
      name: option.title,
      values: uniq(option?.values?.map((value) => value?.value.trim()))
        .sort((a, b) => {
          if (a === "Natural") {
            return -1
          }
          return 1
        })
        .reverse(),
    }
  })
  const variants = product.variants.map((v) => {
    const sortedOptions = v.options
      .sort((a, b) => {
        return (
          product.options.findIndex((o) => o.id === a.option_id) -
          product.options.findIndex((o) => o.id === b.option_id)
        )
      })
      .map((o, i) => {
        return {
          ...o,
          index: Math.max(
            0,
            options[i].values.findIndex((value: string) => value === o.value)
          ),
        }
      })

    return {
      ...v,
      soldout: !isVisibleVariant(v),
      option1: sortedOptions?.[0]?.value?.trim() || null,
      option2: sortedOptions?.[1]?.value?.trim() || null,
      option3: sortedOptions?.[2]?.value?.trim() || null,
      options: sortedOptions,
      index:
        sortedOptions[0].index * 10000 +
        (sortedOptions[1]?.index || 0) * 100 +
        (sortedOptions[2]?.index || 0),
      images: (
        v?.metadata?.images
          .map((src: string) => ({
            src: repalceImage(src),
            alt: product.title + " " + "image",
          }))
          .filter(Boolean) ||
        product?.images?.map((img) => ({ ...img, src: img.url })) ||
        []
      ).filter((img: any) => Boolean(img.src)),
    }
  })
  return {
    ...product,
    description: removeHTMLTags(product?.metadata?.description_1 || ""),
    variants,
    options,
    price: {
      original_price: product.variants?.[0]?.original_price || 0,
      calculated_price: product.variants?.[0]?.calculated_price || 0,
    },
  }
}
export function transformProductWithRegion(
  product: MedusaProduct,
  region: Region
): Product {
  const formatPrice = (amount: number) => {
    return computeAmount({
      amount,
      region,
      includeTaxes: false,
    })
  }
  let options: any =
    product?.options
      .sort((a, b) => {
        if (colorDetectString.includes(a.title.trim().toLowerCase())) {
          return 1
        }
        return -1
      })
      .map((option, i) => {
        return {
          ...option,
          position: i + 1,
          type: colorDetectString.includes(option.title.trim().toLowerCase())
            ? "color"
            : "default",
          name: option.title,
          values: uniq(option?.values?.map((value) => value?.value.trim()))
            .reverse()
            .sort((a, b) => {
              if (a === "Natural") {
                return 1
              }
              return -1
            }),
        }
      }) || []
  const variants =
    product?.variants.filter(isVisibleVariant).map((v) => {
      const sortedOptions = v.options
        .sort((a, b) => {
          return (
            product.options.findIndex((o) => o.id === a.option_id) -
            product.options.findIndex((o) => o.id === b.option_id)
          )
        })
        .map((o, i) => {
          return {
            ...o,
            index: Math.max(
              0,
              options[i].values.findIndex((value: string) => value === o.value)
            ),
          }
        })

      return {
        ...v,
        displayTitle:
          product.title + " " + sortedOptions.map((o) => o.value).join(" "),
        soldout: !isVisibleVariant(v),
        option1: sortedOptions?.[0]?.value?.trim() || null,
        option2: sortedOptions?.[1]?.value?.trim() || null,
        option3: sortedOptions?.[2]?.value?.trim() || null,
        options: sortedOptions,
        index:
          sortedOptions[0].index * 10000 +
          (sortedOptions[1]?.index || 0) * 100 +
          (sortedOptions[2]?.index || 0),
        images: (
          v?.metadata?.images
            .map((src: string) => ({
              src: repalceImage(src),
              alt: product.title + " " + "image",
            }))
            .filter(Boolean) ||
          product?.images?.map((img) => ({ ...img, src: img.url })) ||
          []
        ).filter((img: any) => Boolean(img.src)),
        price_formated: {
          original_price: formatPrice(v.original_price || 0),
          calculated_price: formatPrice(v.calculated_price || 0),
        },
      }
    }) || []
  const result = {
    ...product,
    thumbnail: (product?.thumbnail && repalceImage(product?.thumbnail)) || "",
    images:
      product?.images?.map((img) => ({ ...img, url: repalceImage(img.url) })) ||
      [],
    description: removeHTMLTags(product?.metadata?.description_1 || ""),
    variants,
    options,
    price: {
      original_price: product.variants?.[0]?.original_price || 0,
      calculated_price: product.variants?.[0]?.calculated_price || 0,
    },
    price_formated: {
      original_price: formatPrice(product.variants?.[0]?.original_price || 0),
      calculated_price: formatPrice(
        product.variants?.[0]?.calculated_price || 0
      ),
    },
  }
  return result
}
export const getVariantLeadtime = (
  variant: Variant,
  product: Product,
  langCode: string
) => {
  if (!product?.translations) {
    return variant?.metadata?.leadtime
  }
  const key = `variant.${variant.id}.metadata.leadtime`
  let result = product?.translations?.find((item) =>
    (item.key as string)?.includes(key)
  )?.value
  if (!result) {
    console.error(key, "not found.")

    return variant?.metadata?.leadtime
  }
  return result
}
export const getVariantUpsellLeadtime = (variant: Variant) => {
  return variant?.metadata?.upsell_lead_time
}
export const getInspiredOf = (product: Product) => {
  return product?.metadata.inspiredOf
}

export const getInspiredOfInformation = (product: Product) => {
  return (
    product?.inspiredOfInformation || product?.metadata?.inspiredOfInformation
  )
}
