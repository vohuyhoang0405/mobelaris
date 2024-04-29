import { LangCodeType } from "@lib/TranslateAndSaveType"
import { search } from "@lib/config.server"
import { config, settings_data } from "@shop/index"
import { createAlternates } from "@shop/store.config"
import { GTagEventEnterPage } from "app/components/googleTag"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense, cache } from "react"
import { LocaleType } from "types/global"
import { getServerContext } from "../helper"
import { Ready } from "./context/other-context"
import { SourcesProvider } from "./context/sources"
import { ExpandableText } from "./templates/Home"

// Lazy load components
const TinaContent = dynamic(() => import("./templates/Home/TinaContent"))
const Features = dynamic(() => import("./templates/Home/Features"))
const MostSearch = dynamic(() => import("./templates/Home/MostSearch"))
const CollectionFeatures = dynamic(
  () => import("./templates/Home/CollectionFeatures")
)
const CollectionList = dynamic(() => import("./templates/Home/CollectionList"))
const InstagramHome = dynamic(
  () => import("./instagram/components/InstagramHome")
)

const homepagesearch = async (
  langCode: LangCodeType,
  locale: LocaleType,
  textSearch: string
) => {
  return await search(langCode, locale, textSearch)
}
const getHomePageData = cache(
  async (locale: LocaleType, langCode: LangCodeType) => {
    const [
      collectionFeaturesChair,
      collectionFeaturesLighting,
      collectionFeaturesBestSeller,
    ] = await Promise.all([
      await (async () => {
        const collectionFeaturesChair =
          settings_data.current.sections["16554461250d55c4b0"]
        collectionFeaturesChair.products = await homepagesearch(
          langCode,
          locale,
          "dining-chairs"
        )
        return collectionFeaturesChair
      })(),
      await (async () => {
        const collectionFeaturesChair =
          settings_data.current.sections["1655446202519f8c7a"]
        collectionFeaturesChair.products = await homepagesearch(
          langCode,
          locale,
          "lighting"
        )
        return collectionFeaturesChair
      })(),
      await (async () => {
        const collectionFeaturesChair =
          settings_data.current.sections["1655446237b2b3248b"]
        collectionFeaturesChair.products = await homepagesearch(
          langCode,
          locale,
          "express-delivery"
        )
        return collectionFeaturesChair
      })(),
    ])
    return {
      collectionFeaturesChair,
      collectionFeaturesLighting,
      collectionFeaturesBestSeller,
    }
  }
)

async function Page({
  params,
}: {
  params: { locale: LocaleType }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const context = await getServerContext(params.locale)
  const {
    collectionFeaturesChair,
    collectionFeaturesLighting,
    collectionFeaturesBestSeller,
  } = await getHomePageData(context.locale, context.langCode)
  let date = new Date().toISOString()
  return (
    <SourcesProvider name="home" value={{ updateAt: date }}>
      <>
        <TinaContent context={context} />
        <Features context={context} />
        <MostSearch context={context} />
        <Suspense>
          <Ready>
            <CollectionFeatures
              context={context}
              heading={collectionFeaturesChair.settings.heading}
              content={collectionFeaturesChair.settings.content}
              products={collectionFeaturesChair.products}
            />
            <CollectionFeatures
              context={context}
              heading={collectionFeaturesLighting.settings.heading}
              content={collectionFeaturesLighting.settings.content}
              products={collectionFeaturesLighting.products}
            />
            <CollectionFeatures
              context={context}
              heading={collectionFeaturesBestSeller.settings.heading}
              content={collectionFeaturesBestSeller.settings.content}
              products={collectionFeaturesBestSeller.products}
            />
            <CollectionList />
            <InstagramHome />
            <ExpandableText
              content={`<h2>
                Are you looking for a designer furniture shop? You've come to
                the right place.
              </h2>
              <p>
                We, at Mobelaris, believe that your home deserves the
                best replica designer furniture, accessories, and lighting. With
                over a thousand items in stock from our partner factories and
                warehouses across Europe, we can provide what you need at a
                fraction of the price in the quickest time possible. Whether you
                are looking for a contemporary or vintage replica furniture and
                anything in between, we got you covered.
              </p>
              <div className="content-custom">
                <p>
                  Through the years, we are consistently living up to our
                  philosophy to satisfy the wishes of our customers to buy
                  design furniture that can last for generations. All our
                  products are crafted to adhere to the industry’s highest
                  standards, giving extra attention to details and using only
                  the best grade materials. We work with highly-creative,
                  seasoned, and up-and-coming designers and makers of replica
                  retro and modern design furniture in the UK to come up with a
                  wide array of beautiful home furnishings.
                </p>
                <h2>
                  Shop design furniture online like sofas, tables, and chairs
                  and get them delivered to your door
                </h2>
                <p>
                  Whether you live in a condo or house, we can help you create a
                  cozy, chic home space that perfectly reflects your personality
                  and character. We offer diverse choices of replica furniture
                  that scale up the appearance of your living room, dining room,
                  and bedroom. Browse our products and buy vintage design
                  furniture that will be the envy of your visitors.
                </p>
                <p>
                  Mobelaris offers chaise lounges, 3-seater sofas, small
                  &amp; 2-seater sofas, corner sofas, and day beds, all
                  guaranteed to provide comfort and enhance the aesthetics of
                  your living area. Our design furniture online shop also offers
                  classy dining tables, console tables, tray tables, side
                  tables, office desks, conference tables, bedside tables, and
                  modern coffee tables. Complementing these lovely pieces of
                  replica designer furniture are the armchairs, lounge chairs,
                  modern rocking chairs, office chairs, dining chairs, modern
                  benches, high-back chairs, stools, and bar stools.
                </p>
                <h2>
                  Get uncompromising craftsmanship and quality of design
                  furniture in the UK
                </h2>
                <p>
                  All our replica furniture is designed and manufactured to make
                  modern living more comfortable. Every piece is carefully
                  chosen by our dedicated team who goes around the world to find
                  unique and lovely replica designer furniture and meet the
                  original makers.
                </p>
                <p>
                  As a prominent design furniture shop online in the UK,
                  Mobelaris knows that lightning fixtures greatly
                  enhanced the ambiance of any room. Thus, we created an array
                  of gorgeous pendant lights, wall lights, ceiling lights, floor
                  lamps, and table lamps. We continually source out modern and
                  vintage lighting from the Far East and Europe, buying them
                  from the factory to make them more affordable to our valued
                  customers.
                </p>
                <p>
                  Complete your home décor with our classic to contemporary
                  storage and Scandinavian style accessories. Our store
                  furniture design is cut out to make a difference, allowing you
                  to style your personal space with original accent pieces and
                  home staples. Here, it is extremely easy to find design UK
                  furniture because we have everything you need including
                  sideboards, cabinets, modern TV units, chest drawers,
                  wardrobes, display cabinets, hallway tables, and bookcases
                  &amp; shelves. We also pick up one-of-a-kind accessories like
                  clocks, coat racks, coat hooks, and rugs to spruce up your
                  home. And as our way of showing our gratitude for your loyalty
                  and patronage, we offer regular replica furniture for sale.
                </p>
                <h2>
                  All set to shop online design furniture? We are here to serve
                  you.
                </h2>
                <p>
                  When you buy design furniture online, we process your order
                  immediately. If we have it in our stock, we can ship and
                  deliver right to your doorstep within 3 days up to 2 weeks.
                  You can check the "Dispatch" time on the product page, giving
                  you an approximate time of delivery after your replica
                  designer furniture leaves the logistics facilities of our
                  partner manufacturers. Large pieces like sofas, dining tables,
                  or sideboards are typically shipped within 8-14 weeks.
                </p>
                <p>
                  We deliver to different parts of Europe. Be sure to check the
                  country options that are available for hassle-free delivery of
                  your design UK furniture. Find out where your order is via the
                  "My Account" feature in our secured website. We also offer an
                  Express Delivery of products that are in our warehouse or in
                  stock. This option is for those who want to get hold of our
                  remarkable the soonest time possible.
                </p>
                <p>
                  Don't delay buying your dream design furniture.
                  <span>&nbsp;</span>
                  <a href="/collections">Shop now!</a>
                </p>
              </div>`}
            />
          </Ready>
        </Suspense>
        <GTagEventEnterPage type="home" />
      </>
    </SourcesProvider>
  )
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LocaleType }
}): Promise<Metadata> {
  return {
    title: "Designer Classic Handmade Furniture & Lighting",
    description:
      "Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
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
      url: "https://www.mobelaris.com/en/page-not-found",
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
      currentLocale: locale,
      pathname: "",
    }),
  }
}
export async function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }))
}
export default Page
