import { createAlternates, locales } from "@shop/store.config"
import Container from "app/components/Container"
import { GTagEventEnterPage } from "app/components/googleTag"
import Prose from "app/components/prose"
import { getPageData } from "app/helper/page"
import { Metadata } from "next"
import { cache } from "react"
import { LocaleType } from "types/global"

const pageHandles = [
  {
    type: "page",
    handle: "refunds-and-returns",
  },
  {
    type: "page",
    handle: "contact-us",
  },
  {
    type: "page",
    handle: "about",
  },
  {
    type: "page",
    handle: "term-and-condition",
  },
  {
    type: "page",
    handle: "privacy-policy",
  },

  {
    type: "page",
    handle: "faq",
  },
  {
    type: "page",
    handle: "transparency-policy",
  },

  {
    type: "page",
    handle: "photocontest",
  },
  {
    type: "page",
    handle: "ethical-trading-policy",
  },
  {
    type: "page",
    handle: "sign-up-today",
  },
  {
    type: "page",
    handle: "30",
  },
  {
    type: "page",
    handle: "trade",
  },
  {
    type: "page",
    handle: "account",
  },
  {
    type: "page",
    handle: "ordertracking",
  },
  {
    type: "page",
    handle: "wishlist",
  },
  {
    type: "page",
    handle: "cart",
  },
  {
    type: "page",
    handle: "checkout",
  },
  {
    type: "page",
    handle: "promo-offer",
  },
  {
    type: "page",
    handle: "terms-conditions",
  },
  {
    type: "page",
    handle: "privacy-policy",
  },
]
const getData = cache(async function (locale: LocaleType, pageId: string) {
  if (pageHandles.find((item) => item.handle === pageId)) {
    const { title, content } = await getPageData(pageId, locale)
    const handle = pageId
    const pathname = "/" + handle
    return {
      title: title,
      content: content,
      meta: {
        title: title,
        alternates: createAlternates({
          currentLocale: locale,
          pathname,
        }),
      },
    }
  }
  return null
})
const getStaticProps = async ({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}) => {
  const [locale, pageId] = exacPageParams({ params })
  return await getData(locale as LocaleType, pageId)
}

function PageTemplate({ title, content }: { title: string; content: string }) {
  return (
    <div className="space-y-6">
      <div className="section-title span-12 flex items-center justify-center bg-[#f4f4f4] py-12 text-center">
        <Container>
          <h1 className="text-2xl uppercase">{title}</h1>
        </Container>
      </div>
      <Container>
        <Prose>
          <div
            className="prose mx-auto max-w-none prose-a:text-sale prose-img:mx-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </Prose>
      </Container>
      <GTagEventEnterPage type="undefined" />
    </div>
  )
}
async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}): Promise<Metadata> {
  const [locale, pageId] = exacPageParams({ params })
  return (
    (await getData(locale as LocaleType, pageId))?.meta || {
      title: pageId,
    }
  )
}
export const exacPageParams = ({
  params: { locale, handle },
}: {
  params: { locale: LocaleType; handle: string[] }
}) => {
  return [locale, ...handle]
}
const templatePage = {
  Component: PageTemplate,
  getStaticProps: getStaticProps,
  getStaticPaths: async () => {
    return locales.flatMap((locale) => {
      return pageHandles.map((handle) => {
        return {
          locale,
          handle: [handle],
        }
      })
    })
  },
  generateMetadata,
}
export default templatePage
