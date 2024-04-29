import fs from "fs"
import { Page } from "../../../tina/__generated__/types"
const rootpath = "content/"
type Data = {
  type: "product" | "variant" | "collection" | "page"
  handle: string
  data: {
    productId: string
    productHandle: string
    hadnleId: string
    variantHandle: string
    collectionid: string
    collectionHandle: string
  }
}
export const getPagePath = (slug: string, locale: string) =>
  `${rootpath}page/${locale}/_${slug}.json`
export const getProductPath = (slug: string, locale: string) =>
  `${rootpath}product/${locale}/${slug}.json`
const getTinaDataByPath = async (path: string) => {
  return await new Promise<
    Page & {
      data: Data
    }
  >((res, rej) => {
    try {
      fs.stat(path, async function (err, stat) {
        if (err == null) {
          fs.readFile(path, function (err, data) {
            if (err) {
              rej(err)
            } else {
              let page = JSON.parse(data.toString())
              page.data = JSON.parse(page.JSON)
              res(page)
            }
          })
        } else {
          rej(err)
        }
      })
    } catch (error) {
      rej(error)
    }
  })
}

export const getTinaPage = async ({
  slug,
  locale,
}: {
  slug: string
  locale: string
}): Promise<
  Page & {
    data: Data
  }
> => {
  const path = getPagePath(slug, "en")
  return await getTinaDataByPath(path)
}
export const getTinaProduct = async ({
  slug,
  locale,
}: {
  slug: string
  locale: string
}): Promise<
  Page & {
    data: Data
  }
> => {
  const path = getProductPath(slug, locale)
  return await getTinaDataByPath(path)
}

export async function listAllProductHanles() {
  const path = rootpath + `product/en/`
  //passsing directoryPath and callback function
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (err, files) {
      //handling error
      if (err) {
        reject("Unable to scan directory: " + err)
      }
      //listing all files using forEach
      resolve(files.map((file) => file.replace("_", "").replace(".json", "")))
    })
  })
}
export async function listAllHandles() {
  const path = rootpath + `page/en/`
  //passsing directoryPath and callback function
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (err, files) {
      //handling error
      if (err) {
        reject("Unable to scan directory: " + err)
      }
      //listing all files using forEach
      resolve(files.map((file) => file.replace("_", "").replace(".json", "")))
    })
  })
}
