"use client"
import { medusaClient } from "@lib/config"
import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import { useFormatPrice } from "app/[locale]/hooks/use-format-price"
import { transformProduct } from "app/helper/product"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { classNames } from "tinacms"
import Link from "../Link"

const ProductItem = ({ handle }) => {
  const { region } = useStore()
  const [product, setProduct] = useState()
  const formatPrice = useFormatPrice()
  const t = useT()
  useEffect(() => {
    setProduct(
      (product) =>
        product ||
        medusaClient.products
          .list({
            handle,
            region_id: region.id,
            currency_code: region.currency_code,
          })
          .then(({ products }) => {
            const p = products[0]
            if (p) {
              setProduct(transformProduct(products[0], region))
            }
          })
    )
  }, [handle, region])
  if (!product || product.then) {
    return (
      <>
        <div className="relative w-1/3">
          <Link
            className="block border border-solid border-[#f1f1f1]"
            href={`/${handle}`}
          >
            <div className=" group">
              <div className="relative ">
                <div
                  className="relative !w-full bg-gray-100"
                  style={{ paddingBottom: "100%" }}
                ></div>
              </div>
            </div>
          </Link>
        </div>
        <div className="product-details flex-1">
          <Link
            href={`/${handle}`}
            className="js-product-details-link flex flex-col items-start"
          >
            <h3 className="flex text-sm font-thin uppercase">
              <span className="block">{handle}</span>
            </h3>
          </Link>
        </div>
      </>
    )
  }
  const variant = product.variants[0]

  const regularPrice = formatPrice(variant.original_price)
  const salePrice = formatPrice(variant.calculated_price)
  const isSale = variant.original_price > variant.calculated_price
  const thumb = variant.metadata.images[0]
  const title = t(product.title)
  return (
    <>
      <div className="relative w-1/3">
        <Link
          className="block border border-solid border-[#f1f1f1]"
          href={`/${handle}`}
        >
          <div className=" group">
            <div className="relative ">
              <div
                className="relative !w-full"
                style={{ paddingBottom: "100%" }}
              >
                <Image
                  className="lazyload-fade lazyautosizes lazyloaded  absolute inset-0 !h-full w-full object-contain p-[4%]"
                  sizes="123px"
                  width={123}
                  height={123}
                  alt={title}
                  src={thumb}
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="product-details flex-1">
        <Link
          href={`/${handle}`}
          className="js-product-details-link flex flex-col items-start"
        >
          <h3 className="flex uppercase">
            <span className="block">{title}</span>
          </h3>
          <dl className="price">
            <div className="price__pricing-group">
              <dl className="price__regular hidden">
                <dt className="visually-hidden visually-hidden--inline">
                  <span>{t("products.general.regular_price")}</span>
                </dt>
                <dd>
                  <span className="price-item price-item--regular">
                    {salePrice}
                  </span>
                </dd>
              </dl>
              <dl className="price__sale mb-3 flex items-baseline gap-2">
                <dt className="visually-hidden visually-hidden--inline">
                  <span>{t("products.general.sale")}</span>
                </dt>
                <dd>
                  <span className="price-item price-item--sale font-bold  text-[red]">
                    {salePrice}
                  </span>
                </dd>
                <dt className="visually-hidden visually-hidden--inline">
                  <span>{t("products.general.regular_price")}</span>
                </dt>
                {isSale && (
                  <dd>
                    <span className="price-item price-item--regular text-sm line-through">
                      {regularPrice}
                    </span>
                  </dd>
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
                <span className="visually-hidden visually-hidden--inline">
                  Unit Price
                </span>
              </dt>
              <dd className="price-unit-price">
                <span data-unit-price> </span>
                <span aria-hidden="true">/</span>
                <span className="visually-hidden">per</span>
                <span data-unit-price-base-unit />
              </dd>
            </dl>
          </dl>
        </Link>
      </div>
    </>
  )
}
const Item = ({ item, size, index }) => {
  const inputId = "post-" + index
  const [open, setOpen] = useState()
  return (
    <>
      <Link
        target="_blank"
        style={{ maxWidth: "calc((1200px - 3vw) / 4)" }}
        href={item.permalink}
        className="w-[40vw] md:w-[30vw] lg:w-[23vw]"
      >
        <img
          src={`https://shopify-app-instagram-feed.hieunguyen.dev/instagram-image?postId=${item.id}&username=designer_editions_uk `}
          loading="lazy"
          className="w-full bg-gray-50"
          width={400}
          height={400}
          alt="Designer Editions"
          sizes="287px"
        />
      </Link>
      <label
        className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50 text-xl text-white opacity-0 transition-opacity duration-700 group-hover:opacity-100 lg:text-3xl"
        htmlFor={inputId}
      >
        <svg
          fill="currentColor"
          height="1em"
          strokeWidth={0}
          stroke="currentColor"
          viewBox="0 0 448 512"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      </label>
      <input
        onChange={(e) => setOpen((state) => state || e.target.value)}
        className="modal-toggle"
        id={inputId}
        name="instagram"
        type="radio"
      />
      <label
        className="modal no-animation m-0 cursor-pointer bg-opacity-70 transition-none"
        htmlFor="post-none"
      >
        <label
          style={{ maxHeight: "855px" }}
          className="modal-box no-animation relative max-h-[100%] max-w-md overflow-auto rounded-none p-0 transition-none lg:flex lg:max-w-7xl"
        >
          <div className="relative top-0 aspect-square flex-1 border will-change-scroll lg:sticky">
            <img
              src={`https://shopify-app-instagram-feed.hieunguyen.dev/instagram-image?postId=${item.id}&username=designer_editions_uk `}
              loading="lazy"
              className="lazyload-fade lazyautosizes lazyloaded w-full"
              data-sizes="auto"
              width={400}
              height={400}
              alt="Designer Editions"
              sizes="609px"
            />
            <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between">
              <label
                className="btn btn-square btn-ghost btn-sm bg-black bg-opacity-30 p-1"
                htmlFor={
                  index === 0 ? `post-${size - 1}` : "post-" + (index - 1)
                }
              >
                <svg
                  className="rotate-180 "
                  height="1em"
                  viewBox="0 0 100 100"
                  width="1em"
                >
                  <path
                    className="arrow"
                    d="M 10,50 L 50,90 L 55,90 L 15,50 L 55,10 L 50,10 Z"
                    transform="translate(100, 100) rotate(180) "
                  />
                </svg>
              </label>
              <div className="flex-1" />
              <label
                className="btn btn-square btn-ghost btn-sm bg-black bg-opacity-30 p-1"
                htmlFor={index === size - 1 ? "post-0" : `post-${index + 1}`}
              >
                <svg height="1em" viewBox="0 0 100 100" width="1em">
                  <path
                    className="arrow"
                    d="M 10,50 L 50,90 L 55,90 L 15,50 L 55,10 L 50,10 Z"
                    transform="translate(100, 100) rotate(180) "
                  />
                </svg>
              </label>
            </div>
          </div>
          <div className="lg:w-[33%] lg:min-w-[400px]">
            <div className="relative flex items-center gap-3 p-3 pr-12">
              <div className="top-0 aspect-square w-12 will-change-scroll lg:sticky">
                <img
                  src="https://shopify-app-instagram-feed.hieunguyen.dev/instagram-image?postId=icon&username=designer_editions_uk "
                  loading="lazy"
                  className="lazyload-fade lazyautosizes lazyloaded w-full rounded-full"
                  data-src="https://shopify-app-instagram-feed.hieunguyen.dev/instagram-image?postId=icon&username=designer_editions_uk "
                  data-sizes="auto"
                  width={400}
                  height={400}
                  alt="Designer Editions"
                  sizes="48px"
                />
              </div>
              <Link
                className="flex-1 text-left"
                href="https://www.instagram.com/designer_editions_uk/"
                target="_blank"
              >
                <h3 className="!mb-1 !text-left text-lg font-bold leading-none">
                  designer_editions_uk
                </h3>
                <div className="text-sm leading-none text-gray-500">
                  designer_editions_uk
                </div>
              </Link>
              <label
                className="btn btn-square btn-ghost btn-sm absolute right-0 top-2 p-1"
                htmlFor="post-none"
              >
                <svg
                  aria-label="Close"
                  className="_8-yf5 "
                  color="#8e8e8e"
                  fill="#8e8e8e"
                  height={16}
                  role="img"
                  viewBox="0 0 24 24"
                  width={16}
                >
                  <line
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    x1={21}
                    x2={3}
                    y1={3}
                    y2={21}
                  />
                  <line
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    x1={21}
                    x2={3}
                    y1={21}
                    y2={3}
                  />
                </svg>
              </label>
            </div>
            <div className="w-full border-b" />
            <div className="space-y-3 p-3">
              <div className="space-y-3">
                {open &&
                  item.handles.map((item, i) => {
                    return (
                      <div key={i} className="flex gap-3">
                        <ProductItem handle={item} />
                      </div>
                    )
                  })}
              </div>
              <p
                className="whitespace-pre-line py-3"
                dangerouslySetInnerHTML={{ __html: item.caption }}
              ></p>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}
export const Instagram = ({ handle }: { handle?: string }) => {
  const { langCode } = useStore()
  const { data, isFetched } = useQuery(["instagram_home", handle], async () => {
    return await fetch(
      !handle ? "/api/instagram/home" : "/api/instagram/product",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          langCode,
          handle,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => res.data)
  })
  const t = useT()

  const isShow = isFetched && data && data?.length
  const srollerRef = useRef<HTMLElement>()

  if (!isShow) return null
  return (
    <div
      id="shopify-section-instafeed-homepage"
      className="shopify-section py-6"
    >
      <h2 className="my-6 text-center text-xl">
        {t("Shop Instagram - Less than humble about your abode?")}
      </h2>
      <div className="relative mx-auto block w-full max-w-[1264px] px-4 sm:px-8 ">
        <ul
          ref={srollerRef}
          className={classNames(
            "carousel carousel-center flex w-full gap-[1vw] ",
            data?.length < 4 ? "lg:justify-center" : ""
          )}
          role="list"
        >
          {isFetched &&
            data &&
            data?.map((item, i, arr) => {
              return (
                <li
                  key={i}
                  className="group carousel-item relative"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Item item={item} index={i} size={arr.length} />
                </li>
              )
            })}
        </ul>
        <input
          className="hidden "
          hidden
          id="post-none"
          name="instagram"
          type="radio"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n  scrolling-arrow-left,scrolling-arrow-right{\n  display:block\n  }s\n  ",
          }}
        />
        {data?.length > 4 && (
          <>
            <button
              onClick={() => {
                const sroller = srollerRef.current
                sroller.scrollLeft = sroller.scrollLeft - sroller.clientWidth
              }}
              className="pointer-events-auto absolute bottom-1/2 left-6 !m-0 h-8 w-8  translate-y-1/2 rotate-180 transform items-center justify-center rounded-full bg-base-100 bg-opacity-60 text-gray-500 hover:bg-opacity-100 hover:shadow"
            >
              <svg
                className="m-auto"
                width="1em"
                height="1em"
                fill="none"
                strokeWidth="0.03em"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8.14 14.74"
              >
                <g>
                  <polyline points="0.74 14.07 6.79 7.41 0.74 0.67" />
                </g>
              </svg>
            </button>
            <button
              onClick={() => {
                const sroller = srollerRef.current
                sroller.scrollLeft = sroller.scrollLeft + sroller.clientWidth
              }}
              className="pointer-events-auto absolute bottom-1/2 right-6 !m-0 flex h-8 w-8  translate-y-1/2 items-center justify-center rounded-full bg-base-100 bg-opacity-60 text-gray-500 hover:bg-opacity-100 hover:shadow"
            >
              <svg
                className="m-auto"
                width="1em"
                height="1em"
                fill="none"
                strokeWidth="0.03em"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8.14 14.74"
              >
                <g>
                  <polyline points="0.74 14.07 6.79 7.41 0.74 0.67" />
                </g>
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
export default Instagram
