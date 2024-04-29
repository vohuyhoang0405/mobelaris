"use client"
import { getSearchIndex } from "@lib/mellisearch"
import { searchClient } from "@lib/search-client"
import { InstantMeiliSearchInstance } from "@meilisearch/instant-meilisearch"
import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import { BaseHit } from "instantsearch.js"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { FormEvent, useMemo, useState } from "react"
import {
  Configure,
  InstantSearch,
  useHits,
  useRefinementList,
} from "react-instantsearch-hooks-web"
import { GTagEventSiteSearch } from "../googleTag"
import { ControlledSearchBoxProps } from "../search/search-box-wrapper"

const FormatPrice = dynamic(() => import("../FormatPrice"))
const Image = dynamic(() => import("../Image"))
const Link = dynamic(() => import("../Link"))
const SearchBoxWrapper = dynamic(() => import("../search/search-box-wrapper"))

const ControlledSearchBox = ({
  inputRef,
  isSearchStalled,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (onSubmit) {
      onSubmit(event)
    }

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  const t = useT()
  return (
    <form
      {...props}
      className="relative left-0 mx-auto   flex w-full items-center gap-3 border-b py-2 pl-2 pr-4 transition-all duration-300  ease-in-out lg:left-auto lg:max-w-[300px] lg:py-0 lg:focus-within:max-w-[400px]"
      action=""
      noValidate
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <input name="type" type="hidden" defaultValue="product" />
      <i
        aria-hidden="true"
        className=" icon icon-search !flex h-[32px] items-center text-xl text-gray-400"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <desc />
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx={10} cy={10} r={7} />
          <line x1={21} y1={21} x2={15} y2={15} />
        </svg>
      </i>
      <input
        className="!m-0 !h-[34px] flex-1 !indent-0 uppercase !leading-[34px] text-gray-400 focus:text-black focus:outline-none lg:text-sm"
        name="q"
        id="q"
        placeholder={t("Search entire store here...")}
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        autoFocus={false}
        spellCheck={false}
        type="search"
        value={value}
        onChange={onChange}
      />
      <div className=" absolute bottom-3 right-6 top-3 hidden w-[100px] max-w-[100px] bg-white ">
        <input
          defaultValue="Search"
          name="submit"
          id="search_button"
          className="button !hidden !h-[30px] !leading-[30px]"
          type="submit"
        />
      </div>
      <div
        className="predictive-search predictive-search--header absolute left-0 top-full w-full bg-white shadow "
        data-predictive-search
      >
        <div className="predictive-search__loading-state hidden">
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
    </form>
  )
}

export const SearchBox = () => {
  return (
    <SearchBoxWrapper>
      {(props) => {
        return (
          <>
            <ControlledSearchBox {...props} />
          </>
        )
      }}
    </SearchBoxWrapper>
  )
}
const HeaderSearch = () => {
  const { langCode, locale } = useStore()
  const pathname = usePathname()
  const [searchquery, setSearchQuery] = useState()
  const searchHeaderClient: InstantMeiliSearchInstance = useMemo(() => {
    return {
      ...searchClient,
      search(requests: any) {
        if (requests.every(({ params }: any) => !params.query)) {
          // Here we have to do something else
          return Promise.resolve({
            results: requests.map(() => ({
              hits: [],
              nbHits: 0,
              nbPages: 0,
              page: 0,
              processingTimeMS: 0,
              hitsPerPage: 0,
              exhaustiveNbHits: false,
              query: "",
              params: "",
            })),
          })
        } else {
          console.log({ requests })
          setSearchQuery(requests[0].params.query)
          return searchClient.search(requests)
        }
      },
    }
  }, [])
  let indexName = getSearchIndex(langCode, locale)
  return (
    <>
      <GTagEventSiteSearch search_keyword={searchquery} />
      <InstantSearch
        stalledSearchDelay={300}
        indexName={indexName}
        searchClient={searchHeaderClient}
      >
        <Configure
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
        <div key={pathname} className="group relative block w-full">
          <SearchBox />
          <div className="hidden group-focus-within:block" tabIndex={0}>
            <Hits />
          </div>
        </div>
      </InstantSearch>
    </>
  )
}
interface ProductHitProps extends BaseHit {
  id: string
  title: string
  number_of_sale: number
  thumbnail: string
  variant_sku: string[]
  variant_metadata_color: (string | null)[]
  variant_metadata_material: (string | null)[]
  handle: string
  tags_value: string[]
  variant_prices: {
    id: string
    created_at: string
    updated_at: string
    deleted_at: string | null
    currency_code: string
    amount: number
    min_quantity: number | null
    max_quantity: number | null
    price_list_id: string | null
    variant_id: string
    region_id: string | null
    price_list: {
      id: string
      created_at: string
      updated_at: string
      deleted_at: string | null
      name: string
      description: string
      type: string
      status: string
      starts_at: string
      ends_at: string
    } | null
  }
}
function TagsRefinementList() {
  const { items } = useRefinementList({
    attribute: "tags_value",
    operator: "and",
    limit: 4,
  })

  return (
    <>
      {items.map((item, i) => (
        <li
          key={i}
          aria-selected="false"
          className="predictive-search__list-item"
          id="predictive-search-option-1"
          role="option"
        >
          <Link className="flex gap-3 px-3 py-1" href={"/" + item.value}>
            {item.label}
          </Link>
        </li>
      ))}
    </>
  )
}
export const Hits = (props) => {
  const { locale } = useStore()
  const t = useT()
  let exitedProductIds = {} as { [key: string]: boolean }
  const { hits: _hits } = useHits<ProductHitProps>(props)
  const hits = _hits.filter((item) => {
    if (!exitedProductIds?.[item.handle]) {
      exitedProductIds[item.handle] = true
      return true
    }
    return false
  })
  if (hits?.length)
    return (
      <div className="predictive-search predictive-search--header pointer-events-none absolute left-0 top-full w-full lg:fixed lg:top-[75px]">
        <div
          className="pointer-events-auto mx-auto max-h-[calc(100vh-101px)] w-full max-w-[800px] overflow-auto bg-white shadow-xl lg:max-h-[calc(100vh-75px)] lg:w-screen"
          data-predictive-search
        >
          <div
            className="text-left text-[#989b9e]"
            id="predictive-search-results"
          >
            <div className="flex flex-col-reverse gap-6 divide-x lg:flex-row">
              <ul className="w-full list-none lg:max-w-[200px]">
                <li
                  className="px-3 pb-1 pt-5 text-left text-sm font-bold uppercase leading-loose"
                  id="predictive-search-products"
                >
                  {t("Collections")}
                </li>
                <TagsRefinementList />

                <li>
                  <div
                    className="px-3 pb-1 pt-5 text-left text-sm font-bold uppercase leading-loose"
                    id="predictive-search-products"
                  >
                    {t("HOW CAN WE HELP?")}
                  </div>
                  <ul className="flex list-none flex-wrap gap-1 pb-6">
                    <li
                      aria-selected="false"
                      className="predictive-search__list-item inline px-3 leading-snug"
                      role="option"
                    >
                      <Link
                        href="/faq"
                        className="predictive-search__item inline-flex gap-3 rounded-2xl !border px-3 py-1 leading-tight"
                        tabIndex={-1}
                      >
                        {t("Faq")}
                      </Link>
                    </li>
                    <li
                      aria-selected="false"
                      className="predictive-search__list-item inline px-3 leading-snug"
                      role="option"
                    >
                      <Link
                        href="/refunds-and-returns"
                        className="predictive-search__item inline-flex gap-3 rounded-2xl !border px-3 py-1 leading-tight"
                        tabIndex={-1}
                      >
                        {t("Returns and Refunds")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="flex-1">
                <div
                  className="px-3 pb-1 pt-5 text-left text-sm font-bold uppercase leading-loose"
                  id="predictive-search-products"
                >
                  {t("Products")}
                </div>
                <ul
                  aria-labelledby="predictive-search-products"
                  className="grid list-none grid-cols-2 justify-evenly md:grid-cols-3"
                  id="predictive-search-results-list"
                  role="listbox"
                >
                  {hits.map((hit, index) =>
                    index < 8 ? (
                      <li
                        tabIndex={-1}
                        key={index}
                        className="predictive-search__list-item h-full max-w-[150px]"
                        role="option"
                        aria-selected="false"
                      >
                        <Link
                          href={`/${hit.handle}`}
                          className="predictive-search__item flex h-full flex-col items-center p-3 text-center hover:bg-gray-100"
                        >
                          <Image
                            key={hit.thumbnail}
                            className="predictive-search__image h-[150px] w-[150px] flex-shrink-0 object-contain"
                            src={hit?.thumbnail}
                            width={300}
                            height={300}
                            alt={"image"}
                          />
                          <div className="predictive-search__item-heading text-sm ">
                            {hit.title}
                          </div>
                          <div className="mt-2 flex items-center gap-1 pb-3 text-sm">
                            <span className="price-item price-item--sale  font-bold leading-none text-[#dc9d2d]">
                              <FormatPrice
                                amount={hit.calculated_price}
                              ></FormatPrice>
                            </span>
                            <span className="price-item price-item--regular font-bold leading-none text-gray-500 line-through">
                              <FormatPrice
                                amount={hit.original_price}
                              ></FormatPrice>
                            </span>
                          </div>
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
                <div
                  aria-hidden="true"
                  className="predictive-search__loading-state flex hidden justify-center"
                >
                  <svg
                    className="mx-auto -ml-1 mr-3 h-5 w-5 animate-spin text-gray-400"
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
            </div>
            <a
              href="/collections"
              className="sticky bottom-0 block  w-full border-t border-solid bg-white"
            >
              <img
                alt="sale banner"
                className="w-full object-contain  p-2"
                src={"/images/generic-banner_copy.webp"}
              />
            </a>
          </div>
        </div>
      </div>
    )
  return null
}
export default HeaderSearch
