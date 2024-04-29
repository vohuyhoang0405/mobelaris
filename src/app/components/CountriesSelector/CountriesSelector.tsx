"use client"
import { localsMap } from "@shop/i18n"
import { useStore } from "app/[locale]/context/store-context"
import cookies from "cookiesjs"
import { uniq } from "lodash-es"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useT } from "../../[locale]/context/sources"

const ReactCountryFlag = dynamic(() => import("../ReactCountryFlag"))

export const CountriesSelector = () => {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/"
    const segments = pathName.split("/")
    segments[1] = locale
    return segments.join("/")
  }
  const { locale, region } = useStore()
  const currentLocal = localsMap.find((item) => item.locale === locale)
  const t = useT()
  if (locale === "uk" || locale === "en-dk") {
    return (
      <div className="group dropdown dropdown-end dropdown-hover flex">
        <div
          tabIndex={0}
          className=" !mb-0 flex flex-col items-center !font-normal"
        >
          <div className="flex h-[18px] w-[19px] content-center items-center justify-center overflow-hidden rounded-full object-cover">
            <ReactCountryFlag
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                objectFit: "cover",
              }}
              countryCode={currentLocal?.countryCode}
            />
          </div>
          <span className="mt-1 text-center text-xs uppercase leading-none">
            {uniq([currentLocal.countryCode, currentLocal?.langCode]).join("/")}
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className="group dropdown dropdown-end dropdown-hover flex">
      <div
        tabIndex={0}
        className=" !mb-0 flex flex-col items-center !font-normal"
      >
        <div className="flex h-[18px] w-[19px] content-center items-center justify-center overflow-hidden rounded-full object-cover">
          <ReactCountryFlag
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              objectFit: "cover",
            }}
            countryCode={currentLocal?.countryCode}
          />
        </div>
        <span className="mt-1 text-center text-xs uppercase leading-none">
          {uniq([currentLocal.countryCode, currentLocal?.langCode]).join("/")}
        </span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content top-full hidden w-[280px]  flex-col truncate rounded bg-base-100 p-2 py-4 shadow group-hover:flex"
      >
        {localsMap
          .filter((i) => i.show)
          ?.map((l, i) => {
            const { countryCode, langCode, locale, display_name } = l
            let name = `${display_name || countryCode + ` (${langCode})`}`
            return (
              <Link
                prefetch={false}
                onClick={(e) => {
                  cookies({ geo: 0 })
                }}
                href={redirectedPathName(locale)}
                key={i}
                title={name}
                className=" focus-inset !flex items-center justify-between gap-2 !px-3 !py-2 capitalize leading-none  hover:underline"
              >
                {t(name)}

                <div className="flex  h-[18px] w-[19px] content-center items-center justify-center overflow-hidden rounded-full object-cover">
                  <ReactCountryFlag
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                    countryCode={countryCode}
                  />
                </div>
              </Link>
            )
          })}
      </ul>
    </div>
  )
}
export default CountriesSelector
