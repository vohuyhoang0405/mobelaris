"use client"
import { SEARCH_CONFIG } from "@lib/constants"
import { searchClient } from "@lib/search-client"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { ProductTag } from "@medusajs/medusa"
import { useStore } from "app/[locale]/context/store-context"
import ProductCard from "app/components/ProductCard"
import { kebabCase } from "lodash-es"

import { useEffect, useId } from "react"
import {
  Configure,
  InstantSearch,
  connectInfiniteHits,
} from "react-instantsearch-dom"

const CollectionMain: React.FC<any> = () => {
  return <CustomInfiniteHits />
}
const InfiniteHits = ({ hits, hasMore, refineNext }) => {
  return (
    <>
      {hits?.map((item: any) => {
        return <Hit key={item.handle} hit={item} />
      })}
    </>
  )
}
const CustomInfiniteHits = connectInfiniteHits(InfiniteHits)
const Recommendations: React.FC = ({
  collectionTags = [],
}: {
  collectionTags: ProductTag[]
}) => {
  const { langCode } = useStore()
  let indexName = "products_" + langCode
  const id = useId()
  useEffect(() => {
    // console.log('collectionTags', collectionTags.sfds.dsfef.fvsdf)
  }, [])
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
