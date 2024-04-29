import { T } from "app/[locale]/context/sources"
import Link from "app/components/Link"
import Image from "next/image"

const MostSearch = async () => {
  const data = {
    type: "mobelaris-list",
    blocks: {
      "8bd70445-6ae7-49c0-9b5d-7afae16a8497": {
        type: "block",
        settings: {
          image: (await import("./images/modern-storage.png")).default,
          heading: "Unlock the Power of Storage",
          url: "/storage",
        },
      },
      "5b67d4ed-7a53-43cc-bda5-df8efd1cbb25": {
        type: "block",
        settings: {
          image: (await import("./images/DROPDOWN-Banners-tables.webp"))
            .default,
          heading:
            "Contemporary Coffee Tables: Elevate Your Space with Modern Designs",
          url: "/modern-tables/modern-coffee-tables",
        },
      },
      "5723b879-617e-4322-ad5c-e94ebb2143ad": {
        type: "block",
        settings: {
          image: (await import("./images/chaise-longues.webp")).default,
          heading:
            "Relax in Style: Chaise Lounge and Day Beds for Ultimate Comfort",
          url: "/modern-sofas/chaise-longue-day-beds",
        },
      },
      "ab1e6bbc-8947-4f6b-82fb-f2541c896d9f": {
        type: "block",
        settings: {
          image: (await import("./images/designer-floor-lamps.png")).default,
          heading:
            "Floor Lamps: Illuminate Your Space with Style and Functionality",
          url: "/modern-lighting/floor-lamps",
        },
      },
      "67e09b2c-1d6c-4062-8394-648807ceaa34": {
        type: "block",
        settings: {
          image: (await import("./images/Designer-Sofas.png")).default,
          heading: "Sofas: Sink Into Comfort and Style",
          url: "/sofas",
        },
      },
      "d443aa9e-8d79-43ea-9548-c3b6a6357a5e": {
        type: "block",
        settings: {
          image: (await import("./images/dining-chairs.png")).default,
          heading: "Elevate Your Dining Experience with Stylish Dining Chairs",
          url: "/modern-designer-chair/dining-chairs",
        },
      },
      "f27030f8-bba1-421f-8450-3c19dcebb963": {
        type: "block",
        settings: {
          image: (await import("./images/designer-lounge-chairs.png")).default,
          heading:
            "Indulge in Comfort: Lounge Chairs for Your Relaxing Retreat",
          url: "/modern-designer-chair/modern-lounge-chairs",
        },
      },
      "a6e9dfd6-a37d-4ec2-a69d-8050b9379cb4": {
        type: "block",
        settings: {
          image: (await import("./images/designer-pendant-lights.png")).default,
          heading:
            "Elevate Your Space: Pendant Lights for Stylish Illumination",
          url: "/modern-lighting/pendant-lighting",
        },
      },
    },
    block_order: [
      "8bd70445-6ae7-49c0-9b5d-7afae16a8497",
      "5b67d4ed-7a53-43cc-bda5-df8efd1cbb25",
      "5723b879-617e-4322-ad5c-e94ebb2143ad",
      "ab1e6bbc-8947-4f6b-82fb-f2541c896d9f",
      "67e09b2c-1d6c-4062-8394-648807ceaa34",
      "d443aa9e-8d79-43ea-9548-c3b6a6357a5e",
      "f27030f8-bba1-421f-8450-3c19dcebb963",
      "a6e9dfd6-a37d-4ec2-a69d-8050b9379cb4",
    ],
    settings: {
      layout: "grid",
      heading: "Discover What's Trending: Most Searched Products",
      content:
        "At Mobelaris we try to bring you all of the best style designer furniture from the UK including 1920's to inspired by modern pieces of today.",
      collection: "",
    },
  }
  return (
    <div className="mx-auto mb-14 mt-10 flex w-full  max-w-[1264px]  flex-col items-center gap-3 px-4 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="m-0 text-[26px]">
          <T>{data.settings.heading}</T>
        </h1>
        <div className="mt-2 border-t border-solid border-black py-3">
          <h3 className="text-base font-medium">
            <T ishtml>{data.settings.content}</T>
          </h3>
        </div>
      </div>
      <ul className="grid w-full list-none grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {data.block_order
          .map((id) => data.blocks[id])
          .map(
            (
              block = data.blocks["5723b879-617e-4322-ad5c-e94ebb2143ad"],
              i
            ) => {
              return (
                <li key={i}>
                  <Link
                    href={block.settings.url}
                    className="group flex items-center justify-center hover:!text-black"
                  >
                    <div
                      className="relative inset-0 h-full w-full bg-gray-100"
                      style={{ paddingBottom: "60%" }}
                    >
                      <Image
                        src={block.settings.image}
                        fill
                        sizes="300px"
                        alt={block.settings.heading}
                      />
                    </div>
                    <h3 className="absolute m-0 max-w-[220px] rounded-lg border-solid border-black bg-white px-3 py-1 text-center font-body group-hover:border md:text-xl">
                      <T>{block.settings.heading}</T>
                    </h3>
                  </Link>
                </li>
              )
            }
          )}
      </ul>
    </div>
  )
}
export default MostSearch
