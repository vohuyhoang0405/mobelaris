import { LangCodeType } from "@lib/TranslateAndSaveType"
import { medusaServerClient, searchServer } from "@lib/config.server"
import { SEARCH_CONFIG } from "@lib/constants"
import { transObject, translateAndSave } from "@lib/translation"
import { Product } from "@medusajs/medusa"
import { getServerContext } from "app/helper"
import { transformProductWithRegion } from "app/helper/product"
import { LocaleType } from "types/global"
import { Region } from "types/medusa"
import camaleonda from "./images/Camaleonda.png"
import bg from "./images/hero-bg.jpg"
let defaultData = {
  hero: {
    title: "Camaleonda Style Sofa Set",
    image:
      "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/c/a/camaleonda_sofa_set_velvet_dark_red_05_1_2.png",
    background: bg,
    description:
      "Mobelaris Camaleonda Style Sofa Set is a high-quality reproduction of a classic piece by world-renowned Italian architect and designer, Mario Bellini. If you want comfort in a masterpiece, this sofa is a match made in furniture heaven.",
    description_2: "Inspired by: Mobelaris",
    tabs: ["DESCRIPTION", "DIMENSION", "FAQs"],
  },
  products: {
    title:
      "Available online in 7 colors made completely from high-quality polyurethane foam.",
    items: [],
  },
  productInspiration: {
    quote: {
      header: {
        h3: "THE COMEBACK OF THE MID-CENTURY CLASSIC",
      },
      content: {
        p: `The Camaleonda Style Sofa has made a comeback with several famous celebrities spotted with similar sets in their homes. If you want this trendy classic, the Mobelaris reproduction is fit for your needs.

        Our Camaleonda Style Sofa is made completely from high-quality polyurethane foam and upholstered in rich fabric. The set includes a lounge chair, a corner sofa with a left armrest, and an ottoman with a right armrest. It comes in a variety of neutral colours to make sure the set blends perfectly with any interior design.
        
        It features the signature curved outline and pleated upholstery from the cult classic, making it not just a photogenic sofa, but an ultra-comfortable one as well.
        
        Let the worries of the day wash away as you sink into the comfort of this beautiful piece. Order your own Camaleonda Style Sofa straight to your doorstep today.`,
      },
    },
    "product-image": {
      img: {
        src: "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/c/a/camaleonda_sofa_set_velvet_dark_red_01_1_2.png",
        alt: "product-specification-image",
      },
    },
    images: [],
  },
  infomation: {
    product_specification: {
      title: "Product specification",
      content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Frame:</p> Polyurethane Foam</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Style:</p> Mid Century Classic</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Upholstery:</p> Velvet, Alcantara, Boucle Fabric</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Warranty:</p> 5 Years</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Special:</p> Reproduced As Per Original</li></ul></td><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Assembly:</p> Fully Assembled</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Instructions:</p> Applicable</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Clean:</p> Dust / Light Vacuum</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Complement with Camaleonda Ottoman and Corner Sofa</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Create Your Personal Comfort</li></ul></td></tr></tbody></table>`,
    },
    product_information: {
      title: "PRODUCT INFORMATION",
      content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Dimension:</p> Please See Individual Products</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Packing Dimension:</p> Individually Packed Per Product</li></ul></td></tr></tbody></table>`,
    },
    image: camaleonda,
  },
  video: {
    url: "https://fast.wistia.net/embed/iframe/js7quqbrtp?videoFoam=true",
  },
  faqs: {
    title: "CAMALEONDA STYLE SOFA - FAQS",
    description:
      "Find answers for common questions about Camaleonda Style Sofa Set",
    questions: [
      {
        question: "Can the arms of the Camaleonda Style Sofas be detached?",
        answer:
          "Yes, the arms are detachable which is one of the main characteristics of this design.",
      },
      {
        question: "How do you care for the Camaleonda Style Sofa?",
        answer:
          "You can do daily dusting and light vacuuming on the Camaleonda Style Sofas to maintain them.",
      },
      {
        question: "Are Camaleonda Style Sofas comfortable?",
        answer:
          "Yes, they are super comfortable as they are made from high-quality foam, and the wave design of the Camaleonda Sofa was made so the chair adjusts to the environment and contours around the weight of the seater.",
      },
      {
        question: "What is the Camaleonda Style Sofa made from?",
        answer:
          "Our Camaleonda Sofa is made from high-quality polyurethane foam and upholstered in premium fabric.",
      },
      {
        question: "Do you sell the Camaleonda Style Sofa Sofa in sets?",
        answer:
          "We sell them separately so you can mix and match your Camaleonda Style set to fit your space. Click [here](https://www.mobelaris.com/en/search/?q=camaleonda) to browse and pick Camaleonda Sofas.",
      },
      {
        question: "Does it come with a warranty?",
        answer: "Yes, our Camaleonda Style Sofas come with 5 years warranty.",
      },
    ],
  },
  "related-products": {
    title: "Related Products",
    items: [
      {
        title: "Wishbone (Y) Chair - CH24 - Orange - Natural Cord",
        image:
          "https://static.mobelaris.com/media/catalog/product/resize_img//5/a/5aa00fe87fe70_1_1.jpg",
        url: "/orange-style-wishbone-y-chair-hans-wegner-natural-cord",
        price: {
          from: "£139.50",
          regular: "£279.00",
        },
      },
      {
        title: "Wishbone (Y) Chair - CH24 - Soaped Oak - Black Cord",
        image:
          "https://static.mobelaris.com/media/catalog/product/resize_img//w/i/wishbone_soap_black_02.png",
        url: "/soaped-oak-natural-cord-wishbone-y-chair-hans-wegner-1",
        price: {
          from: "£224.50",
          regular: "£449.00",
        },
      },
      {
        title: "Wishbone (Y) Chair - CH24 - Purple - Natural Cord",
        image:
          "https://static.mobelaris.com/media/catalog/product/resize_img//5/a/5aa00fe88068d_1.jpg",
        url: "/purple-style-wishbone-y-chair-hans-wegner-natural-cord",
        price: {
          from: "£111.60",
          regular: "£279.00",
        },
      },
    ],
  },
}
export type PageData = typeof defaultData

const fetchProduct = async (handle: string, region: Region) => {
  let product = await medusaServerClient.products
    .list({
      handle,
      region_id: region.id,
      currency_code: region.currency_code,
    })
    .then(({ products }) => {
      return transformProductWithRegion(products[0], region)
    })
    .catch((err) => {
      console.error("error found when building " + handle + " product page")
      return null
    })
  return product
}
const getTranslatedProduct = async (
  handle: string,
  region: Region,
  langCode: LangCodeType
) => {
  const product = await fetchProduct(handle, region)
  if (!product) {
    return null
  }
  if (langCode === "en") {
    return product
  }

  let translations = await translateAndSave({
    langCode,
    resources: [
      {
        key: product.title,
        value: product.title,
      },
      {
        key: product.description || "",
        value: product.description || "",
      },
      {
        key: `metadata.description`,
        value: product.metadata.description,
      },
      {
        key: `metadata.description_1`,
        value: product.metadata.description_1,
      },
      {
        key: `metadata.description_2`,
        value: product.metadata.description_2,
      },
      {
        key: `metadata.product_information`,
        value: product.metadata.product_information,
      },
      {
        key: `metadata.inspiredOfInformation`,
        value: product.metadata?.inspiredOfInformation || "",
      },
      ...(function getVariantsResources(product: Product) {
        return product.variants
          .flatMap((variant) => {
            return [
              {
                key: `variant.${variant.id}.metadata.leadtime`,
                value: variant.metadata.leadtime as string,
              },
            ]
          })
          .filter((item) => item.value)
      })(product),
    ],
  })
  return {
    ...product,
    inspiredOf: String(product.metadata.inspiredOf),
    inspiredOfInformation: String(translations?.[6]?.value),
    title: translations.resources?.[0]?.value || product.title,
    description: translations.resources?.[1]?.value || product.description,
    metadata: {
      ...product.metadata,
      description:
        translations.resources?.[2]?.value || product.metadata.description,
      description_1:
        translations.resources?.[3]?.value || product.metadata.description_1,
      description_2:
        translations.resources?.[4]?.value || product.metadata.description_2,
      product_information:
        translations.resources?.[5]?.value ||
        product.metadata.product_information,
    },
    en: {
      title: product.title,
      description: product.description,
    },
    translations: translations.resources,
  }
}
export const createGetPageData = async (
  locale: LocaleType,
  page: {
    handle: string
    tags_value?: string
    defaultData: Page
  }
) => {
  const { handle, defaultData, tags_value } = page
  const context = await getServerContext(locale)
  const product = await getTranslatedProduct(
    handle,
    context.region,
    context.langCode
  )
  let exited = {}
  let products = []
  if (page.tags_value) {
    products = (
      await searchServer
        .index("products_" + context.langCode)
        .search("", {
          filter: [`tags_value="${tags_value}"`],
          ...SEARCH_CONFIG,
          limit: 24,
        })
        .catch((e) => {
          console.error("error when building page handle", handle)
          return {
            hits: [],
          }
        })
    ).hits?.filter((item) => {
      if (exited[item.handle]) {
        return false
      }
      exited[item.handle] = true
      return true
    })
  }

  const data: PageData = defaultData
  const trans = await transObject(
    { page: data },
    [
      "title",
      "content",
      "description",
      "description_2",
      "h4",
      "h3",
      "p",
      "question",
      "answer",
    ],
    context.langCode
  )
  const dictionaries = trans.resources.reduce(
    (acc: { [key: string]: string }, item) => {
      acc[item.key] = item.value
      return acc
    },
    {}
  )
  const t = (key: string) => dictionaries[key] || key
  return {
    data,
    trans,
    product,
    products,
    t,
  }
}
