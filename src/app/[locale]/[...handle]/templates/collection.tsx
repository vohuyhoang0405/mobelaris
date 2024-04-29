import { medusaServerClient } from "@lib/config.server"
import { SITE_URL } from "@lib/constants"
import { translateAndSave } from "@lib/translation"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { createAlternates } from "@shop/store.config"
import {
  GTagEventColleftionPageView,
  GTagEventEnterPage,
} from "app/components/googleTag"
import { getServerContext } from "app/helper"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { cache } from "react"
import { LangType, LocaleType } from "types/global"
import { Collection } from "types/medusa"

import { CollectionTemplateProps } from "../../collections/components/collections"

const SearchCollectionTemplate = dynamic(
  () => import("../../collections/components/collections")
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
  let collection = (await medusaServerClient.collections
    .list({ handle: [handle] })
    .then(({ collections }) => {
      return collections[0]
    })) as Collection
  if (!collection) {
    throw new Error("Collection not found " + handle)
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
    const result = await translateAndSave({
      langCode,
      resources: [
        {
          key: `${langCode}.collection.${handle}.title`,
          value: collection.title,
        },
        {
          key: `${langCode}.collection.${handle}.description`,
          value: collection.description,
        },
      ],
    })
    const translations = result.resources
    if (translations) {
      return {
        ...collection,
        title: translations[0].value || collection.title,
        description: translations[1].value || collection?.description,
      }
    }
    return collection
  }
)
const CollectionTemplate: React.FC<CollectionTemplateProps> = (props) => (
  <>
    <SearchCollectionTemplate {...props} />
    <GTagEventColleftionPageView />
    <GTagEventEnterPage type="plp" />
  </>
)
export const exacPageParams = ({
  params: { locale, handle },
}: {
  params: { locale: LocaleType; handle: string[] }
}) => {
  const slug = handle.reverse()[0]
  return [locale, slug]
}
const getPageData = cache(async function getPageData(
  locale: LocaleType,
  handle: string
) {
  const context = await getServerContext(locale)
  const collection = await getTranslatedCollection(handle, context.langCode)
  const title = collection.title
  const description = collection.description
  const url = SITE_URL + "/" + locale + "/" + handle
  const imageUrl = SITE_URL + "/images/collection/" + handle + ".jpg"

  return {
    collection,
    meta: {
      title: title,
      description: description,
      url: url,
      openGraph: {
        images: imageUrl,
      },
      alternates: createAlternates({
        currentLocale: locale,
        pathname: "/" + handle,
      }),
    },
  }
})
const getStaticProps = async ({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}) => {
  const [locale, pageId] = exacPageParams({ params })
  return await getPageData(locale as LocaleType, pageId)
}
async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}): Promise<Metadata> {
  const [locale, handle] = exacPageParams({ params })
  return (
    (await getPageData(locale as LocaleType, handle))?.meta || {
      title: handle,
    }
  )
}
const templatePage = {
  Component: CollectionTemplate,
  getStaticProps: getStaticProps,
  getStaticPaths: async () => [],
  generateMetadata,
}
export default templatePage
