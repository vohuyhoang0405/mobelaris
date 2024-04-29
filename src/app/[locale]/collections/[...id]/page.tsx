import { medusaServerClient } from "@lib/config.server"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { SourcesProvider } from "app/[locale]/context/sources"
import { getServerContext } from "app/helper"
import capitalize from "lodash-es/capitalize"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { cache } from "react"
import { LangType, LocaleType } from "types/global"
import { Collection } from "types/medusa"

const SearchCollectionTemplate = dynamic(
  () => import("../components/collections")
)

const defaultlimit = Number(process.env.LIMIT) || 1
const getCollectionIds = cache(
  async (limit: number = defaultlimit): Promise<string[]> => {
    const data = await medusaServerClient.collections
      .list({ limit })
      .then(({ collections }) => {
        return collections.map(({ handle }) => handle)
      })
    return data
  }
)
function transformCollection(collection: Collection) {
  return {
    ...collection,
    searchTag: collection.title,
    description: removeHTMLTags(
      collection?.metadata?.description || collection?.description || ""
    ),
  }
}

const fetchCollection = async (handle: string) => {
  let collection = await medusaServerClient.collections
    .list({ handle: [handle] })
    .then(({ collections }) => {
      return collections[0]
    })
  if (!collection) {
    collection = {
      id: handle,
      searchTag: handle,
      handle: handle,
      title: capitalize(handle.replaceAll("_", "")),
    }
  }
  const transformedCollection = transformCollection(collection)
  return transformedCollection
}
const getTranslatedCollection = cache(
  async (handle: string, langCode: LangType) => {
    const collection = await fetchCollection(handle)
    if (langCode === "en") {
      return collection
    }
    // const result = await translateAndSave({
    //   langCode,
    //   resources: [
    //     {
    //       key: `${langCode}.collection.${handle}.title`,
    //       value: collection.title,
    //     },
    //     {
    //       key: `${langCode}.collection.${handle}.description`,
    //       value: collection.description,
    //     },
    //   ],
    // })
    // const translations = result.resources
    // if (translations) {
    //   return {
    //     ...collection,
    //     title: translations[0].value || collection.title,
    //     description: translations[1].value || collection?.description,
    //   }
    // }
    return collection
  }
)

async function Page({
  params,
}: {
  params: { locale: LocaleType; id: string[] }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const handle = params.id.reverse()[0]
  const context = await getServerContext(params.locale)
  const collection = await getTranslatedCollection(handle, context.langCode)
  return (
    <SourcesProvider value={{}} name="collection">
      <SearchCollectionTemplate
        {...{
          collection,
          collectionTag: handle,
          handle,
        }}
      />
    </SourcesProvider>
  )
}
export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; id: string[] }
}): Promise<Metadata> {
  const handle = params.id.reverse()[0]
  const context = await getServerContext(params.locale)
  const collection = await getTranslatedCollection(handle, context.langCode)
  return { title: collection.title, description: collection.description }
}
export async function generateStaticParams() {
  return []
}

export default Page
