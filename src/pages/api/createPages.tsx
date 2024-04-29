import { medusaServerClient } from "@lib/config.server"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { localsMap } from "@shop/store.config"
import { transformProduct } from "app/helper/product"
import fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
import { Product } from "types/medusa"
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
    const products = await medusaServerClient.products
      .list({ limit: 9999 })
      .then(({ products }) => products.map(transformProduct))
    let pages: PageType[] = []
    let locale = "en"
    products.forEach((product, index) => {
      const { handle, id, variants } = product
      localsMap.forEach(({}) => {})
      if (handle) {
        let slug = "/" + handle
        pages.push(
          createPageData({
            slug,
            title: product.title,
            body: String(product.description),
            data: {
              type: "product",
              handle,
              data: {
                productId: product.id,
                productHandle: product.handle,
              },
            },
          })
        )
      }
      variants.forEach(async (v) => {
        let { id: variantId, metadata } = v
        if (metadata?.handle) {
          let slug = "/" + metadata?.handle
          pages.push(
            createPageData({
              slug,
              title: product.title + " " + v.title,
              body: String(product.description),
              data: {
                type: "variant",
                handle: metadata.handle,
                data: {
                  productId: product.id,
                  productHandle: product.handle,
                  hadnleId: variantId,
                  variantHandle: metadata.handle,
                },
              },
            })
          )
        }
      })
    })

    const { collections } = await medusaServerClient.collections.list({
      limit: 9999,
    })
    collections.forEach(({ handle, id, title, metadata }) => {
      pages.push(
        createPageData({
          slug: "/" + handle,
          title: title,
          body: String(metadata?.description),
          data: {
            type: "collection",
            handle,
            data: {
              collectionid: id,
              collectionHandle: handle,
            },
          },
        })
      )
    })
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
            handle: product.handle,
            data: product,
          },
        }),
      })
    })
    collections.forEach(async (collection) => {
      await createPage({
        rootpath: "content/collection/" + locale + "/",
        page: createPageData({
          slug: "/" + collection.handle,
          title: collection.title,
          body: String(collection.metadata?.description),
          data: {
            type: "collection",
            handle: collection.handle,
            data: collection,
          },
        }),
      })
    })
    pages.forEach(async (page, i) => {
      console.log("pages:", `${page.slug} (${i}/${pages.length})`)
      await createPage({ page, rootpath: rootpath + locale + "/" })
    })
    res.send({ data: pages })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ error: err.message })
  }
}
