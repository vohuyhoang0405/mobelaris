import { SITE_URL } from "@lib/constants"
import { translateAndSave } from "@lib/translation"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { localsMap } from "@shop/i18n"
import { createAlternates } from "@shop/store.config"
import Container from "app/components/Container"
import { Metadata } from "next"
import { unstable_cache } from "next/cache"
import { cache } from "react"
import { LocaleType } from "types/global"
import { getPost } from "../utils"

const getPostData = cache(async (handle: string, locale: LocaleType) => {
  let currentLocal = localsMap.find((local) => local.locale === locale)
  let key = `shop://${currentLocal?.langCode}/blog/post/${handle}`
  const result = await unstable_cache(
    async () => {
      if (currentLocal?.langCode === "en") {
        const res = await getPost(handle)
        const post = res.data.post
        return {
          title: post.title || "",
          content: post.content || "",
          excerpt: removeHTMLTags(post.excerpt || ""),
          thumbnail: post.featuredImage?.node?.sourceUrl || "",
        }
      }
      const pageContent = (await getPostData(handle, "en")) as {
        title: string
        content: string
        excerpt: string
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
      let e = resources.find((item) => item.key === key + ".content")?.value
      return {
        ...pageContent,
        title: title || "",
        content: content || "",
      }
    },
    [key],
    {
      rerevalidate: false,
    }
  )()
  return result
})

export async function generatePageMetadata(
  handle: string,
  locale: LocaleType
): Promise<Metadata> {
  const {
    title,
    excerpt: description,
    thumbnail,
  } = await getPostData(handle, locale)
  const pathname = "/mobelarisblog/" + handle
  let url = SITE_URL + "/" + locale + pathname
  let images = thumbnail
    ? [
        {
          url: thumbnail,
          width: 800,
          height: 600,
          alt: title,
        },
      ].filter(Boolean)
    : []
  return {
    title,
    description,
    twitter: {
      title: title,
      description: description,
      images,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      images,
    },
    alternates: createAlternates({
      currentLocale: locale,
      pathname,
    }),
  }
}
async function Page({
  params,
}: {
  params: { locale: LocaleType; handle: string }
}) {
  const post = await getPostData(params.handle, params.locale)
  return (
    <div className="space-y-6">
      <div className="section-title span-12 flex items-center justify-center bg-[#f4f4f4] py-12 text-center">
        <Container>
          <h1 className="text-2xl">{post.title}</h1>
        </Container>
      </div>
      <Container>
        <div
          className="prose mx-auto max-w-3xl prose-a:text-sale prose-img:mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        ></div>
      </Container>
    </div>
  )
}
export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; handle: string }
}): Promise<Metadata> {
  return await generatePageMetadata(params.handle, params.locale)
}
export default Page
