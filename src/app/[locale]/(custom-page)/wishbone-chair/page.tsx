import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { T } from "app/[locale]/context/sources"
import Slider from "app/components/Carousel"
import Container from "app/components/Container"
import Link from "app/components/Link"
import ProductCard from "app/components/ProductCard"
import { Metadata } from "next"
import Image from "next/image"
import { LocaleType } from "types/global"
import RecommendationsLazy from "../Recommendations"
import { PageData, createGetPageData } from "../helpers"
import bg from "./images/hero-bg2x.png"
import image from "./images/wishbone_chair@2x.png"
let defaultData: PageData = {
  hero: {
    title: "Wishbone Style Y Chair | CH24",
    image: image,
    background: bg,
    description:
      "Inspired by the Wishbone (Y) Chair designed by Hans J. Wegnerin 1949, it captures the quintessential Danish mid-century modern design. Truly a unique piece to elevate any space.",
    description_2: "Inspired by: Hans J. Wegner",
    tabs: ["DESCRIPTION", "GALLERY", "DIMENSION", "FAQs"],
  },
  products: {
    title:
      'AVAILABLE IN <span class="number">26</span> EXQUISITE PAINT FINISHES <span>&amp;</span> SOLID WOODS',
    items: [],
  },
  productInspiration: {
    quote: {
      header: {
        h3: "A Unique Piece You Can Call Your Own",
      },
      content: {
        p: "Owning a replica of the Wishbone Y or CH24 Chair is like owning a piece of modern history. Portraits of Danish merchants sitting in the Chinese Ming Dynasty Chairs inspired this iconic classic. Hans J. Wegner designed the distinct characteristic of the wishbone or Y-shaped back of the chair where it got its name. The shape gives stability and ensures comfortable support. New York Times has dubbed the chair as an understated work of simplicity and comfort. Since its creation in 1949, the design has continually been mass-produced up to modern times. Giving proof to its understated timeless elegance. The Mobelaris Wishbone Y Chair replica comes in several finishes and made with FSC-certified hardwoods, such as smooth and sophisticated American Walnut, and unique and traditional Soaped Oak. As per the original design by Wegner, the backrest is one piece steam-formed, producing a seamless finish that can fit in with any aesthetics. Looking for a unique Danish piece to add style and functionality to your home or office space? The Wishbone Y Chair or CH24 Chair is the perfect match for you.",
      },
    },
    "product-image": {
      img: {
        src: "/static/version1683613451/frontend/Mobelaris/Theme/en_GB/Alan_ProductLandingPage/images/CH24 - Special Edition - Oiled Oak@2x.png",
        alt: "product-specification-image",
      },
    },
    images: [
      "https://static.mobelaris.com/media/contest/submitted/charlottedambehrens_gmail.com_01.jpg",
      "https://static.mobelaris.com/media/contest/submitted/per.petersen_live.dk_02_2.png",
      "https://static.mobelaris.com/media/contest/submitted/monicafjolstad_yahoo.no_01.png",
      "https://static.mobelaris.com/media/contest/submitted/5000001634.jpg",
      "https://static.mobelaris.com/media/contest/submitted/aoe_live_live.se_01.png",
      "https://static.mobelaris.com/media/contest/submitted/thusen_1.jpg",
      "https://static.mobelaris.com/media/contest/submitted/bram_eefting.jpg",
      "https://static.mobelaris.com/media/contest/submitted/000005712-spinosus-1.jpg",
      "https://static.mobelaris.com/media/contest/submitted/2000000775-pieterd-1.jpg",
      "https://static.mobelaris.com/media/contest/submitted/2000000753-danielep-1.jpg",
      "https://static.mobelaris.com/media/contest/submitted/000008466-ryans-1.jpg",
      "https://static.mobelaris.com/media/contest/submitted/000007987-leonie-1.jpg",
      "https://static.mobelaris.com/media/contest/submitted/5000002185-Lisarengrde.jpg",
      "https://static.mobelaris.com/media/contest/submitted/land_leeshaw.com.jpg",
      "https://static.mobelaris.com/media/contest/submitted/rodthorpe43_gmail.com-01.jpg",
      "https://static.mobelaris.com/media/contest/submitted/Kurt-grethe_fibermail.dk-01.jpg",
      "https://static.mobelaris.com/media/contest/submitted/Keysue62_gmail.com-01.jpg",
      "https://static.mobelaris.com/media/contest/submitted/niklas.munder_gmx.de-01.jpg",
      "https://static.mobelaris.com/media/contest/submitted/peter.nordby_hotmail.com_03_1.png",
      "https://static.mobelaris.com/media/contest/submitted/Nervank_gmail.com_02_1.png",
    ],
  },
  infomation: {
    product_specification: {
      title: "Product specification",
      content: `<table class="no-border">
      <tbody>
      <tr>
      <td style="border: none;">
      <ul>
      <li style="text-align: left;"><p style=\"font-weight:bold;\">Frame:</p> Wood Painted Color, Beech, Ash, Oak, Walnut</li>
      <li style="text-align: left;"><p style=\"font-weight:bold;\">Legs:</p> Wood Painted Color, Beach, Ash, Oak, Walnut</li>
      <li style="text-align: left;"><p style=\"font-weight:bold;\">Seat:</p> Paper Cord (As Per Original)</li>
      <li style="text-align: left;"><p style=\"font-weight:bold;\">Warranty:</p> 5 Years</li>
      </ul>
      </td>
      <td style="border: none;">
      <ul>
      <li style="text-align: left;"><p style=\"font-weight:bold;\">Assembled:</p> Fully Assembled</li>
      <li style="text-align: left;"><p style=\"font-weight:bold;\">Instructions:</p> N/A</li>
      <li style="text-align: left;"><p style=\"font-weight:bold;\">Clean:</p> Dust /&nbsp; Spot Clean</li>
      </ul>
      </td>
      </tr>
      </tbody>
      </table>`,
    },
    product_information: {
      title: "PRODUCT INFORMATION",
      content: `<ul>
     <li><p style=\"font-weight:bold;\">Dimension:</p> Width 52cm, Depth&nbsp;53cm, Height 73cm</li>
     <li><p style=\"font-weight:bold;\">Dimension Detail:</p> Base Width 43cm, Seat Arm Width 54.5cm, Leg Height 47.5cm</li>
     <li><p style=\"font-weight:bold;\">Seat Dimension:</p> Height&nbsp;43cm Approx&nbsp;</li>
     <li><p style=\"font-weight:bold;\">Packing Dimension:</p> Width 54cm, Depth 57cm, Height 77cm</li>
     <li><p style=\"font-weight:bold;\">CBM:</p> 0.237 <p style=\"font-weight:bold;\">&nbsp;Product Weight:</p> 7.5kg</li>
     </ul>`,
    },
    image:
      "/static/version1683613451/frontend/Mobelaris/Theme/en_GB/Alan_ProductLandingPage/images/Wishbone (Y) Chair - CH24@2x.png",
  },
  video: {
    url: "https://fast.wistia.net/embed/iframe/n6orbg31xl?videoFoam=true",
  },
  faqs: {
    title: "WISHBONE - FAQs",
    description:
      "Find answers for common questions about Wishbone Y Chair - CH24",
    questions: [
      {
        question: "What’s the difference between Oak and Oak Soap Finish?",

        answer:
          "Oak is oil finished, while Soaped Oak is a traditional Danish mid-century finish, that seals the chair with a slightly white pigmented finish. Looking for a more traditional finish? Go for Soaped Oak!",
      },
      {
        question: "Are the chairs stackable?",

        answer: "No, they are not.",
      },
      {
        question: "What are the dimensions?",

        answer: "Width 50.5 cm, Depth 44.5 cm, Height 76 cm",
      },
      {
        question: "What is the weight of each chair?",

        answer: "Each chair weighs approximately 7kg.",
      },

      {
        question: "Do the items come assembled?",

        answer:
          "Yes the Wishbone Chairs come fully assembled and packaged ready for export. Please note these items are delivered far and wide, be careful when unpacking not to scratch the internal product with sharp knives / scissors.",
      },
      {
        question: "What is the chair made of?",

        answer:
          "The frames are made from a number solid woods. Beech, lacquered in exquisite paint finishes or solid woods such as light ash, oak and walnut oil finished. Whilst Soaped Oak traditionally finished in Soap treatment adding a lighter / whiter pigmentation giving the CH24 that 'Danish Style' look. The natural paper cord seats are made from 150m of hand-woven paper cord as per the original and traditional design.",
      },
      {
        question: "Where are these chairs made?",

        answer:
          "Our chairs are made in our partner factory in the Far East. Manufactured by a team of skilled artisan craftsmen, inspected before shipping by our highly qualified quality control inspectors.",
      },
      {
        question: "How do you care for the chair?",
        answer:
          'Avoid exposure to direct sunlight, heat sources, pets and humidity. Provide daily cleaning and regular maintenance. Learn more from our <a href="/mwdownloads/download/link/id/1/" target="_blank">care instruction guide</a>',
      },
    ],
  },
  "related-products": {
    title: "Related Products",
    items: [],
  },
}

async function Page({ params }: { params: { locale: LocaleType } }) {
  let { data, product, t } = await createGetPageData(params.locale, {
    handle: "style-wishbone-y-chair-hans-wegner",
    defaultData,
  })
  if (!product) return null
  return (
    <div className="space-y-6 lg:space-y-12">
      <div className="wishbone-chair-header relative isolate p-[26px_12px_47px] ">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={data.hero.background}
          alt="bg"
        />
        <Container className="flex flex-col-reverse  text-center lg:flex-row lg:py-24 ">
          <div className="wishbone-chair-information relative flex  max-w-2xl items-center text-center lg:text-left">
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
                      <a href={"#" + tab}>
                        <T>{tab}</T>
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="wishbone-chair-image relative flex-1 pb-3 pt-8 ">
            <Image
              className="mx-auto max-h-[300px] max-w-[300px] object-contain lg:max-h-[600px] lg:max-w-[600px] "
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
              // title: product.title,
              // image: variant?.images?.[0]?.src || product.thumbnail,
              // url: variant.metadata?.handle
              //   ? "/" + variant.metadata?.handle
              //   : `/${product.handle}?variant=${variant.id}`,
              // original_price: variant.original_price,
              // calculated_price: variant.calculated_price,
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
      <div>
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
              src={`https://www.mobelaris.com/${data.productInspiration["product-image"].img.src}`}
              alt={data.productInspiration["product-image"].img.alt}
            />
          </div>
        </Container>
        <Container className="relative w-full max-w-page px-3">
          <Slider>
            <ul
              className=" carousel  carousel-center w-full  gap-[1vw] lg:gap-6"
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
                          className="absolute  inset-0  h-full w-full border-none object-contain duration-200 animatecss  animatecss-fadeIn"
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
        <div className="product-specification-content flex flex-col-reverse border lg:flex-row">
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
                {t(data.infomation.product_information.title)}
              </div>
              <div
                className="content prose max-w-full p-[20px_26px] text-sm prose-ul:flex prose-ul:list-none prose-ul:flex-col prose-table:text-[1em] prose-td:mr-6 "
                dangerouslySetInnerHTML={{
                  __html: t(data.infomation.product_information.content),
                }}
              ></div>
            </div>
          </div>
          <div className="image flex-1">
            <img
              src="https://www.mobelaris.com/static/version1683613451/frontend/Mobelaris/Theme/en_GB/Alan_ProductLandingPage/images/Wishbone (Y) Chair - CH24@2x.png"
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
        <div className="mx-auto mb-14 mt-10 flex w-full max-w-page flex-col items-center px-4 sm:px-8">
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
