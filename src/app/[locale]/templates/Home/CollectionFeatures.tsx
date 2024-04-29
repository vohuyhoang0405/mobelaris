import GTMVSelectItemEvent from "@lib/gtm-events/select_item"
import GTMViewListItemEvent from "@lib/gtm-events/view-list-item"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { removeHTMLTags } from "@lib/util/remove-html-tag"
import { T } from "app/[locale]/context/sources"
import Slider from "app/components/Carousel"
import { ServerContextType } from "app/helper"
import { snakeCase } from "lodash-es"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { HitItem } from "types/global"

const ProductCard = dynamic(() => import("../../../components/ProductCard"))

const CollectionFeatures = ({
  heading,
  content,
  products = [],
}: {
  heading: string
  content: string
  products: HitItem[]
  context: ServerContextType
}) => {
  let listId = snakeCase(heading)
  return (
    <div className="mx-auto mb-14 mt-10 flex w-full max-w-page flex-col items-center px-4 sm:px-8">
      <div className="mx-auto max-w-3xl text-center ">
        <h2 className=" m-0  text-[26px]">
          <T>{heading}</T>
        </h2>
        <div className="mt-2 border-t border-solid border-black py-3 ">
          <T>{removeHTMLTags(content)}</T>
        </div>
      </div>
      <div className="relative w-full max-w-page">
        <Suspense>
          <div className="hidden lg:block">
            <GTMViewListItemEvent
              list_id={listId}
              items={products.filter((_, i) => i < 4)}
            />
          </div>
          <div className="lg:hidden">
            <GTMViewListItemEvent
              list_id={listId}
              items={products.filter((_, i) => i < 2)}
            />
          </div>
        </Suspense>
        <Slider>
          <ul
            className="carousel carousel-center my-[-0.5vw]  rounded-box lg:-my-3"
            role="list"
          >
            {products?.map((item, i) => {
              const img1 = item.thumbnail
              const isSale = item.original_price > item.calculated_price
              const saleDifference = getPercentageDiff(
                item.original_price,
                item.calculated_price
              )
              return (
                <li
                  key={i}
                  className="carousel-item w-[calc((100%)/2-1vw)] max-w-[276px]   px-[0.5vw] py-6  md:w-[30vw] lg:w-[300px] lg:px-3 "
                  style={{ scrollSnapAlign: "start" }}
                >
                  <GTMVSelectItemEvent listId={listId} items={[item]}>
                    <ProductCard
                      {...{
                        className: "border",
                        select_guarantee: item.guarantee,
                        title: item.title,
                        calculated_price: item.calculated_price,
                        original_price: item.original_price,
                        url: `/${item.handle}`,
                        salepercent: isSale && saleDifference + "%",
                        image1: img1,
                      }}
                    ></ProductCard>
                  </GTMVSelectItemEvent>
                </li>
              )
            })}
          </ul>
        </Slider>
      </div>
    </div>
  )
}
export default CollectionFeatures
