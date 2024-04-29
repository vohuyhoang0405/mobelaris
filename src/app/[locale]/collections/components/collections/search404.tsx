"use client"
import { useT } from "app/[locale]/context/sources"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const SearchTemplate = dynamic(() => import("./search"))

export default function SearchNotFound() {
  const pathname = usePathname()
  const t = useT()
  let collectionTag = pathname?.split("/").reverse()[0]
  return (
    <>
      <SearchTemplate
        {...{
          collection: {
            title: `${t("Looking for")}: ${collectionTag?.replaceAll(
              "-",
              " "
            )}`,
          },
          collectionTag: collectionTag,
        }}
      />
    </>
  )
}
