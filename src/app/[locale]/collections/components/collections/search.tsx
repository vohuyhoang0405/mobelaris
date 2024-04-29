"use client"
import { searchClient } from "@lib/search-client"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import { useFormatPrice } from "app/[locale]/hooks/use-format-price"
import { Breadcrumb } from "app/components/Breadcrumb"
import clsx from "clsx"
import { kebabCase } from "lodash-es"
import { memo, useEffect } from "react"
import {
  Configure,
  InstantSearch,
  SearchBox,
  SortBy,
  connectCurrentRefinements,
  connectInfiniteHits,
  connectRefinementList,
} from "react-instantsearch-dom"
import { useInView } from "react-intersection-observer"
import { Collection } from "types/medusa"
import { CountDown } from "./CountDown"

import { getSearchIndex } from "@lib/mellisearch"
import ProductCard from "app/components/ProductCard"
import { useParams } from "next/navigation"
import { CustomRangeSlider } from "./Rangeslider"
import "./searchByCollection.css"
const filterObject = [
  {
    title: "Color",
    attribute: "variant_metadata_color",
  },
  {
    title: "Material",
    attribute: "variant_metadata_material",
  },
  {
    title: "Categories",
    attribute: "tags_value",
  },
]

const CustomRefinementList = connectRefinementList(
  ({ filter, items, refine, prefix = "" }) => {
    const t = useT()
    if (filter.title === "Categories")
      return (
        <div className="w-full  text-[#919191]">
          <div className="flex justify-between gap-2 p-[10px] font-semibold capitalize leading-none">
            <span>{t(`${prefix}${kebabCase(filter.title)}`)}</span>
            <div className="w-0 flex-1 truncate text-right capitalize text-gray-400 empty:hidden"></div>
          </div>
          <ul className={clsx("px-2 text-[15px] font-[300]")}>
            {items.map((item, i) => {
              return (
                <li
                  key={i}
                  className="border-t first:border-none hover:text-secondary"
                >
                  <label
                    className={clsx(
                      "flex items-center justify-between gap-2 py-2",
                      item.isRefined && "font-[600]"
                    )}
                  >
                    <input
                      checked={item.isRefined}
                      className="checkbox checkbox-sm hidden"
                      type="checkbox"
                      hidden
                      name={`filter.${item.value}`}
                      value={item.value}
                      onChange={(e) => {
                        e.preventDefault()
                        refine(item.value)
                      }}
                    />
                    {t(`${prefix}${kebabCase(item.label.replace("-", " "))}`)}
                    <span className="text-[13px] font-[400] text-[#7d7d7d]">
                      {item.count}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      )
    return (
      <div className={clsx("w-full font-[300] text-[#5f5f5f]")}>
        <div className="flex justify-between gap-2 p-[10px] font-semibold capitalize leading-none ">
          <span className={clsx("font-[600]")}>
            {t(`${prefix}${kebabCase(filter.title)}`)}
          </span>
        </div>
        <ul className="px-[10px]">
          {items.map((item, i) => {
            return (
              <li key={i} className="text-[15px] first:border-t">
                <label
                  className={clsx(
                    "flex items-center justify-between gap-2 py-1 capitalize hover:text-primary",
                    item.isRefined && "font-[600]"
                  )}
                >
                  <input
                    checked={item.isRefined}
                    className="checkbox checkbox-sm hidden"
                    type="checkbox"
                    hidden
                    name={`filter.${item.value}`}
                    value={item.value}
                    onChange={(e) => {
                      e.preventDefault()
                      refine(item.value)
                    }}
                  />
                  {t(`${prefix}${kebabCase(item.label.replace("-", " "))}`)}
                  <span className="text-[13px] font-[400] text-[#7d7d7d]">
                    {item.count}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
)
const sortAble = true
const CustomCurrentRefinements = connectCurrentRefinements(
  ({ items, refine }) => {
    let exited = {}
    const t = useT()
    const formatAmount = useFormatPrice()
    if (items?.length)
      return (
        <div className="flex flex-col gap-3 py-2">
          <div className="flex-1 flex-wrap gap-3 ">
            <div>{t("Now Shopping by")}</div>
          </div>
          {items.map((item) => {
            const title = t(
              filterObject.find((i) => i.attribute === item.attribute)?.title ||
                `${kebabCase(item.label)}`
            )
            if (item.attribute === "calculated_price") {
              return (
                !exited[item.attribute] && (
                  <div
                    key={item.attribute}
                    className="flex items-center gap-2"
                    onClick={(event) => {
                      event.preventDefault()
                      refine(item.value)
                    }}
                  >
                    <svg
                      className="ml-1 leading-none "
                      fill="none"
                      height={24}
                      shapeRendering="geometricPrecision"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                    <div className="font-bold">{t("Price")}:</div>
                    {/* currentRefinement :  {min: 0, max: 61} */}
                    {formatAmount(item.currentRefinement.min)} -{" "}
                    {formatAmount(item.currentRefinement.max)}
                    {(() => {
                      exited[item.attribute] = true
                    })()}
                  </div>
                )
              )
            }
            return (
              !exited[item.attribute] &&
              item?.items?.map((nested) => (
                <div
                  className="flex items-center gap-2 "
                  key={nested.label}
                  onClick={(event) => {
                    event.preventDefault()
                    refine(nested.value)
                  }}
                >
                  <svg
                    className="ml-1 leading-none"
                    fill="none"
                    height={24}
                    shapeRendering="geometricPrecision"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    width={24}
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                  <div className="font-bold">{title}:</div>
                  {t(`${kebabCase(nested.label)}`)}

                  {(() => {
                    exited[item.attribute] = true
                  })()}
                </div>
              ))
            )
          })}
          {!!items.length && (
            <button
              onClick={(e) => {
                e.preventDefault()
                refine(items)
              }}
              className="btn btn-primary btn-sm text-white"
            >
              {t("Clear all")}
            </button>
          )}
        </div>
      )
    return null
  }
)
const Filter = ({ filterObject, indexName }) => {
  const t = useT()
  const { region } = useStore()
  return (
    <div className="flex w-full flex-col">
      <div className="inset-0 z-50 h-full w-full lg:block">
        <div className="w-full ">
          <div className="flex flex-col " tabIndex={-1}>
            <div className="flex min-h-16 items-center lg:hidden">
              <div className="flex-1 py-3 text-3xl font-bold">
                {t("Filter")}
              </div>
              <label
                className="btn btn-ghost flex-shrink-0 py-3 text-2xl "
                htmlFor="filter-drawer"
              >
                <svg
                  fill="currentColor"
                  height="1em"
                  strokeWidth={0}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3,3 L21,21 M3,21 L21,3"
                    fill="none"
                    strokeWidth={2}
                    stroke="#000"
                  />
                </svg>
              </label>
            </div>
            <div className="w-full gap-3 ">
              <CustomCurrentRefinements />
            </div>
            <form className="flex flex-1 flex-col ">
              <div className="flex-1 space-y-4 pb-12 lg:py-0">
                <div className="border uppercase">
                  <CustomRefinementList
                    key={"tags_value"}
                    prefix={""}
                    filter={filterObject[2]}
                    attribute="tags_value"
                    operator="or"
                  ></CustomRefinementList>
                </div>

                <div className="border border-gray-300">
                  <CustomRefinementList
                    key={"variant_metadata_material"}
                    filter={filterObject[1]}
                    attribute="variant_metadata_material"
                    operator="or"
                  ></CustomRefinementList>
                </div>
                <div className="border border-gray-300">
                  <CustomRefinementList
                    key={"variant_metadata_color"}
                    facetOrdering={false}
                    filter={filterObject[0]}
                    attribute="variant_metadata_color"
                    operator="or"
                  ></CustomRefinementList>
                </div>
                <div className="border ">
                  <div className="w-full ">
                    <div className="flex justify-between gap-2 p-[10px] font-semibold capitalize leading-none ">
                      <span className={clsx("font-[600]")}>
                        {t(`Price`)}{" "}
                        <span className="uppercase">
                          ({region.currency_code})
                        </span>
                      </span>
                      <div className="w-0 flex-1 truncate text-right capitalize text-gray-400 empty:hidden"></div>
                    </div>
                    <div className="p-[10px]">
                      <CustomRangeSlider min={0} attribute="calculated_price" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const CollectionMain: React.FC<any> = ({ collection, indexName }) => {
  const t = useT()
  return (
    <div className="grid_wrapper w-full" id="main-content">
      <div className="span-12">
        <h1 className="pb-2 pt-6 text-center text-4xl capitalize">
          {collection.title.replaceAll("-", " ")}
        </h1>
      </div>
      <div className="rte pb-2">
        <div
          style={{ "--bc": "0 0% 100%" }}
          className="group collapse relative rounded-lg lg:collapse-open "
        >
          <input className="peer !hidden" id="collapse" type="checkbox" />
          <label
            htmlFor="collapse"
            className="max-h-[3.2em] p-0 pb-3 group-open:hidden peer-checked:hidden lg:hidden"
            dangerouslySetInnerHTML={{ __html: collection.description }}
          ></label>
          <div className="collapse-content  mx-auto max-w-3xl overflow-hidden bg-base-100 p-0 py-0 text-center peer-checked:pb-10 lg:!bg-transparent ">
            <div
              dangerouslySetInnerHTML={{ __html: collection.description }}
            ></div>
          </div>
          <label
            htmlFor="collapse"
            className="absolute bottom-0 right-0 !m-0 rounded-full border-none bg-transparent bg-gradient-to-br from-transparent via-white to-white p-3 text-3xl text-black shadow-2xl shadow-white transition-all peer-checked:rotate-180 lg:hidden "
          >
            <svg
              className="collapse-toggle-icon"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </label>
        </div>
      </div>
      <div className="py-6 lg:hidden">
        <div className="flex w-full gap-3 text-sm">
          <div className="flex flex-wrap gap-3 lg:hidden">
            <label
              className="flex h-12 cursor-pointer items-center gap-2 rounded-l-full rounded-r-full bg-gray-100 p-4 hover:bg-gray-200"
              htmlFor="filter-drawer"
            >
              {t("Filters")}
              <svg
                fill="currentColor"
                height="1em"
                strokeWidth={0}
                stroke="currentColor"
                viewBox="0 0 16 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  fillRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1" />
          {sortAble && (
            <SortBy
              className="flex h-12 cursor-pointer items-center rounded-l-full rounded-r-full bg-gray-100 p-4 hover:bg-gray-200"
              defaultRefinement={indexName + ":number_of_sale:desc"}
              items={[
                {
                  value: indexName + ":number_of_sale:desc",
                  label: t("Relevant"),
                },
                {
                  value: indexName + ":calculated_price:desc",
                  label: t("Price: descending"),
                },
                {
                  value: indexName + ":calculated_price:asc",
                  label: t("Price: Ascending"),
                },
              ]}
            />
          )}
        </div>
        <div>
          <CustomCurrentRefinementsDesktop filterObject={filterObject} />
        </div>
      </div>
      <CustomInfiniteHits />
    </div>
  )
}
const InfiniteHits = memo(({ hits, hasMore, refineNext, ...rest }) => {
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      refineNext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore])
  const exiteds = {}
  const t = useT()
  return (
    <div className="grid grid-cols-2 gap-[6px] pb-6 md:grid-cols-3 lg:mt-4 2xl:grid-cols-4">
      {hits?.map((item) => {
        if (exiteds[item.handle]) return null
        exiteds[item.handle] = true
        return <Hit key={item.handle} hit={item} />
      })}
      {hasMore && (
        <div
          ref={ref}
          className="col-span-full mx-auto flex justify-center py-12"
        >
          <div className="animate-spin px-6">
            <svg
              className="h-7 w-7 text-black text-opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                strokeWidth={4}
                stroke="currentColor"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      )}
      {!hasMore && (
        <div className="col-span-full mx-auto flex justify-center py-12 text-center text-gray-400 ">
          {!hasMore && hits && hits?.length === 0 && t("No item found.")}
        </div>
      )}
    </div>
  )
})
InfiniteHits.displayName = "InfiniteProductHits"
const CustomInfiniteHits = connectInfiniteHits(InfiniteHits)
type CollectionTemplateProps = {
  collection: Collection
  handle: string
  collectionTag: string
}
const CollectionBreadcrumb: React.FC = ({ collection }) => {
  return (
    <Breadcrumb
      items={[
        {
          url: `/`,
          title: "Home",
        },
        {
          title: collection.title,
        },
      ]}
    />
  )
}
const CustomCurrentRefinementsDesktop = connectCurrentRefinements(
  ({ items, refine }) => {
    let exited = {}
    const t = useT()
    const formatAmount = useFormatPrice()
    return (
      <div className="active-filters flex flex-wrap gap-3 py-2">
        {items.map((item) => {
          if (item.attribute === "calculated_price") {
            return (
              <a
                key={item.attribute}
                className="active-filters__remove-filter btn btn-xs rounded-lg bg-black !text-white"
                onClick={(event) => {
                  event.preventDefault()
                  refine(item.value)
                }}
              >
                {formatAmount(item.currentRefinement.min)} -{" "}
                {formatAmount(item.currentRefinement.max)}
                <svg
                  className="ml-1 h-3 w-3"
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </a>
            )
          }
          return (
            !exited[item.attribute] &&
            item?.items?.map((nested) => (
              <a
                key={nested.label}
                onClick={(event) => {
                  event.preventDefault()
                  refine(nested.value)
                }}
                className="active-filters__remove-filter btn btn-xs rounded-lg bg-black !text-white"
              >
                {t(`${kebabCase(nested.label)}`)}
                <svg
                  className="ml-1 h-3 w-3"
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
                {(() => {
                  exited[item.attribute] = true
                })()}
              </a>
            ))
          )
        })}
        {!!items.length && (
          <button
            onClick={(e) => {
              e.preventDefault()
              refine(items)
            }}
            className="active-filters__clear btn btn-outline btn-xs rounded-lg"
          >
            {t("Clear all")}
          </button>
        )}
      </div>
    )
  }
)
const SearchTemplate: React.FC<CollectionTemplateProps> = ({
  collection,
  handle,
  collectionTag,
}) => {
  let params = useParams()
  const { langCode, locale } = useStore()
  let indexName = getSearchIndex(langCode, locale)
  return (
    <div className="mx-auto max-w-[1980px]">
      <div className="px-4 py-2 sm:px-8">
        <CollectionBreadcrumb collection={collection} />
      </div>
      <div>
        <InstantSearch
          key={collectionTag}
          indexName={indexName}
          searchClient={searchClient}
        >
          <Configure
            hitsPerPage={20}
            sort={["number_of_sale:desc"]}
            attributesToRetrieve={[
              "calculated_price",
              "handle",
              "number_of_sale",
              "original_price",
              "thumbnail",
              "title",
              "select_guarantee",
            ]}
            attributesToHighlight={[""]}
          />
          <SearchBox defaultRefinement={collectionTag} className="hidden" />
          <div className="drawer flex h-auto gap-8 pb-12 lg:drawer-open lg:px-8">
            <input
              id="filter-drawer"
              type="checkbox"
              hidden
              className="peer drawer-toggle"
            />
            <div className="drawer-side pointer-events-none fixed inset-0 top-0 z-[90] hidden peer-checked:pointer-events-auto peer-checked:grid lg:pointer-events-auto lg:relative lg:z-auto lg:h-auto lg:!max-h-none  lg:w-full">
              <label htmlFor="filter-drawer" className="drawer-overlay"></label>
              <div className=" 3xl:max-w-[415px] top-[60px] z-10 w-4/5 bg-white px-4 lg:w-[21vw] lg:max-w-[293px] lg:px-0">
                <Filter
                  collection={collection}
                  filterObject={filterObject}
                  indexName={indexName}
                />
              </div>
            </div>
            <div className="drawer-content  flex-1 px-4 lg:overflow-visible lg:bg-[#f9f9f9] lg:p-1">
              <CountDown />
              <CollectionMain collection={collection} indexName={indexName} />
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
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
export default SearchTemplate
