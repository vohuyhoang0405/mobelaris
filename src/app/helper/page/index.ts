import { translateAndSave } from "@lib/translation"
import { localsMap } from "@shop/i18n"
import { createAlternates } from "@shop/store.config"
import { getPage } from "app/[locale]/[...handle]/utils"
import { Metadata } from "next"
import { unstable_cache } from "next/cache"
import { cache } from "react"
import { LocaleType } from "types/global"

export const getPageData = cache(async (handle: string, locale: LocaleType) => {
  let currentLocal = localsMap.find((local) => local.locale === locale)
  let key = `shop://${currentLocal?.langCode}/page.${handle}`
  const result = await unstable_cache(
    async () => {
      console.log("cached", key)

      if (currentLocal?.langCode === "en") {
        const { content, title } = (await getPage(handle)).data.cmsPage
        return {
          title: title,
          content: content,
        }
      }
      const pageContent = (await getPageData(handle, "en")) as {
        title: string
        content: string
      }
      if (!currentLocal) currentLocal = localsMap[0]
      const { resources } = await translateAndSave({
        resources: [
          {
            key: key + ".title",
            value: pageContent.title,
          },
          {
            key: key + ".content",
            value: pageContent.content,
          },
        ],
        langCode: currentLocal.langCode,
      })
      let title = resources.find((item) => item.key === key + ".title")?.value
      let content = resources.find(
        (item) => item.key === key + ".content"
      )?.value
      return {
        title: title,
        content: content,
      }
    },
    [key],
    {}
  )()
  return result
})

export async function generatePageMetadata(
  handle: string,
  locale: LocaleType
): Promise<Metadata> {
  const { title } = await getPageData(handle, locale)
  const pathname = "/" + handle
  return {
    title,
    alternates: createAlternates({
      currentLocale: locale,
      pathname,
    }),
  }
}
