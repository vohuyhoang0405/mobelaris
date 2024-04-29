import { medusaServerClient } from "@lib/config.server"
import { translateAndSave } from "@lib/translation"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { Product } from "@medusajs/medusa"
import { localsMap } from "@shop/i18n"
import fs from "fs"
import { uniq } from "lodash-es"
import type { NextApiRequest, NextApiResponse } from "next"
const rootpath = "content/page/"
type PageType = {
  title: string
  body: string
  slug: string
  JSON: string
}
const createPage = async ({
  page,
  rootpath,
}: {
  page: PageType
  rootpath: string
}) => {
  return new Promise((res, rej) => {
    if (!fs.existsSync(rootpath)) {
      fs.mkdirSync(rootpath)
    }
    const path =
      rootpath + encodeURIComponent(page.slug.replaceAll("/", "_")) + ".json"
    fs.stat(path, async function (err, stat) {
      if (err == null) {
        console.log("File exists: " + path)
      } else if (err.code === "ENOENT") {
        // file does not exist

        var stream = fs.createWriteStream(path)
        stream.once("open", function (fd) {
          stream.write(JSON.stringify(page, null, 2))
          stream.end()
        })
        console.log("New file: " + path)
      } else {
        console.log("Some other error: ", err.code)
      }
    })
  }).catch((err) => {
    console.log("err", err)
  })
}
type ResponseData = {
  data?: any
  time: number
  error?: string | null
}
type Data = {
  type: "product" | "variant" | "collection" | "page"
  handle: string
  data?: any
}
const createPageData = ({
  slug,
  title,
  body,
  data,
}: Omit<PageType, "JSON"> & { data: Data }) => {
  return {
    slug,
    title,
    body,
    JSON: JSON.stringify(data, null, 2),
  }
}

export default async function createPages(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Check for secret to confirm this is a valid request
  try {
    let start = Date.now()
    const urls: string[] = []
    const errors: string[] = []
    const products = await medusaServerClient.products
      .list({ limit: 9999 })
      .then(({ products }) => products)
    console.log("products", products.length)
    uniq(localsMap.map((item) => item.langCode)).forEach(async (langCode) => {
      console.log("locale", langCode)
      if (langCode === "en") {
        products.forEach(async (p: Product) => {
          try {
            const url = "/" + langCode + "/" + p.handle
            urls.push(url)
            console.log("url", url)
            const product = p
            await createPage({
              rootpath: "content/product/" + langCode + "/",
              page: createPageData({
                slug: "" + product.handle,
                title: product.title,
                body: String(removeHTMLTags(p.metadata?.description_1 || "")),
                data: {
                  type: "product",
                  handle: String(product.handle),
                  data: product,
                },
              }),
            })
          } catch (error) {
            errors.push(error)
          }
        })
      } else {
        products.forEach(async (p: Product) => {
          try {
            const url = "/" + langCode + "/" + p.handle
            urls.push(url)
            console.log("url", url)
            const product = p

            let translations = await translateAndSave({
              langCode,
              resources: [
                {
                  key: "product.title",
                  value: product.title,
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
            await createPage({
              rootpath: "content/product/" + langCode + "/",
              page: createPageData({
                slug: "" + product.handle,
                title: product.title,
                body: String(removeHTMLTags(p.metadata?.description_1 || "")),
                data: {
                  type: "product",
                  handle: String(product.handle),
                  data: product,
                  translations,
                },
              }),
            })
            await new Promise((r) => setTimeout(r, 300))
          } catch (error) {
            errors.push(error)
          }
        })
      }
    })
    res.send({ data: urls, time: Date.now() - start, errors })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ error: err.message })
  }
}
