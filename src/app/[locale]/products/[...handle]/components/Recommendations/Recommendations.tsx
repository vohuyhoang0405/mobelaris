"use client"
import { SEARCH_CONFIG } from "@lib/constants"
import { searchClient } from "@lib/search-client"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { ProductTag } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import Container from "app/components/Container"
import ProductCard from "app/components/ProductCard"
import { kebabCase } from "lodash-es"

import { useId } from "react"
import {
  Configure,
  connectInfiniteHits,
  InstantSearch,
} from "react-instantsearch-dom"

const CollectionMain: React.FC<any> = () => {
  const t = useT()
  return (
    <div className="grid_wrapper w-full">
      <CustomInfiniteHits />
    </div>
  )
}
const InfiniteHits = ({ hits, hasMore, refineNext }) => {
  const t = useT()

  return (
    <Container flush>
      <div className="my-4 mb-5 border-y p-2 text-center font-title text-[1.6em] capitalize leading-tight">
        <div>{t("People Also Bought")}</div>
      </div>
      <div className="grid grid-cols-2 gap-3 pb-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {hits?.map((item) => {
          return <Hit key={item.handle} hit={item} />
        })}
      </div>
    </Container>
  )
}
const CustomInfiniteHits = connectInfiniteHits(InfiniteHits)
const Recommendations: React.FC = ({
  collectionTags,
}: {
  collectionTags: ProductTag[]
}) => {
  const { langCode } = useStore()
  let indexName = "products_" + langCode
  const id = useId()
  return (
    <>
      <InstantSearch key={id} indexName={indexName} searchClient={searchClient}>
        <Configure
          {...SEARCH_CONFIG}
          hitsPerPage={4}
          filters={collectionTags
            .filter((item) => item !== "Designers")
            .map((item) => 'tags_value="' + kebabCase(item.value) + '"')
            .join(" OR ")}
        />
        <CollectionMain indexName={indexName} />
      </InstantSearch>
    </>
  )
}
const Hit = ({ hit: item }) => {
  const img1 = item.thumbnail
  const isSale = item.original_price > item.calculated_price
  const saleDifference = getPercentageDiff(
    item.original_price,
    item.calculated_price
  )

  return (
    <div
      key={item.id}
      className="col-span-1 bg-white  transition-shadow duration-500 hover:border-gray-100 hover:shadow-[0_0_10px_2px_rgba(0,0,0,.1)] hover:shadow-gray-300"
    >
      <ProductCard
        {...{
          title: item.title,
          calculated_price: item.calculated_price,
          original_price: item.original_price,
          url: `/${item.handle}`,
          salepercent: isSale && saleDifference + "%",
          image1: img1,
          select_guarantee: item.select_guarantee,
        }}
      ></ProductCard>
    </div>
  )
}
export default Recommendations
