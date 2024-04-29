import { createAlternates } from "@shop/store.config"
import { T } from "app/[locale]/context/sources"
import { Metadata } from "next"
import { LocaleType } from "types/global"
import source from "./data"
const { items } = source
const mapCategories = (categories: string[]) => {
  return categories.map((category) => {
    const title = category.toLowerCase()
    return {
      title,
      items: items.filter((item) => item.title.toLowerCase().includes(title)),
    }
  })
}
const tags = mapCategories(source.tags)
const categories = mapCategories(source.categories)
export default function FaqPage() {
  return (
    <div className=" page-wrap">
      <div className="section-title span-12 flex w-full items-center justify-center">
        <div className="section-title span-12 flex w-full items-center justify-center bg-[#eef5f1] py-14">
          <h1 className="text-4xl">FAQ</h1>
        </div>
      </div>
      <div className="v mx-auto flex w-full justify-center px-4 py-12 sm:px-8">
        <div className="w-full">
          <input
            className="hidden"
            hidden
            type="radio"
            id="all"
            name="tag"
            defaultValue="all"
          />
          <input
            className="hidden"
            hidden
            type="radio"
            id="brexit"
            name="tag"
            defaultValue="brexit"
          />
          {categories.map((category, index) => (
            <input
              key={index}
              className="hidden"
              hidden
              type="radio"
              id={category.title}
              name="tag"
              defaultValue={category.title}
            />
          ))}
          {tags.map((tag, index) => (
            <input
              key={index}
              className="hidden"
              hidden
              type="radio"
              id={tag.title}
              name="tag"
              defaultValue={tag.title}
            />
          ))}

          <div className="faq-wrap flex w-full flex-col gap-6 md:flex-row xl:gap-12">
            <div className="faq-wrap-side order-2 md:w-1/3 md:max-w-[240px]">
              <div className="space-y-12">
                <div className="divide-y divide-gray-200 ">
                  <div className="px-3 text-lg leading-loose">
                    <T>{"Categories"}</T>
                  </div>
                  <ul className="list-none px-3 py-3 uppercase">
                    <li>
                      <label className="hover:text-secondary" htmlFor="all">
                        <T>{"GENERAL"}</T> ({items.length})
                      </label>
                    </li>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <label
                          className="hover:text-secondary"
                          htmlFor={category.title}
                        >
                          {category.title} ({category.items.length})
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="divide-y divide-gray-200 ">
                  <div className="px-3 text-lg leading-loose">
                    <T>{"Tags"}</T>
                  </div>
                  <ul className="flex list-none flex-wrap gap-3 gap-y-1 px-3 py-3">
                    {tags.map((tag, index) => (
                      <li key={index}>
                        <label className="hover:text-primary" htmlFor="brexit">
                          <T>{tag.title}</T>({tag.items.length})
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="faq-wrap-content order-1 flex-1 md:order-2">
              <ul
                id="content-"
                className="grid list-none gap-x-6 gap-y-2 md:grid-cols-2"
              >
                {items.map((item, i) => {
                  let title = item.title
                  let content = item.content
                  return (
                    <li
                      key={i}
                      data-title={"global shipping container shortage"}
                      data-tag={item.title}
                      className="w-full animatecss animatecss-fadeIn"
                    >
                      <div
                        className="collapse collapse-arrow w-full rounded-none "
                        tabIndex={0}
                      >
                        <input className="peer" type="checkbox" />
                        <h4 className="collapse-title m-0 border py-3 font-heading font-medium leading-none peer-checked:bg-gray-100">
                          <span className="text-lg">
                            <T>{title}</T>
                          </span>
                        </h4>
                        <div className="collapse-content invisible -top-4 border-none peer-checked:visible peer-checked:top-0 peer-checked:bg-transparent">
                          <div className="prose w-full max-w-none py-6 prose-a:text-secondary prose-a:underline">
                            <T ishtml>{content}</T>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="hidden" id="indexedArticleStyle" />
      </div>
    </div>
  )
}
export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}): Promise<Metadata> {
  const pathname = "/faq"
  return {
    title: "FAQ",
    openGraph: {
      title: "Designer Classic Handmade Furniture & Lighting | Mobelaris",
      description:
        "Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
      images: [
        {
          url: "https://www.mobelaris.com",
          width: 1200,
          height: 630,
          alt: "Mobelaris",
        },
      ],
      type: "website",
      url: "https://www.mobelaris.com/en/faq",
    },
    twitter: {
      card: "summary_large_image",
      site: "@mobelaris",
      creator: "@mobelaris",
      title: "Mobelaris",
      description:
        "We are passionate about contemporary design: furniture, art, tapestries, and accessories for your office or home",
      images: "https://twitter.com/mobelaris/photo",
    },
    alternates: createAlternates({
      currentLocale: params.locale,
      pathname,
    }),
  }
}
