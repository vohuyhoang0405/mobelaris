import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { T } from "app/[locale]/context/sources"
import Slider from "app/components/Carousel"
import Container from "app/components/Container"
import Image from "app/components/Image"
import Link from "app/components/Link"
import ProductCard from "app/components/ProductCard"
import { Metadata } from "next"
import { LocaleType } from "types/global"
import RecommendationsLazy from "../Recommendations"
import { PageData, createGetPageData } from "../helpers"
import bg from "./images/hero-bg.png"
import speciamge from "./images/scpecification-2.png"
let defaultData: PageData = {
  hero: {
    title: "CH23 Chair",
    image:
      "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/c/h/ch23_chair_ash_01-01_1.png",
    background: bg,
    description:
      "The CH23 Chair first saw the light of day in 1950 as part of the five pieces created by Hans Wegner. Its simplicity of design is enhanced by superb details of construction. A wooden dining chair with paper cord seat, it has been the best seller since it was released.",
    description_2: "Inspired by: Mobelaris",
    tabs: ["DESCRIPTION", "DIMENSION", "FAQs"],
  },
  products: {
    title: "AVAILABLE IN 6 EXQUISITE FINISHES & SOLID WOODS",
    items: [],
  },
  productInspiration: {
    quote: {
      header: {
        h3: "THE CH23 CHAIR - A BEAUTIFULLY CRAFTED CHAIR",
      },
      content: {
        p: "Showcasing Wegner’s unique style and insightful craftsmanship, the chair is unsurpassed for its comfort. It makes a practical fitting around the table even in small rooms because it has no armrest. Out of production for the past six decades, Mobelaris brings back a Mobelaris Reproduction of the iconic CH23 Chair by Hans Wegner. Perfectly true to the original design, the CH23 Chair features has a cover-cap details where the backrest meets the frame. Elegantly formed solid wood and a double hand woven paper cord seat makes the seat extremely durable. The relatively classical lines presented by the CH23 is the reason behind its lively commercial success.",
      },
    },
    "product-image": {
      img: {
        src: "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/c/h/ch23_chair_ash_01-01_1.png",
        alt: "product-specification-image",
      },
    },
    images: [],
  },
  infomation: {
    product_specification: {
      title: "Product specification",
      content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Frame:</p> Please See Individual Products</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Legs:</p> Tapered Legs</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Seat:</p> Paper Cord (As Per Original)</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Warranty:</p> 5 Years</li></ul></td><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Assembly:</p> Fully Assembled</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Instructions:</p> N/A</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Clean:</p> Dust / Spot Clean)</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Style:</p> Modern Classic Design</li></ul></td></tr></tbody></table>`,
    },
    product_information: {
      title: "PRODUCT INFORMATION",
      content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Dimension:</p> Width 50.3cm, Depth 50.3cm, Height 78.6cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Seat Height:</p> 44cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Packing Dimension:</p> Width 56cm, Depth 54cm, Height 79cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">CBM:</p> 0.245</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Product Weight:</p> 4.8kg <p style=\"font-weight:bold;\"> Packing Weight:</p> 7.0kg</li></ul></td></tr></tbody></table>`,
    },
    image: speciamge,
  },
  video: {
    url: "https://fast.wistia.net/embed/iframe/dk8cl72wpj?videoFoam=true&autoPlay=true&endVideoBehavior=loop",
  },
  faqs: {
    title: "CH23 CHAIR - FAQS",
    description: "Find answers for common questions about CH23 Chair.",
    questions: [
      {
        question: "What’s the difference between Oak and Soaped Oak Finish?",
        answer:
          "Oak is oil finished, while Soaped Oak is a traditional Danish mid-century finish, that seals the chair with a slightly white pigmented finish. Looking for a more traditional finish? Go for Soaped Oak!",
      },
      {
        question: "Are the chairs stackable?",
        answer: "No, they are not.",
      },
      {
        question: "What are the dimensions?",
        answer: "Width 50.3cm, Depth 50.3cm, Height 78.6cm",
      },
      {
        question: "What is the weight of each chair?",
        answer: "Each chair weighs approximately 7kg.",
      },
      {
        question: "Do the items come assembled?",
        answer:
          "Yes, the CH23 Chairs come fully assembled and packaged ready for export. Please note these items are delivered far and wide, be careful when unpacking not to scratch the internal product with sharp knives / scissors.",
      },
      {
        question: "What is the chair made of?",
        answer:
          "The frames are made from a number of solid woods. Solid woods such as light ash, black-painted ash, oak with walnut backrest, oak and walnut oil finished. Whilst Soaped Oak traditionally finished in Soap treatment adding a lighter/whiter pigmentation giving the CH23 that 'Danish Style' look. The natural paper cord seats are made from 150m of hand-woven paper cord as per the original and traditional design.",
      },
      {
        question: "Where are these chairs made?",
        answer:
          "Our chairs are made in our partner factory in the Far East. Manufactured by a team of skilled artisan craftsmen, inspected before shipping by our highly qualified quality control inspectors.",
      },
      {
        question: "How do you care for the chair?",
        answer:
          "Avoid exposure to direct sunlight, heat sources, pets, and humidity. Provide daily cleaning and regular maintenance.",
      },
    ],
  },
  "related-products": {
    title: "Related Products",
    items: [
      {
        title: "Wishbone (Y) Chair - CH24 - Orange - Natural Cord",
        image:
          "https://static.mobelaris.com/media/catalog/product/resize_img//5/a/5aa00fe87fe70_1_1.jpg",
        url: "/orange-style-wishbone-y-chair-hans-wegner-natural-cord",
        price: {
          from: "£139.50",
          regular: "£279.00",
        },
      },
      {
        title: "Wishbone (Y) Chair - CH24 - Soaped Oak - Black Cord",
        image:
          "https://static.mobelaris.com/media/catalog/product/resize_img//w/i/wishbone_soap_black_02.png",
        url: "/soaped-oak-natural-cord-wishbone-y-chair-hans-wegner-1",
        price: {
          from: "£224.50",
          regular: "£449.00",
        },
      },
      {
        title: "Wishbone (Y) Chair - CH24 - Purple - Natural Cord",
        image:
          "https://static.mobelaris.com/media/catalog/product/resize_img//5/a/5aa00fe88068d_1.jpg",
        url: "/purple-style-wishbone-y-chair-hans-wegner-natural-cord",
        price: {
          from: "£111.60",
          regular: "£279.00",
        },
      },
    ],
  },
}

async function Page({ params }: { params: { locale: LocaleType } }) {
  let { data, product, trans } = await createGetPageData(params.locale, {
    handle: "style-ch-23-chair-hans-wegner",
    defaultData,
  })

  if (!product) return null
  const dictionaries = trans.resources.reduce(
    (acc: { [key: string]: string }, item) => {
      acc[item.key] = item.value
      return acc
    },
    {}
  )
  const t = (key: string) => dictionaries[key] || key
  return (
    <div className="space-y-6 lg:space-y-12">
      <style
        dangerouslySetInnerHTML={{
          __html: `html{
        scroll-behavior: smooth;

      }`,
        }}
      ></style>
      <div className="header relative isolate p-[26px_12px_47px] ">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={data.hero.background}
          alt="bg"
        />
        <Container className="flex flex-col-reverse  text-center lg:flex-row  ">
          <div className="information relative mx-auto  flex max-w-2xl items-center text-center lg:text-left">
            <div className="bg-white">
              <Container className="content py-12 lg:p-24">
                <div className="content-panel">
                  <div className="item content flex flex-col gap-3">
                    <div className="title text-xl lg:text-2xl xl:text-4xl">
                      <h1>{t(data.hero.title)}</h1>
                    </div>
                    <div
                      className="description-content"
                      dangerouslySetInnerHTML={{
                        __html: t(data.hero.description),
                      }}
                    ></div>
                    <div className="more-information flex flex-col items-center gap-3 lg:items-start">
                      <p
                        className="inspired-by font-button text-lg font-bold lg:text-xl xl:text-2xl"
                        dangerouslySetInnerHTML={{
                          __html: t(data.hero.description_2),
                        }}
                      ></p>
                      <div className="description-review flex items-baseline justify-center gap-3 lg:justify-start">
                        <img
                          className="w-16 object-contain"
                          src="https://www.mobelaris.com/static/version1683613451/frontend/Mobelaris/Theme/en_GB/Alan_ProductLandingPage/images/5 stars@2x.png"
                          alt="5 start"
                        />
                        <span> 0+ Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
              <div className="control flex border border-[#e0e0e0] text-center font-button text-xs lg:text-lg">
                {data.hero.tabs.map((tab, index) => {
                  return (
                    <div
                      className={
                        "flex-1 border border-[#e0e0e0] bg-[#f3f3f3] px-2 py-2"
                      }
                      key={index}
                    >
                      <a href={`#` + tab}>
                        <T>{tab}</T>
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="image relative flex-1 pb-3 pt-8 lg:p-0">
            <Image
              width={600}
              height={600}
              className="mx-auto min-h-[300px] max-w-[300px] object-contain lg:max-h-[600px] lg:max-w-[600px] "
              src={data.hero.image}
              alt={data.hero.title + " image"}
            />
          </div>
        </Container>
      </div>
      <div className="mx-auto mb-14  mt-10 flex w-full max-w-page flex-col items-center px-4 sm:px-8">
        <div className="mx-auto max-w-3xl text-center ">
          <h2
            className=" m-0 text-xl lg:text-[26px] "
            dangerouslySetInnerHTML={{ __html: t(data.products.title) }}
          ></h2>
          <div className="mt-2 border-t border-solid border-black py-3"></div>
        </div>
        <div className="relative w-full max-w-page">
          <ul className="grid w-full list-none grid-cols-2 gap-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {product.variants.map((variant, i) => {
              if (i > 5) return null
              const isSale = variant.original_price > variant.calculated_price
              const saleDifference = getPercentageDiff(
                variant.original_price,
                variant.calculated_price
              )
              return (
                <li key={i}>
                  <ProductCard
                    title={product.title + " " + variant.title}
                    image1={variant.images[0].src}
                    url={
                      variant.metadata?.handle
                        ? "/" + variant.metadata?.handle
                        : `/${product.handle}?variant=${variant.id}`
                    }
                    original_price={variant.original_price}
                    calculated_price={variant.calculated_price}
                    salepercent={isSale && saleDifference + "%"}
                  />
                </li>
              )
            })}
          </ul>
          <div className=" mt-12 flex justify-center">
            <Link
              className="btn mx-auto w-full min-w-[120px] max-w-[375px] text-2xl"
              href={"/" + product?.handle}
            >
              <T>VIEW ALL</T>
            </Link>
          </div>
        </div>
      </div>
      <div
        id={data.hero.tabs[0]}
        style={{
          scrollMarginTop: "200px",
        }}
      >
        <Container className="product-inspiration flex flex-col-reverse gap-6 py-6 text-center lg:flex-row lg:items-center lg:text-left">
          <div className="quote w-full max-w-xl">
            <div className="header text-xl lg:text-2xl">
              <h3>{t(data.productInspiration.quote.header.h3)}</h3>
            </div>
            <div className="content xl:text-lg">
              <p>{t(data.productInspiration.quote.content.p)}</p>
            </div>
          </div>
          <div className="product-image flex-1 ">
            <img
              className="mx-auto max-h-[250px] object-contain lg:max-h-[400px]"
              src={`${data.productInspiration["product-image"].img.src}`}
              alt={data.productInspiration["product-image"].img.alt}
            />
          </div>
        </Container>
        <Container className="relative w-full max-w-page">
          <Slider>
            <ul
              className=" carousel  carousel-center  m-0 w-full  gap-[1vw]  lg:gap-6"
              role="list"
            >
              {data.productInspiration.images.map((url, i) => {
                return (
                  <li
                    className=" carousel-item w-[calc((100%)/2-1vw)]  py-6 md:w-[30vw] lg:w-[calc((100%-72px)/4)] xl:w-[282px] "
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className="min-h-full w-full ">
                      <div
                        className="! relative  mx-auto  w-full"
                        style={{ paddingBottom: "100%", maxWidth: 882 }}
                      >
                        <img
                          loading="lazy"
                          width={400}
                          height={400}
                          decoding="async"
                          data-nimg={1}
                          className="absolute  inset-0  h-full w-full border-none object-contain duration-200 animatecss  animatecss animatecss-fadeIn animatecss-fadeIn"
                          sizes="(min-width: 1440px) 667px, (min-width: 1200px) 467px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
                          src={url}
                          style={{ color: "transparent" }}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Slider>
        </Container>
      </div>
      <Container>
        <div
          id={data.hero.tabs[1]}
          style={{
            scrollMarginTop: "200px",
          }}
          className="product-specification-content flex flex-col-reverse border lg:flex-row"
        >
          <div className="detail max-w-xl">
            <div>
              <div className="header  bg-[#f4f4f4] p-[18px_36px] text-center uppercase">
                {t(data.infomation.product_specification.title)}
              </div>
              <div
                className="content prose max-w-full p-[20px_26px] text-sm prose-ul:m-0 prose-ul:list-none prose-table:text-[1em] prose-td:mr-6 prose-td:border-none prose-td:p-0"
                dangerouslySetInnerHTML={{
                  __html: t(data.infomation.product_specification.content),
                }}
              ></div>
            </div>
            <div>
              <div className="header  bg-[#f4f4f4] p-[18px_36px] text-center uppercase">
                {data.infomation.product_information.title}
              </div>
              <div
                className="content prose max-w-full p-[20px_26px] text-sm prose-ul:flex prose-ul:list-none prose-ul:flex-col prose-table:text-[1em] prose-td:mr-6 "
                dangerouslySetInnerHTML={{
                  __html: t(data.infomation.product_information.content),
                }}
              ></div>
            </div>
          </div>
          <div className="image relative flex-1">
            <Image
              src={data.infomation.image}
              className="absolute inset-0 h-full w-full object-cover"
              alt="product-specification-details-image"
            />
          </div>
        </div>
      </Container>
      <div className="wishbone-product-video">
        <div
          className="wistia_responsive_padding"
          style={{ padding: "44.17% 0 0 0", position: "relative" }}
        >
          <div
            className="wistia_responsive_wrapper"
            style={{
              height: "100%",
              left: 0,
              position: "absolute",
              top: 0,
              width: "100%",
            }}
          >
            <iframe
              loading="lazy"
              src={data.video.url}
              allow="autoplay; fullscreen"
              allowTransparency={true}
              className="wistia_embed w-full"
              allowFullScreen
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
      </div>
      <div>
        <div
          id={data.hero.tabs[2]}
          style={{
            scrollMarginTop: "200px",
          }}
          className="mx-auto mb-14 mt-10 flex w-full max-w-page flex-col items-center px-4 sm:px-8"
        >
          <div className="mx-auto max-w-3xl text-center ">
            <h2
              className="m-0 text-xl lg:text-[26px]"
              dangerouslySetInnerHTML={{ __html: t(data.faqs.title) }}
            ></h2>
            <div className="mt-2 border-t border-solid border-black py-3">
              {t(data.faqs.description)}
            </div>
          </div>
          <div className="relative w-full max-w-page">
            <ul
              id="content-"
              className="grid list-none gap-x-6 gap-y-2 md:grid-cols-2"
            >
              {data.faqs.questions.map(({ answer, question }, i) => {
                let title = t(question)
                let content = t(answer)
                return (
                  <li key={i} className="w-full animatecss animatecss-fadeIn">
                    <div
                      className="collapse collapse-arrow w-full rounded-none "
                      tabIndex={0}
                    >
                      <input className="peer" type="checkbox" />
                      <h4 className="collapse-title m-0 border py-3 font-heading font-medium leading-none peer-checked:bg-gray-100">
                        <span className="text-lg">{title}</span>
                      </h4>
                      <div className="collapse-content invisible -top-4 border-none peer-checked:visible peer-checked:top-0 peer-checked:bg-transparent">
                        <div
                          className="prose w-full max-w-none py-6 prose-a:text-secondary prose-a:underline"
                          dangerouslySetInnerHTML={{ __html: content }}
                        ></div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto mb-14 mt-10 flex w-full max-w-page flex-col items-center px-4 sm:px-8">
          <div className="mx-auto max-w-3xl text-center ">
            <h2
              className="m-0 text-xl uppercase lg:text-[26px]"
              dangerouslySetInnerHTML={{
                __html: t(data["related-products"].title),
              }}
            ></h2>
            <div className="mt-2 border-t border-solid border-black py-3"></div>
          </div>
          <div className="relative w-full max-w-page">
            <ul className="grid grid-cols-2 gap-3 pb-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              <RecommendationsLazy collectionTags={product?.tags.reverse()} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: defaultData.hero.title,
  description: defaultData.hero.description,
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
    url: "https://www.mobelaris.com/en/checkout/cart",
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
}
export default Page
