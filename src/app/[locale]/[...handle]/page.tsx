import { medusaServerClient } from "@lib/config.server"
import { getTinaPage, listAllHandles } from "@lib/tina/utils"
import { createAlternates, locales } from "@shop/store.config"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { LocaleType } from "types/global"
import CollectionTemplate from "./templates/collection"
import PageTemplate from "./templates/page-page"
import ProductTemplate from "./templates/product"

async function Page({
  params: { locale, handle },
  searchParams: { variant },
}: {
  params: { locale: LocaleType; handle: string[] }
  searchParams: {
    variant?: string
  }
}) {
  // console.log("app\[locale]\[...handle]\page.tsx", locale, handle)
  const page = await getPageData(locale, handle.join(","))
  if (page?.redirect) {
    return redirect(page.redirect.destination)
  }
  if (page) {
    return page.page
  }
  return notFound()
}
const limit = Number(process.env.LIMIT) || 1
export async function generateStaticParams() {
  if (limit === 1) {
    let paths = [
      {
        slug: "style-wishbone-y-chair-hans-wegner",
      },
    ].flatMap(({ slug }) => {
      return locales.map((locale) => ({
        locale,
        handle: [slug],
      }))
    })
    process.env.BUILD_ALL_COLLECTIONS &&
      (
        await medusaServerClient.collections
          .list({
            limit: 9999,
          })
          .then((res) => res.collections)
      ).forEach((col) => {
        locales.forEach((locale) => {
          paths.push({
            locale,
            handle: [col.handle],
          })
        })
      })
    return paths
  }
  const allHandles = (await listAllHandles()) as string[]
  return allHandles.flatMap((slug) => {
    return locales.map((locale) => ({
      locale,
      handle: [slug],
    }))
  })
}
const getPageData = async function getPageData(
  locale: LocaleType,
  handles: string,
  variant?: string
) {
  const handle = handles.split(",").reverse()[0]
  try {
    const page = await PageTemplate.getStaticProps({
      params: {
        locale,
        handle: [handle, variant],
      },
    })
    if (page) {
      return {
        page: (
          <PageTemplate.Component
            {...{
              title: page.title,
              content: page.content,
            }}
          />
        ),
        meta: page.meta,
      }
    }
    const pageData = await getTinaPage({
      slug: handle,
      locale,
    })
    let pageType = pageData?.data.type
    if (pageType === "variant") {
      const res = await ProductTemplate.getStaticProps({
        params: {
          locale,
          handle: [
            pageData.data.data.productHandle,
            pageData.data.data.hadnleId,
          ],
        },
      })
      if (res?.product) {
        console.log("res", pageData.data.data, res)
        const { product, variant, meta, ...rest } = res
        return {
          page: (
            <ProductTemplate.Component
              {...{
                product,
                variant,
                variantId: variant?.id,
                meta,
                ...rest,
              }}
            />
          ),
          meta,
        }
      }
    }
    if (pageType === "product") {
      const res = await ProductTemplate.getStaticProps({
        params: {
          locale,
          handle: [
            pageData.data.data.productHandle,
            pageData.data.data.hadnleId,
          ],
        },
      })
      if (res?.product) {
        const { product, variant, meta, ...rest } = res
        return {
          page: (
            <ProductTemplate.Component
              {...{
                product,
                variant,
                variantId: variant?.id,
                meta,
                ...rest,
              }}
            />
          ),
          meta,
        }
      }
    }
    if (pageType === "collection") {
      const { collection, meta } = await CollectionTemplate.getStaticProps({
        params: {
          locale,
          handle: [handle],
        },
      })
      return {
        page: (
          <CollectionTemplate.Component
            {...{
              collection,
              collectionTag: collection.searchTag,
              handle: collection.handle,
            }}
          />
        ),
        meta,
      }
    }
  } catch (error) {
    console.log("path not found 0", locale, handle)
  }
  const res = await ProductTemplate.getStaticProps({
    params: { locale, handle: [handle, variant] },
  })
  if (res?.product) {
    const { product, meta, ...rest } = res
    return {
      page: (
        <ProductTemplate.Component
          {...{
            product,
            variantId: variant,
            meta,
            ...rest,
          }}
        />
      ),
      meta,
    }
  }
  try {
    const collectionPageResult = await CollectionTemplate.getStaticProps({
      params: { locale, handle: [handle] },
    })
    if (collectionPageResult.collection) {
      const { collection, meta } = collectionPageResult
      return {
        page: (
          <CollectionTemplate.Component
            {...{
              collection,
              collectionTag: collection.searchTag,
              handle: collection.handle,
            }}
          />
        ),
        meta,
      }
    }
  } catch (error) {
    console.log("path not found 1", locale, handle)
    return null
  }

  console.log("path not found 2", locale, handle)
  return null
}

export async function generateMetadata({
  params: { handle, locale },
}: {
  params: { locale: LocaleType; handle: string[] }
}): Promise<Metadata> {
  try {
    const page = await getPageData(locale, handle.join(","))
    if (page?.redirect) {
      return {}
    }
    if (page) {
      return {
        ...page.meta,
        alternates: createAlternates({
          currentLocale: locale,
          pathname: "/" + handle.join("/"),
        }),
      }
    }

    return { title: handle[0] }
  } catch (error) {
    return {
      alternates: createAlternates({
        currentLocale: locale,
        pathname: "/" + handle.join("/"),
      }),
    }
  }
}
export default Page

export const dynamic = "force-dynamic"
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export const revalidate = false
// false | 'force-cache' | 0 | number
