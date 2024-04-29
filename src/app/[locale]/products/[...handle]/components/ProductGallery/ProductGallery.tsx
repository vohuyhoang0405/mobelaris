import { repalceImage } from "@lib/image/loader"
import Image from "app/components/Image"
import clsx from "clsx"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css" // This only needs to be imported once in your app
import { useProduct, useVariant } from "../index"
const getVideoid = (src: string) => {
  return src.substring(src.lastIndexOf("/") + 1).split("?")[0]
}
const ProductGallery = () => {
  const variant = useVariant()
  const product = useProduct()
  const images = variant.images.map((item) => {
    return {
      ...item,
      type: "image",
      src: repalceImage(item.src).replace("http://", "https://"),
    }
  })
  if (variant?.metadata?.dimension_image) {
    images.push({
      alt: "dimension image",
      type: "image",
      src: repalceImage(variant?.metadata?.dimension_image),
    })
  }

  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  let videoid = variant?.metadata.video && getVideoid(variant?.metadata?.video)
  const videos =
    variant?.metadata?.videos?.map((src) => ({
      type: "video",
      src,
      thumb: `https://fast.wistia.net/embed/medias/${getVideoid(src)}/swatch`,
    })) ||
    (videoid && [
      {
        type: "video",
        src: `https://fast.wistia.net/embed/medias/${videoid}`,
        thumb: `https://fast.wistia.net/embed/medias/${videoid}/swatch`,
      },
    ]) ||
    []
  useEffect(() => {
    setIndex(0)
  }, [variant])
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setIndex(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  let alt = `${product?.title} ${variant?.title} image.`
  const media = [...images, ...videos]

  const renderMedia = (item, i) => {
    if (item.type === "video") {
      return (
        <li
          key={item.src}
          className="keen-slider__slide keen-slider-product-template-keen-slider__slide relative isolate"
          style={{
            minWidth: "calc(100% - 0px)",
            maxWidth: "calc(100% - 0px)",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        >
          <img
            loading="lazy"
            onLoad={(e) => {
              document.querySelector("#wistia_embed")
            }}
            className="absolute inset-0 -z-10 h-full w-auto object-cover opacity-0 blur-sm animatecss animatecss-fadeIn"
            alt={alt}
            sizes={"100px"}
            src={item.thumb}
          />
          {isVideo && i === index && (
            <div className="absolute inset-0 flex h-full w-full items-end justify-center">
              <iframe
                loading="lazy"
                src={item.src}
                id="wistia_embed"
                allowFullScreen
                width={1000}
                height={440}
                className="wistia_embed h-full max-h-full animatecss animatecss-slower animatecss-fadeIn"
                style={{
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          )}
        </li>
      )
    }
    if (item.type === "image") {
      const img = item
      return (
        <li
          key={img.src}
          className="keen-slider__slide keen-slider-product-template-keen-slider__slide relative"
          style={{
            minWidth: "calc(100% - 0px)",
            maxWidth: "calc(100% - 0px)",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        >
          <a
            target="_blank"
            className="absolute inset-0 z-20 flex h-full w-full cursor-[zoom-in] items-center justify-center "
            data-fancybox="product-7658273276131"
            title="click to zoom-in"
            href={img.src}
            itemProp="contentUrl"
            tabIndex={-1}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setOpen(true)
            }}
            rel="noreferrer"
          />
          <Image
            priority={i <= index + 1}
            quality={100}
            className="absolute inset-0 !h-full !w-full object-contain p-3"
            width={1440}
            height={792}
            sizes="(min-width: 1200px) calc((100vw - 440px)),  calc((100vw - 35px))"
            alt={alt}
            src={img.src}
          />
        </li>
      )
    }
    return null
  }
  const isVideo = media[index]?.type === "video"
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n .ril__toolbarRightSide{  height:44px;  padding-right: 0px;background:#0000005e} .ril__builtinButton{width:44px;height:44px;display:flex} .ril__toolbar{background:transparent} .ril__outer{background:white!important} #keen-slider-product-template.keen-slider{\n display: flex;\n -webkit-user-select: none;\n -moz-user-select: none;\n -ms-user-select: none;\n user-select: none;\n -webkit-touch-callout: none;\n -khtml-user-select: none;\n touch-action: pan-y;\n -webkit-tap-highlight-color: transparent;\n position: absolute;\n }\n\n .keen-slider>* {\n position: relative;\n width: 100%;\n min-height: 100%;\n flex-shrink: 0;\n }\n .keen-slider[data-keen-slider-v] {\n flex-wrap: wrap;\n }\n .keen-slider[data-keen-slider-v]>* {\n width: 100%;\n }\n\n .keen-slider[data-keen-slider-moves] * {\n pointer-events: none;\n }\n\n .keen-slider>* {\n display: flex;\n align-items: center;\n justify-content: center;\n font-size: 50px;\n font-weight: 500;\n height: 100%;\n }\n #keen-slider-product-template .keen-slider__slide img{\n margin: auto;\n }\n .keen-slider-product-template-dots{\n display: flex; \n justify-content: center;\n overflow: hidden; }\n .keen-slider-product-template-dots .dot{\n color: #cecece;\n overflow: hidden;\n }\n .keen-slider-product-template-dots .dot--active{\n color: #000;\n }\n .arrow--disabled{\n display: none;\n }\n",
        }}
      />
      <div className="relative pt-6">
        <div className="relative -mx-4 overflow-hidden pb-[50%] sm:-mx-8 sm:h-[280px] md:h-[340px] md:pb-0 lg:mx-0 lg:h-[440px]">
          <ul
            key={variant.id}
            ref={sliderRef}
            className="keen-slider absolute inset-0 h-full w-full transition-transform duration-700 ease-in-out md:relative"
            id="keen-slider-product-template"
          >
            {media.map(renderMedia)}
          </ul>
          {loaded && instanceRef?.current?.track.details && (
            <div className="pointer-events-none absolute -left-8 -right-8 top-0 hidden h-full items-center justify-between px-8 lg:flex">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  instanceRef.current?.prev()
                }}
                disabled={index === 0}
                aria-label="preview"
                className="pointer-events-auto m-0 flex h-10 w-10 items-center justify-center rounded-full bg-transparent !text-2xl text-black hover:bg-gray-100 disabled:invisible "
              >
                <svg height="1em" viewBox="0 0 100 100" width="1em">
                  <path
                    className="arrow"
                    d="M 10,50 L 50,90 L 55,90 L 15,50 L 55,10 L 50,10 Z"
                  />
                </svg>
              </button>
              <div className="flex-1" />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  instanceRef.current?.next()
                }}
                aria-label="next"
                disabled={
                  index ===
                  Number(instanceRef?.current?.track.details.slides.length) - 1
                }
                className="pointer-events-auto m-0 flex h-10 w-10 items-center justify-center rounded-full bg-transparent !text-2xl text-black hover:bg-gray-100 disabled:invisible"
              >
                <svg height="1em" viewBox="0 0 100 100" width="1em">
                  <path
                    className="arrow"
                    d="M 10,50 L 50,90 L 55,90 L 15,50 L 55,10 L 50,10 Z"
                    transform="translate(100, 100) rotate(180) "
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div
          className="keen-slider-product-template-dots mb-6 mt-6 flex h-auto min-h-[65px] flex-wrap items-center justify-center gap-2 border-y py-2 lg:min-h-[115px]"
          id="keen-slider-product-template-dots"
          key={variant.id}
        >
          {loaded &&
            instanceRef?.current?.track.details &&
            new Array(media.length).fill(true).map((_, idx) => {
              let i = idx
              const img = media[i]
              if (!img) return null
              if (img.type === "video")
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    className={clsx(
                      "dot relative h-[47px] max-w-[180px] flex-1 border  border-gray-100 transition-colors ease-in-out  hover:bg-opacity-70 lg:h-[87px] lg:w-[54px] "
                    )}
                  >
                    <img
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover blur-sm animatecss animatecss-fadeIn"
                      width={52}
                      height={52}
                      alt={alt}
                      sizes={"100px"}
                      src={img.thumb}
                    />
                    <div className="absolute flex h-full w-full items-center justify-center text-3xl text-black opacity-50">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 16 16"
                        height="40%"
                        width="34"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                      </svg>
                    </div>
                  </div>
                )
              return (
                <div
                  key={img.src}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={clsx(
                    "dot relative h-[47px] max-w-[180px]  flex-1 bg-gray-100 bg-opacity-0  transition-colors ease-in-out  hover:bg-opacity-70 lg:h-[87px] lg:w-[54px] ",
                    index === idx
                      ? "!border-black bg-gray-200 !bg-opacity-100 !text-black"
                      : "text-gray-300"
                  )}
                >
                  <div className="h-full w-full ">
                    <Image
                      loading="lazy"
                      className="absolute inset-0 !h-full !w-full object-contain p-[4%]  animatecss animatecss-fadeIn"
                      width={200}
                      height={160}
                      alt={alt}
                      sizes={"200px"}
                      src={img?.src}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      {open && (
        <Lightbox
          onImageLoad={() => {
            window.dispatchEvent(new Event("resize"))
          }}
          mainSrc={images[index].src}
          nextSrc={images[(index + 1) % images.length].src}
          prevSrc={images[(index + images.length - 1) % images.length].src}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() =>
            setIndex((index + images.length - 1) % images.length)
          }
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )}
    </>
  )
}
export default ProductGallery
