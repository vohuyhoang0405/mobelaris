import { LangCodeType } from "@lib/TranslateAndSaveType"
import { LocaleType } from "types/global"

export const getSearchIndex = (langCode: LangCodeType, locale: LocaleType) => {
  let indexName = "products_" + langCode
  if (locale === "eu") indexName = "products_eu"
  if (locale === "de-ch") indexName = "products_ch"
  if (locale === "uk") indexName = "products_uk"
  return indexName
}
