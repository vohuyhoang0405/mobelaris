"use client"
import GTMVViewItemEvent from "@lib/gtm-events/view_item"
import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { T, useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import { useFormatPrice } from "app/[locale]/hooks/use-format-price"
import { Breadcrumb } from "app/components/Breadcrumb"
import Container from "app/components/Container"
import Image from "app/components/Image"
import Link from "app/components/Link"
import ProductLable from "app/components/ProductLable"
import QuantityInput from "app/components/QuantityInput"
import { SaleLabel } from "app/components/SaleLabel"
import { GTagEventProductPageScroll } from "app/components/googleTag"
import KlaviyoTrackingProduct from "app/components/klaviyo/klaviyoTrackingProduct"
import { ProductTrustpilot } from "app/components/trustpilot"
import {
  getVariantLeadtime,
  getVariantUpsellLeadtime,
} from "app/helper/product"
import { useCart } from "medusa-react"
import dynamic from "next/dynamic"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"
import { Product, Variant } from "types/medusa"
import { CountDown } from "./CountDown"
import { VariantsSelector } from "./VariantsSelector"

const ProductGallery = dynamic(() => import("./ProductGallery/ProductGallery"))

const AddToCartButton = () => {
  const { addToCart, variant } = useContext(prodcutContext)
  const { cartLoading } = useStore()
  const { cart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [cartUpdate, setCartUpdate] = useState("null")
  const loading = cartLoading || String(cart?.updated_at) === cartUpdate
  const handleChane = useCallback((value: number) => {
    setQuantity(Math.max(value, 1))
  }, [])
  const t = useT()
  if (variant.soldout) {
    return (
      <div className="add btn btn-disabled btn-block gap-3 uppercase text-black">
        {t("Trade Quantity Available Only")}
        <span>{` - `}</span>
        <Link
          href={"/contact-us"}
          className="pointer-events-auto text-blue-500 underline  hover:text-blue-600 "
        >
          {t("Contact Us")}
        </Link>
      </div>
    )
  }
  return (
    <div className="flex gap-2 border-y py-2">
      <div className="w-24 flex-shrink-0">
        <QuantityInput value={quantity} onChange={handleChane} />
      </div>
      <button
        disabled={loading}
        onClick={() => {
          setCartUpdate(cart?.updated_at)
          addToCart(quantity)
        }}
        type="submit"
        name="button"
        className="btn btn-block relative flex-1 gap-3 overflow-hidden border border-primary bg-transparent  text-xl uppercase leading-none text-white before:absolute before:inset-0 before:z-[-1]
        before:transform  
        before:bg-primary 
        before:transition-transform 
        before:duration-700 
        before:ease-in-out 
        before:content-[''] 
        after:absolute 
        after:inset-0 
        after:z-[-1] 
        after:transform 
        after:bg-primary 
        after:transition-transform 
        after:duration-700 
        after:ease-in-out 
        after:content-['']
        hover:border-primary
        hover:bg-transparent 
        hover:text-primary 
        hover:before:translate-x-[-100%]
        hover:after:translate-x-[100%]"
      >
        {t("Add to cart")}
        {loading && (
          <svg
            className="absolute ml-4 mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
const ProductMain = () => {
  const { product, variant, saleDifference, isSale } =
    useContext(prodcutContext)

  const t = useT()
  const variantName = variant.title

  const title = `${product.title} - ${variantName}`
  return (
    <Container flush className="relative pt-8 lg:static lg:flex lg:pt-0">
      <GTMVViewItemEvent product={product} variant={variant} />

      <div
        id="product-photos"
        className="product-photos product-7658273276131 desktop-9 tablet-3 mobile-3 span-9 relative isolate flex-1"
      >
        <div id="product-labels">
          {!variant.soldout && isSale && (
            <div className=" absolute right-2 top-2   z-10  aspect-square  w-[13.5%]  max-w-[115px]  text-[#707070]  before:block  before:w-full  before:pt-[100%]">
              <SaleLabel salepercent={saleDifference + "%"} />
            </div>
          )}
          {variant.metadata.material && (
            <div className="absolute left-2 top-2  z-10  aspect-square  w-[13.5%]  max-w-[115px]  text-[#707070]  before:block  before:w-full  before:pt-[100%]">
              <div className="absolute inset-0 h-full w-full rounded-full">
                <ProductLable type={variant.metadata.material} />
              </div>
            </div>
          )}
        </div>
        <ProductGallery />
      </div>
      <div
        style={{ flexShrink: 0 }}
        className="product-right lg:w-[24%] lg:max-w-md"
      >
        <div className="product-description lg:sticky lg:top-[148px]">
          <div className="section-title hidden-mobile ">
            <h1
              id="product-title"
              className="items-start text-center font-heading text-xl capitalize leading-tight text-black lg:flex lg:text-left"
            >
              {title}
            </h1>
          </div>
          <div className="product-form">
            <div className="product_form !flex flex-col space-y-2 text-center lg:text-left">
              <Suspense>
                <VariantsSelector />
              </Suspense>
              <div className="w-full flex-1 justify-center space-y-2 text-center lg:order-[-1]">
                <ProductPrice />
                <CountDown />
              </div>
              <div
                style={{ marginBottom: "0!important" }}
                className="product-add"
              >
                <AddToCartButton />
              </div>

              <ProductTrustpilot />
              {product.metadata?.attachment && (
                <a
                  className="underline"
                  href={product.metadata?.attachment}
                  target="_blank"
                  title="Care Instruction Guide "
                >
                  <b>{t("Care Instruction Guide")}</b>
                </a>
              )}
              <Leading />
              <UpsellLeading />
              <p className="text-sm text-gray-400">
                {t(
                  "This item is not manufactured by or affiliated with the original designer(s) and associated parties. We do not claim any rights on any third party trademarks."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

function Info() {
  const product = useProduct()
  const variant = useVariant()
  const t = useT()

  return (
    <div>
      <div>
        <Container flush className="mx-auto px-6 pb-6 lg:pb-12 ">
          <div className="grid flex-1 grid-cols-1 gap-6 leading-relaxed lg:grid lg:grid-cols-2">
            <div>
              <div className="my-4 border-y p-2 text-center font-title text-[1.6em] leading-tight">
                {t("Product Specification")}
              </div>
              <div
                className="prose max-w-full text-sm prose-ul:m-0 prose-ul:list-none prose-table:text-[1em] prose-td:mr-6 prose-td:border-none prose-td:p-0"
                dangerouslySetInnerHTML={{
                  __html: (variant?.metadata?.description
                    ? t(variant?.metadata?.description)
                    : product?.metadata?.description
                  ).replace(/<\/li>\./g, "</li>"),
                }}
              ></div>
            </div>
            <div>
              <div className="my-4 border-y p-2 text-center font-title text-[1.6em] leading-tight">
                {t("Product Information")}
              </div>
              <div
                className="prose max-w-full text-sm prose-ul:flex prose-ul:list-none prose-ul:flex-col prose-table:text-[1em] prose-td:mr-6 "
                dangerouslySetInnerHTML={{
                  __html: (variant?.metadata?.product_information
                    ? t(variant?.metadata?.product_information || "")
                    : product?.metadata?.product_information
                  ).replace(/<\/li>\./g, "</li>"),
                }}
              ></div>
            </div>
          </div>
        </Container>
      </div>
      <Container flush className="mx-auto px-6 ">
        <div className="my-4 mb-5 border-y p-2 text-center font-title text-[1.6em] capitalize leading-tight">
          {t("Product Description")}
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6 md:grid-cols-2 md:flex-row">
            <div className="desktop-6 flex flex-1 items-center justify-center">
              <div className="lifestyle__text1 max-w-md">
                <h3 className="mb-3 ">
                  <p className="font-bold">
                    {t(
                      variant?.metadata?.heading_1 ||
                        "A UNIQUE PIECE IN YOUR HOME"
                    )}
                  </p>
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.metadata?.description_1,
                  }}
                ></div>
              </div>
            </div>
            <div className="desktop-6 w-full flex-1 ">
              <div className="relative  m-auto  max-h-[400px] w-full max-w-[400px] pb-[50%]">
                <Image
                  sizes="(min-width: 1200px) 800px,  calc((100vw - 35px))"
                  width={800}
                  height={400}
                  className="absolute inset-0 h-full w-full border object-cover"
                  alt={product.title}
                  src={variant?.metadata?.description_image_1}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 md:grid-cols-2 md:flex-row-reverse lg:flex-row">
            <div className="desktop-6 flex flex-1 items-center justify-center">
              <div className="lifestyle__text1 max-w-md">
                <h3 className="mb-3 uppercase">
                  <p className="font-bold">
                    {t(
                      variant?.metadata?.heading_2 ||
                        "Designed as per the original"
                    )}
                  </p>
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.metadata?.description_2,
                  }}
                ></div>
              </div>
            </div>
            <div className="desktop-6 w-full flex-1">
              <div className="relative  m-auto  max-h-[400px] w-full max-w-[400px] pb-[50%]">
                <Image
                  sizes="(min-width: 1200px) 800px,  calc((100vw - 35px))"
                  width={800}
                  height={400}
                  className="absolute inset-0 h-full w-full border object-cover"
                  alt={product.title}
                  src={variant?.metadata?.description_image_2}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
type productCotnextProps = {
  product: Product
  variant: Variant
  addToCart: Function
}
export const prodcutContext = createContext<productCotnextProps>(
  {} as productCotnextProps
)
export const useProduct = () => {
  return useContext(prodcutContext)?.product
}
export const useVariant = () => {
  return useContext(prodcutContext)?.variant
}
const canshowExpress = (v: Variant) => v.inventory_quantity > 0
const canhideshowExpressToogle = (product: Product) =>
  !product.variants.find((v) => {
    return canshowExpress(v)
  }) || product.variants.length === 1
function reducerSelectVariant(
  state = {
    ready: false,
    product: null,
    showExpress: false,
    variants: [],
    currentVariant: null,
    url: null,
  },
  action
) {
  const ready = state.ready
  const handleOptionSelect = ({ option, value }, state) => {
    const { showExpress, variants, currentVariant, product } = state
    const variantsByOptions = (variants as Variant[])
      .filter((v) => {
        return !showExpress || canshowExpress(v)
      })
      .reduce((result: any[], variant) => {
        result.push([
          `o1:${variant.option1},o2:${variant.option2},o3:${variant.option3}`,
          variant,
        ])
        return result
      }, [])
    const selectedOptions = {
      option1: currentVariant.option1,
      option2: currentVariant.option2,
      option3: currentVariant.option3,
    }
    if (option) {
      selectedOptions[`option${option.position}`] = value
    }
    let key = `o1:${selectedOptions.option1},o2:${selectedOptions.option2},o3:${selectedOptions.option3}`
    let selected = variantsByOptions.find(([optionKey]) => optionKey === key)
    if (!selected) {
      key = `o1:${selectedOptions.option1},o2:${selectedOptions.option2}`
      selected = variantsByOptions.find(([optionKey]) =>
        optionKey.includes(key)
      )
    }
    if (!selected) {
      key = `o1:${selectedOptions.option1}`
      selected = variantsByOptions.find(([optionKey]) =>
        optionKey.includes(key)
      )
    }
    if (!selected) {
      selected = variantsByOptions[0]
    }
    const url = selected[1]?.metadata.handle
      ? `/${selected[1].metadata.handle}`
      : `/${product.handle}?variant=${selected[1].id}`
    return {
      ...state,
      url,
      currentVariant: selected[1],
    }
  }
  const { showExpress, variants, currentVariant } = state
  switch (action.type) {
    case "replace": {
      return action.payload
    }

    case "handleOptionSelect": {
      return handleOptionSelect(action.payload, state)
    }
    case "setShowExpress": {
      if (!ready) return state
      const newstate = {
        ...state,
        showExpress: !showExpress,
      }
      return handleOptionSelect({}, newstate)
    }
  }
  throw Error("Unknown action: " + action.type)
}

const ProductProvider = ({
  product,
  children,
  variantId,
}: {
  product: Product
  children: any
  variantId?: string
}) => {
  const router = useRouter()
  const { locale } = useStore()
  const [{ currentVariant: selectedVariant, showExpress, url }, dispatch] =
    useReducer(reducerSelectVariant, {
      ready: true,
      showExpress: false,
      product,
      variants: product.variants,
      currentVariant:
        product.variants.find((v) => v.id === variantId) || product.variants[0],
    })

  useEffect(() => {
    let timmer = setTimeout(() => {
      if (url) {
        const fullUrl = "/" + locale + url
        history.replaceState({}, "", fullUrl)
      }
    }, 300)
    return () => {
      timmer && clearTimeout(timmer)
    }
  }, [url])
  const hideshowExpressToogle = canhideshowExpressToogle(product)
  const variantsByOptions = product.variants
    .filter((v) => {
      return canshowExpress(v) || !showExpress
    })
    .reduce((result: any[], variant) => {
      result.push([
        `o1:${variant.option1},o2:${variant.option2},o3:${variant.option3}`,
        variant,
      ])
      return result
    }, [])

  const handleOptionSelect = (option: any, value: any) => {
    dispatch({ type: "handleOptionSelect", payload: { option, value } })
  }
  const handleVariantSelect = (variantid: string) => {
    dispatch({
      type: "replace",
      payload: {
        ready: true,
        product: product,
        showExpress: showExpress,
        variants: product.variants,
        currentVariant:
          product.variants.find((v) => v.id === variantid) ||
          product.variants[0],
        url: `/${product.handle}?variant=${variantid}`,
      },
    })
  }
  const setShowExpress = () => {
    dispatch({ type: "setShowExpress" })
  }
  const availableOptions = product.options.map((option, i) => {
    if (i === 0) {
      return {
        ...option,
        values: option.values.filter((v) =>
          variantsByOptions.find(([key]) => {
            return key.includes(`o1:${v}`)
          })
        ),
      }
    }
    if (i === 1) {
      let o = {
        ...option,
        values: option.values.filter((v) =>
          variantsByOptions.find(([key]) => {
            return key.includes(`o1:${selectedVariant.option1},o2:${v}`)
          })
        ),
      }
      return o
    }
    if (i === 2) {
      return {
        ...option,
        values: option.values.filter((v) =>
          variantsByOptions.find(([key]) => {
            return key.includes(
              `o1:${selectedVariant.option1},o2:${selectedVariant.option2},o3:${v}`
            )
          })
        ),
      }
    }
    return option
  })
  const { addItem } = useStore()
  const addToCart = (quantity = 1) => {
    if (selectedVariant) {
      addItem(
        {
          variantId: selectedVariant.id,
          quantity,
        },
        true
      )
    }
  }

  const formatPrice = useFormatPrice()
  const regularPrice = formatPrice(selectedVariant.original_price)
  const salePrice = formatPrice(selectedVariant.calculated_price)
  const isSale =
    selectedVariant.original_price > selectedVariant.calculated_price
  const saleDifference = getPercentageDiff(
    selectedVariant.original_price,
    selectedVariant.calculated_price
  )
  useEffect(() => {
    window.productContext = {
      product,
      addToCart,
      hideshowExpressToogle,
      variant: selectedVariant,
      handleOptionSelect,
      handleVariantSelect,
      availableOptions,
      showExpress,
      setShowExpress,
      regularPrice,
      salePrice,
      saleDifference,
      isSale,
    }
  }, [product, selectedVariant])
  return (
    <prodcutContext.Provider
      value={{
        product,
        addToCart,
        hideshowExpressToogle,
        variant: selectedVariant,
        handleOptionSelect,
        handleVariantSelect,
        availableOptions,
        showExpress,
        setShowExpress,
        regularPrice,
        salePrice,
        saleDifference,
        isSale,
      }}
    >
      {children}
    </prodcutContext.Provider>
  )
}
const ProductBreadscumb = () => {
  const product = useProduct()
  const t = useT()
  return (
    <Container flush>
      <Breadcrumb
        items={[
          {
            title: t("Home"),
            url: "/",
          },
          {
            title: product.title,
          },
        ]}
      />
    </Container>
  )
}

const ConnectKlaviyoTrackingProduct: React.FC = () => {
  const product = useProduct()
  const variant = useVariant()
  return <KlaviyoTrackingProduct product={product} variantid={variant.id} />
}
export const ProductPrice = () => {
  const { regularPrice, salePrice, isSale } = useContext(prodcutContext)
  const t = useT()
  return (
    <div className="price">
      <div className="price__pricing-group">
        <dl className="price__regular hidden">
          <dt className="hidden">
            <span>{t("products.general.regular_price")}</span>
          </dt>
          <dd>
            <span className="price-item price-item--regular">{salePrice}</span>
          </dd>
        </dl>
        <dl className="price__sale lex-wrap mx-auto mb-3 flex items-baseline justify-center gap-6 gap-y-1 text-left lg:ml-0 lg:mr-auto lg:justify-start">
          <div>
            <dt className="mb-1 text-sm font-bold leading-none text-primary">
              {t("From")}
            </dt>
            <dd>
              <span className="price-item price-item--sale font-heading text-4xl leading-[0.8em] text-black">
                {salePrice}
              </span>
            </dd>
          </div>

          {isSale && (
            <div>
              <dt className="mb-1 text-sm font-bold leading-none text-primary">
                {t("Normal price")}
              </dt>
              <dd>
                <span className="price-item font-heading text-xl leading-[0.8em] line-through opacity-80">
                  {regularPrice}
                </span>
              </dd>
            </div>
          )}
        </dl>
        <div className="price__badges hidden">
          <span className="price__badge price__badge--sold-out">
            <span>{t("products.general.sold")}</span>
          </span>
        </div>
      </div>
      <dl className="price__unit hidden">
        <dt>
          <span className="hidden">Unit Price</span>
        </dt>
        <dd className="price-unit-price hidden">
          <span data-unit-price> </span>
          <span aria-hidden="true">/</span>
          <span className="visually-hidden">per</span>
          <span data-unit-price-base-unit />
        </dd>
      </dl>
    </div>
  )
}

const Leading = () => {
  const { langCode } = useStore()
  const product = useProduct() as Product
  const t = useT()
  const variant = useVariant() as Variant
  const leadtime = getVariantLeadtime(variant, product, langCode)
  if (variant.soldout) {
    return null
  }
  if (!leadtime || variant.inventory_quantity === 0) {
    return (
      <div id="leading_time">
        <div className="flex items-center justify-center gap-3 text-center lg:mb-2 lg:justify-start lg:bg-[#ffd800] lg:px-2 lg:py-2 lg:text-left lg:text-sm lg:font-bold">
          <div className="leading-none ">Delivered 12 - 16 weeks</div>
          <div className="dropdown dropdown-end dropdown-hover ">
            <label tabIndex={0} className="!m-0 flex items-end">
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
                style={{ width: "1.2em", height: "1.2em" }}
              >
                <circle cx={12} cy={12} r={10} />
                <line x1={12} y1={16} x2={12} y2={12} />
                <line x1={12} y1={8} x2="12.01" y2={8} />
              </svg>
            </label>
            <div
              style={{ top: "1.875rem", right: "-1.125rem" }}
              tabIndex={0}
              className="dropdown-content w-52 rounded-md border border-solid border-gray-500 bg-base-100 p-3 text-center shadow-lg"
            >
              <svg
                className="absolute -top-[8px] right-6 scale-x-150 fill-gray-500 text-sm"
                xmlns="http://www.w3.org/2000/svg"
                width={8}
                height={8}
                viewBox="0 0 512 512"
              >
                <polygon points="256 32 20 464 492 464 256 32" />
              </svg>
              {t(`Upon ordering your items will be handcrafted especially for you.
              This takes time and expertise so we allow 4 -5 weeks for
              manufacture, quality assurance and packaging. 4 weeks travel to
              the U.K., and then there’s customs clearance and admin. It’s worth
              the wait!`)}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div id="leading_time">
      <div
        tabIndex={0}
        className="group flex items-center justify-center  gap-3 text-center lg:mb-2 lg:bg-[#ffd800] lg:px-2 lg:py-2 lg:text-left lg:font-bold"
      >
        <div className="text-center leading-none">
          <T>{leadtime}</T>
        </div>
        <div className="dropdown dropdown-end dropdown-hover group-focus:dropdown-open ">
          <label tabIndex={0} className="flex items-end">
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
              style={{ width: "1.2em", height: "1.2em" }}
            >
              <circle cx={12} cy={12} r={10} />
              <line x1={12} y1={16} x2={12} y2={12} />
              <line x1={12} y1={8} x2="12.01" y2={8} />
            </svg>
          </label>
          <div
            style={{ top: "1.875rem", right: "-1.125rem" }}
            tabIndex={0}
            className="dropdown-content w-64 rounded-md border border-solid border-gray-500 bg-base-100 p-3 text-center shadow-lg"
          >
            <svg
              className="absolute -top-[8px] right-6 scale-x-150 fill-gray-500 text-sm"
              xmlns="http://www.w3.org/2000/svg"
              width={8}
              height={8}
              viewBox="0 0 512 512"
            >
              <polygon points="256 32 20 464 492 464 256 32" />
            </svg>
            {t(
              `All items are dispatched within 2-5 working days. Some European dispatch times may be longer due to processing/admin. Any quantity of items that are not in stock or clearly displayed as due into stock with a certain date will be manufactured to order, please allow 12 - 18 weeks for these.`
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const UpsellLeading = () => {
  const t = useT()
  const variant = useVariant() as Variant
  let leadtime = getVariantUpsellLeadtime(variant)
  if (variant.soldout || !(leadtime + "").trim().length) {
    return null
  }
  return (
    <div id="upsell_leading_time">
      <div
        tabIndex={0}
        className="group flex items-center justify-center  gap-3 text-center lg:mb-2 lg:bg-[#ffd800] lg:px-2 lg:py-2 lg:text-left lg:font-bold"
      >
        <div className="text-center leading-none">
          <T>{leadtime}</T>
        </div>
        <div className="dropdown dropdown-end dropdown-hover group-focus:dropdown-open ">
          <label tabIndex={0} className="flex items-end">
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
              style={{ width: "1.2em", height: "1.2em" }}
            >
              <circle cx={12} cy={12} r={10} />
              <line x1={12} y1={16} x2={12} y2={12} />
              <line x1={12} y1={8} x2="12.01" y2={8} />
            </svg>
          </label>
          <div
            style={{ top: "1.875rem", right: "-1.125rem" }}
            tabIndex={0}
            className="dropdown-content w-64 rounded-md border border-solid border-gray-500 bg-base-100 p-3 text-center shadow-lg"
          >
            <svg
              className="absolute -top-[8px] right-6 scale-x-150 fill-gray-500 text-sm"
              xmlns="http://www.w3.org/2000/svg"
              width={8}
              height={8}
              viewBox="0 0 512 512"
            >
              <polygon points="256 32 20 464 492 464 256 32" />
            </svg>
            {t(
              `The dates given are approximate, given to us by our shippers. This does not take into account, customs clearance, decanting of containers, labeling, organisation, and distribution from our UK warehouse.`
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default function ProductTemplate({
  product,
  variantId,
  children,
}: {
  product: Product
  variantId?: string
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  if (!product.variants.length) {
    return notFound()
  }
  return (
    <>
      <ProductProvider
        product={product}
        variantId={searchParams?.get("variant") || variantId}
      >
        <>
          <ProductBreadscumb />
          <ProductMain />
          <div className="h-6"></div>
          <Info />
          <div className="h-6"></div>
          {children}
          <GTagEventProductPageScroll />
          <ConnectKlaviyoTrackingProduct />
        </>
      </ProductProvider>
    </>
  )
}
