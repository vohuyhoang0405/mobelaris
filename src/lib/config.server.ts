import Medusa from "@medusajs/medusa-js"
import { MeiliSearch } from "meilisearch"
import { LocaleType } from "types/global"
import { LangCodeType } from "./TranslateAndSaveType"
import { SEARCH_CONFIG } from "./constants"
import { getSearchIndex } from "./mellisearch"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"
const endpoint =
  process.env.NEXT_PUBLIC_SEARCH_ENDPOINT || "http://127.0.0.1:7700"

const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY || "test_key"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}
export const medusaServerClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
})
export const searchServer = new MeiliSearch({
  host: endpoint,
  apiKey: apiKey,
  httpClient: async (url, opts) => {
    const res = await fetch(url, {
      next: {
        tags: ["meilisearch", url],
      },
      ...opts,
    })
    return res.json()
  },
})

export const search = async (
  langCode: LangCodeType,
  locale: LocaleType,
  textSearch: string
) => {
  let indexName = getSearchIndex(langCode, locale)
  let exitedProductIds = {} as { [key: string]: boolean }
  return (
    await searchServer
      .index(indexName)
      .search("", {
        filter: [`tags_value="${textSearch}"`],
        ...SEARCH_CONFIG,
        limit: 12,
      })
      .catch((e) => {
        console.error(e)
        return {
          hits: [],
        }
      })
  ).hits?.filter((item) => {
    if (!exitedProductIds?.[item.handle]) {
      exitedProductIds[item.handle] = true
      return true
    }
    return false
  })
}
