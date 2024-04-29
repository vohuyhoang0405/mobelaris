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
import { createGetPageData } from "../helpers"
import camaleonda from "./images/Camaleonda.png"
import bg from "./images/hero-bg.jpg"
let defaultData = {
  hero: {
    title: "Camaleonda Style Sofa Set",
    image:
      "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/c/a/camaleonda_sofa_set_velvet_dark_red_05_1_2.png",
    background: bg,
    description:
      "Mobelaris Camaleonda Style Sofa Set is a high-quality reproduction of a classic piece by world-renowned Italian architect and designer, Mario Bellini. If you want comfort in a masterpiece, this sofa is a match made in furniture heaven.",
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
        h3: "THE COMEBACK OF THE MID-CENTURY CLASSIC",
      },
      content: {
        p: `The Camaleonda Style Sofa has made a comeback with several famous celebrities spotted with similar sets in their homes. If you want this trendy classic, the Mobelaris reproduction is fit for your needs.

        Our Camaleonda Style Sofa is made completely from high-quality polyurethane foam and upholstered in rich fabric. The set includes a lounge chair, a corner sofa with a left armrest, and an ottoman with a right armrest. It comes in a variety of neutral colours to make sure the set blends perfectly with any interior design.
        
        It features the signature curved outline and pleated upholstery from the cult classic, making it not just a photogenic sofa, but an ultra-comfortable one as well.
        
        Let the worries of the day wash away as you sink into the comfort of this beautiful piece. Order your own Camaleonda Style Sofa straight to your doorstep today.`,
      },
    },
    "product-image": {
      img: {
        src: "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/c/a/camaleonda_sofa_set_velvet_dark_red_01_1_2.png",
        alt: "product-specification-image",
      },
    },
    images: [],
  },
  infomation: {
    product_specification: {
      title: "Product specification",
      content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Frame:</p> Polyurethane Foam</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Style:</p> Mid Century Classic</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Upholstery:</p> Velvet, Alcantara, Boucle Fabric</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Warranty:</p> 5 Years</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Special:</p> Reproduced As Per Original</li></ul></td><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Assembly:</p> Fully Assembled</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Instructions:</p> Applicable</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Clean:</p> Dust / Light Vacuum</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Complement with Camaleonda Ottoman and Corner Sofa</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Create Your Personal Comfort</li></ul></td></tr></tbody></table>`,
    },
    product_information: {
      title: "PRODUCT INFORMATION",
      content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Dimension:</p> Please See Individual Products</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Packing Dimension:</p> Individually Packed Per Product</li></ul></td></tr></tbody></table>`,
    },
    image: camaleonda,
  },
  video: {
    url: "https://fast.wistia.net/embed/iframe/js7quqbrtp?videoFoam=true",
  },
  faqs: {
    title: "CAMALEONDA STYLE SOFA - FAQS",
    description:
      "Find answers for common questions about Camaleonda Style Sofa Set",
    questions: [
      {
        question: "Can the arms of the Camaleonda Style Sofas be detached?",
        answer:
          "Yes, the arms are detachable which is one of the main characteristics of this design.",
      },
      {
        question: "How do you care for the Camaleonda Style Sofa?",
        answer:
          "You can do daily dusting and light vacuuming on the Camaleonda Style Sofas to maintain them.",
      },
      {
        question: "Are Camaleonda Style Sofas comfortable?",
        answer:
          "Yes, they are super comfortable as they are made from high-quality foam, and the wave design of the Camaleonda Sofa was made so the chair adjusts to the environment and contours around the weight of the seater.",
      },
      {
        question: "What is the Camaleonda Style Sofa made from?",
        answer:
          "Our Camaleonda Sofa is made from high-quality polyurethane foam and upholstered in premium fabric.",
      },
      {
        question: "Do you sell the Camaleonda Style Sofa Sofa in sets?",
        answer:
          "We sell them separately so you can mix and match your Camaleonda Style set to fit your space. Click [here](https://www.mobelaris.com/en/search/?q=camaleonda) to browse and pick Camaleonda Sofas.",
      },
      {
        question: "Does it come with a warranty?",
        answer: "Yes, our Camaleonda Style Sofas come with 5 years warranty.",
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
  let { data, product, trans, products, t } = await createGetPageData(
    params.locale,
    {
      handle: "style-michel-ducaroy-mobelaris-comfort-style-2-seater-sofa",
      tags_value: "camaleonda-products",
      defaultData,
    }
  )

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
                    <a
                      href={"#" + tab}
                      className={
                        "flex-1 border border-[#e0e0e0] bg-[#f3f3f3] px-2 py-2"
                      }
                      key={index}
                    >
                      {t(tab)}
                    </a>
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
              alt={t(data.hero.title) + " image"}
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
            {products?.map((item, i) => {
              const img1 = item.thumbnail
              const isSale = item.original_price > item.calculated_price
              const saleDifference = getPercentageDiff(
                item.original_price,
                item.calculated_price
              )
              return (
                <li key={i}>
                  <ProductCard
                    {...{
                      className: "border",
                      select_guarantee: item.select_guarantee,
                      title: item.title,
                      calculated_price: item.calculated_price,
                      original_price: item.original_price,
                      url: `/${item.handle}`,
                      salepercent: isSale && saleDifference + "%",
                      image1: img1,
                    }}
                  ></ProductCard>
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
      <div id={data.hero.tabs[0]} style={{ scrollMarginTop: "200px" }}>
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
                          className="absolute  inset-0  h-full w-full border-none object-contain duration-200 animatecss   animatecss-fadeIn"
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
          className="mx-auto mb-14 mt-10 flex w-full max-w-page scroll-m-48 flex-col items-center px-4 sm:px-8"
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
                let title = question
                let content = answer
                return (
                  <li key={i} className="w-full animatecss animatecss-fadeIn">
                    <div
                      className="collapse collapse-arrow w-full rounded-none "
                      tabIndex={0}
                    >
                      <input className="peer" type="checkbox" />
                      <h4 className="collapse-title m-0 border py-3 font-heading font-medium leading-none peer-checked:bg-gray-100">
                        <span className="text-lg">{t(title)}</span>
                      </h4>
                      <div className="collapse-content invisible -top-4 border-none peer-checked:visible peer-checked:top-0 peer-checked:bg-transparent">
                        <div
                          className="prose w-full max-w-none py-6 prose-a:text-secondary prose-a:underline"
                          dangerouslySetInnerHTML={{ __html: t(content) }}
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
              <RecommendationsLazy
                collectionTags={product?.tags.reverse() || []}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: `${defaultData.hero.title} | Mobelaris`,
  description: defaultData.hero.description,
  openGraph: {
    title: `${defaultData.hero.title} | Mobelaris`,
    description: defaultData.hero.description,
    images: [
      {
        url: defaultData.hero.image,
        width: 1200,
        height: 630,
        alt: `${defaultData.hero.title} | Mobelaris`,
      },
    ],
    type: "website",
    url: "https://www.mobelaris.com/en/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mobelaris",
    creator: "@mobelaris",
    title: `${defaultData.hero.title} | Mobelaris`,
    description: defaultData.hero.description,
    images: "https://twitter.com/mobelaris/photo",
  },
}

export default Page
