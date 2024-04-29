import { medusaServerClient } from "@lib/config.server"
import { config } from "@shop/index"
import { unstable_cache } from "next/cache"
import Link, { LinkProps } from "next/link"
import "server-only"
import { LangType, LocaleType } from "types/global"
import { Region } from "types/medusa"
import { getDictionary } from "../[locale]/dictionaries"

export type ServerContextType = {
  config: typeof config
  locale: LocaleType
  langCode: LangType
  region: Region
  Link: (props: LinkProps) => any
  translations: { [key: string]: string }
  translate: (key: string) => string
  t: (key: string) => string
}

export const createServerContext = async (locale: LocaleType) => {
  const getRegions = async () => {
    let regions = await medusaServerClient.regions
      .list()
      .then(({ regions }) => regions)
      .catch((err) => {
        console.log(
          "error found when building",
          "await medusaServerClient.regions.list()"
        )
        return config.regions
      })
    return regions
  }

  let regions = await getRegions()
  const localsMap = config.localsMap.map((locale) => {
    const region = regions.find((reg) => {
      if (locale.locale === "eu") {
        return reg.name === "EU"
      }
      return reg.countries[0].iso_2 === locale.countryCode
    })
    return {
      ...locale,
      region,
    }
  })
  const currentLocal =
    localsMap.find((item) => item.locale === locale) || localsMap[0]
  const translations: { [key: string]: string } = await getDictionary(locale)

  const context: ServerContextType = {
    config: config,
    locale: currentLocal.locale,
    langCode: currentLocal.langCode,
    region: currentLocal.region,
    Link: function LocaleLink({ href, ...rest }: LinkProps) {
      return <Link href={"/" + locale + href} {...rest} />
    },
    translations,
  }
  return context
}

export const getServerContext = async (locale: LocaleType) => {
  let key = "server-context-" + locale
  const sctx = await unstable_cache(
    async () => {
      console.log("cached server-context", key)
      return await createServerContext(locale)
    },
    [key],
    {
      tags: ["server-context", key],
    }
  )()
  sctx.t = (string: string) => sctx.translations[string] || string
  sctx.translate = (string: string) => {
    const text = sctx.translations[string]
    if (!text) {
      // console.error(
      //   `Missing translation for ${truncate(string, { length: 10 })}`
      // )
      return string
    }
    return text
  }
  return sctx
}
