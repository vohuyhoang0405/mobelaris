import { T } from "app/[locale]/context/sources"
import Link from "app/components/Link"
import { kebabCase } from "lodash-es"
import Image from "next/image"

const CollectionList = async () => {
  const data = {
    type: "mobelaris-list",
    blocks: {
      "60f8a690-21cb-4cb3-8f60-5d9a28c48dac": {
        type: "block2",
        settings: {
          image: (await import("./images/premium-collection-bahaus.png"))
            .default,
          heading: "Bauhaus Furniture",
          content: `If you want functional, simplistic designs to decorate your space,
              our selection of Bauhaus Furniture is perfect for you.`,
          url: "",
        },
      },
      "22043a4b-6575-460e-ad5d-da87918c6052": {
        type: "block2",
        settings: {
          image: (await import("./images/premium-collection-industrial.png"))
            .default,
          heading: "Industrial Furniture",
          content: `Mobelaris has an array of modern and vintage industrial furniture
              that will beautifully transform your living or working space.`,
          url: "",
        },
      },
      "b05f58a1-2e2e-4706-a297-b6a5ad043d55": {
        type: "block2",
        settings: {
          image: (
            await import("./images/premium-collection-office-furniture.png")
          ).default,
          heading: "Office Furniture",
          content: `Elegant, quality and affordable pieces of high-quality replicas of
              designer items that your home or office deserves.`,
          url: "",
        },
      },
      "8b16a8f9-0ccd-4fe7-b9ab-add44b70e558": {
        type: "block2",
        settings: {
          image: (await import("./images/premium-collection-ch23.png")).default,
          heading: "CH23 Chairs",
          content: `The CH23 Chair, a wooden dining chair with paper cord seat, it has
              been the best seller since it was released.`,
          url: "/ch23",
        },
      },
      "4f0e6992-9b5e-4fcd-baa7-55d764eccebd": {
        type: "block2",
        settings: {
          image: (await import("./images/premium-collection-noguchi.png"))
            .default,
          heading: "Noguchi Coffee Tables",
          content: `A triumph of minimalist design that combines natural and man-made
              materials for a stunning effect.`,
          url: "",
        },
      },
      "123a6c5c-9dd0-4372-99ca-dfad38e05f22": {
        type: "block2",
        settings: {
          image: (await import("./images/designer-pendant-lights.png")).default,
          heading: "Artichoke Lamps",
          content: `Our replica of the Artichoke Lamp portrays the classic feel of the
              early 60’s because of its luxurious design.`,
          url: "",
        },
      },
      "1d30e808-489c-41ae-9fba-63cb35d2a629": {
        type: "block2",
        settings: {
          image: (await import("./images/premium-collection-togo.png")).default,
          heading: "Togo Style Sofa",
          content: `This cult classic features its recognizable curved outline and
              pleated fabric design, perfect to lay back and relax.`,
          url: "/togo",
        },
      },
      "7770a73a-8f00-4af4-8fee-f830ffb00e13": {
        type: "block2",
        settings: {
          image: (await import("./images/premium-collection-wishbone.png"))
            .default,
          heading: "Wishbone (Y) Chair - CH24",
          content: `Captures the quintessential Danish mid-century modern design.
              Truly a unique piece to elevate any space.`,
          url: "/wishbone-chair",
        },
      },
      "ec9f2b11-e160-4420-a1b1-b5a46107a862": {
        type: "block2",
        settings: {
          image: (await import("./images/premium-collection-camaleonda.png"))
            .default,
          heading: "Camaleonda Style Sofa",
          content: `This masterpiece is built for comfort. Nothing suggest relaxation
              and mellowed vibe more than this unique chair.`,
          url: "/camaleonda",
        },
      },
    },
    block_order: [
      "60f8a690-21cb-4cb3-8f60-5d9a28c48dac",
      "22043a4b-6575-460e-ad5d-da87918c6052",
      "b05f58a1-2e2e-4706-a297-b6a5ad043d55",
      "8b16a8f9-0ccd-4fe7-b9ab-add44b70e558",
      "4f0e6992-9b5e-4fcd-baa7-55d764eccebd",
      "123a6c5c-9dd0-4372-99ca-dfad38e05f22",
      "1d30e808-489c-41ae-9fba-63cb35d2a629",
      "7770a73a-8f00-4af4-8fee-f830ffb00e13",
      "ec9f2b11-e160-4420-a1b1-b5a46107a862",
    ],
    settings: {
      layout: "grid",
      heading: "SEARCH BY GENRE",
      content: `Rustic Moderm, Bauhaus, Mid Century or colourful 70's style, Mobelaris
          have a broad range of designs to fullfill all aspirations.`,
      collection: "",
    },
  }
  const heading = data.settings.heading
  const content = data.settings.content
  const blocks = data.block_order.map((id) => data.blocks[id])
  return (
    <div className="mx-auto mb-14 mt-10 flex w-full max-w-page flex-col items-center px-4 sm:px-8">
      <div className="mx-auto max-w-3xl text-center ">
        <h1 className=" m-0  text-[26px]">
          <T>{heading}</T>
        </h1>
        <div className="mt-2 border-t border-solid border-black py-3">
          <h3 className="text-base font-medium">
            <T>{content}</T>
          </h3>
        </div>
      </div>
      <div className="relative w-full max-w-page">
        <ul className="grid w-full list-none grid-cols-1 gap-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {blocks.map((block, i) => {
            return (
              <li key={i}>
                <Link
                  href={
                    !!block.settings.url
                      ? block.settings.url
                      : "/" + kebabCase(block.settings.heading)
                  }
                  className="group relative flex aspect-[278/174] flex-col items-center justify-center text-center hover:text-inherit"
                >
                  <div className="relative w-full bg-gray-100 pb-[60%]">
                    <Image
                      alt={block.settings.heading}
                      fill
                      sizes="(max-width: 640px) 100vw, 640px"
                      src={block.settings.image}
                    />
                  </div>
                  <h3 className=" relative m-0 mb-2 mt-4 max-w-[80%] rounded-lg bg-white text-center hover:underline md:text-xl">
                    <T>{block.settings.heading}</T>
                  </h3>
                  <div className="text-sm">
                    <T>{block.settings.content}</T>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default CollectionList
