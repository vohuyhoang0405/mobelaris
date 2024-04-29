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
import bg from "./images/hero-bg.jpg"
let defaultData: PageData = {
  hero: {
    title: "Togo Style Sofa",
    image:
      "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_02.png",
    background: bg,
    description:
      "Mobelaris Togo Style Sofa Set is the perfect reproduction of the mid-century vintage classic by French seating designer, Michel Ducaroy. Want the warmth of comfort and nostalgia wrapped into a cushion of luxury? This is the set for you.",
    description_2: "Inspired by: Mobelaris",
    tabs: ["DESCRIPTION", "DIMENSION", "FAQs"],
  },
  products: {
    title:
      "Available online in 7 colors made completely from high-quality polyurethane foam.",
    items: [],
  },
  productInspiration: {
    quote: {
      header: {
        h3: "Sink Into Luxurious Vintage Comfort",
      },
      content: {
        p: `The Togo Style Sofa is an iconic mid-century design that remains a coveted piece in modern times. It was designed by iconic French designer Michel Ducaroy in 1973 and was originally produced by a company in France.

        Mobelaris Togo Style Combination Set is a high-quality reproduction of this beautiful vintage classic. Made with the finest polyurethane foam, and upholstered in luxurious microfibre fabric, the set comes in a variety of tasteful colours that you can choose from.
        
        Nothing suggests comfort and relaxation than the mellowed vibes from this unique set. It features the same stylish curvature as the original giving it that cozy yet elegant bean bag design.
        
        Be warned, you might not want to get up once you throw yourself into the plush cushions of the Togo Style Sofa.`,
      },
    },
    "product-image": {
      img: {
        src: "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_02.png",
        alt: "product-specification-image",
      },
    },
    images: [],
  },
  infomation: {
    product_specification: {
      title: "Product specification",
      content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Frame:</p> Polyurethane Foam</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Style:</p> Mid Century Classic</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Upholtery:</p> Velvet Fabric</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Warraty:</p> 5 Years</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Specil:</p> Reproduced As Per Original</li></ul></td><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Assembly:</p> Fully Assembled</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Instructions:</p> Applicable</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Clean:</p> Dust / Light Vacuum</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Complement with Togo Ottoman</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Create Your Personal Comfort</li></ul></td></tr></tbody></table>`,
    },
    product_information: {
      title: "PRODUCT INFORMATION",
      content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Dimension:</p> Width 175cm, Depth 101cm, Height 70cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Seat Dimension:</p> Height 38cm (approximate)</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Packing Dimension:</p> Width 180cm, Depth 105cm, Height 75cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">CBM:</p> 1.418 Weight: 48kg</li></ul></td></tr></tbody></table>`,
    },
    image:
      "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim,w_1440,c_limit,q_auto,f_auto/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_desc_01.png",
  },
  video: {
    url: "https://fast.wistia.net/embed/iframe/jkvy2wy1kv?videoFoam=true",
  },
  faqs: {
    title: "TOGO STYLE SOFA - FAQs",
    description: "Find answers for common questions about Togo Style Sofa",
    questions: [
      {
        question: "Is the fabric on the Togo Style Sofa washable?",
        answer: "The upholstery is spot clean only.",
      },
      {
        question: "How do you care for the Togo Style Sofa?",
        answer:
          "You can do daily dusting and light vacuuming on the Togo Style Sofas to maintain them.",
      },
      {
        question: "Does the Togo Style Sofa have matte or satin sheen?",
        answer: "Our Togo Style Sofas have a matte sheen.",
      },
      {
        question: "What is the Togo Style Sofa made from?",
        answer:
          "The frame is made of multiple density UK fire foam. It is gloved with man-made wadding for extra comfort and upholstered in Creamy, Boucle, Alcantara, or Velvet.",
      },
      {
        question: "Do you sell the Togo Style Sofa in sets?",
        answer:
          "We sell them separately so you can mix and match your Togo Style set to fit your space. Click [here](https://www.mobelaris.com/en/search/?q=togo) to browse and pick Togo Sofas.",
      },
      {
        question: "Does it come with a warranty?",
        answer: "Yes, our Togo Style Sofas come with a 5-year warranty.",
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
  let { data, product, t } = await createGetPageData(params.locale, {
    handle: "style-michel-ducaroy-mobelaris-comfort-style-2-seater-sofa",
    defaultData,
  })
  if (!product) return null
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
          <div className="information relative mx-auto  flex max-w-2xl items-center text-center lg:py-12 lg:text-left">
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
          <div className="image relative flex flex-1 items-center pb-3 pt-8 lg:p-0">
            <Image
              width={600}
              height={600}
              className="mx-auto max-w-[300px] object-contain lg:max-h-[600px] lg:max-w-[600px] "
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
          <div
            id={data.hero.tabs[0]}
            style={{ scrollMarginTop: "200px" }}
            className="quote w-full max-w-xl"
          >
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
          style={{ scrollMarginTop: "200px" }}
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
          style={{ scrollMarginTop: "200px" }}
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
