import { medusaServerClient } from "@lib/config.server"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { Product } from "@medusajs/medusa"
import fs from "fs"
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
        // console.log("File exists: " + path)
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
  })
}
type ResponseData = {
  data?: any
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
    let locale = "en"
    const products = await medusaServerClient.products
      .list({ limit: 9999 })
      .then(({ products }) => products)

    products.forEach(async (p: Product) => {
      const product = p
      await createPage({
        rootpath: "content/product/" + locale + "/",
        page: createPageData({
          slug: "/" + product.handle,
          title: product.title,
          body: String(removeHTMLTags(p.metadata?.description_1 || "")),
          data: {
            type: "product",
            handle: String(product.handle),
            data: product,
          },
        }),
      })
    })

    res.send({ data: products.length })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ error: err.message })
  }
}
