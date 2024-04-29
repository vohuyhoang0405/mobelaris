import { useT } from "app/[locale]/context/sources"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useState } from "react"
import Trustpilot from "."
import data from "./data"
const reviews = data.reviews
const Reviews = () => {
  const t = useT()
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,

    created: function (instance) {
      document
        .getElementById("keen-slider-16195080989caa835d-arrow-left")
        ?.addEventListener("click", function () {
          instance.prev()
        })

      document
        .getElementById("keen-slider-16195080989caa835d-arrow-right")
        ?.addEventListener("click", function () {
          instance.next()
        })

      setLoaded(true)
      instance.track.details.slidesLength
      updateClasses(instance)
    },
    slideChanged(instance) {
      updateClasses(instance)
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
        mode: "free-snap",
      },
      "(min-width: 900px)": {
        slides: {
          perView: 3,
          spacing: 15,
        },
        mode: "free-snap",
      },
    },
  })
  function updateClasses(instance) {
    var slide = instance.track.details.rel
    var size = instance.track.details.slidesLength
    var arrowLeft = document.getElementById(
      "keen-slider-16195080989caa835d-arrow-left"
    )
    var arrowRight = document.getElementById(
      "keen-slider-16195080989caa835d-arrow-right"
    )
    slide === 0
      ? arrowLeft?.classList.add("arrow--disabled")
      : arrowLeft?.classList.remove("arrow--disabled")
    slide === size
      ? arrowRight?.classList.add("arrow--disabled")
      : arrowRight?.classList.remove("arrow--disabled")
  }
  return (
    <div>
      <div className="items-center bg-[color:var(--section-bg)] py-16">
        <div className=" mx-auto flex w-full max-w-[1264px] flex-col px-4 sm:px-8 lg:grid-cols-2">
          <div className="flex flex-1 flex-col items-center space-y-8 text-center">
            <div>
              <h2 className="mb-0 text-2xl font-bold">
                {t(`WHAT BUYERS ARE SAYING`)}
              </h2>
              <a
                className="pt-2"
                href="https://www.trustpilot.com/review/www.mobelaris.com"
                target="_blank"
              >
                <Trustpilot />
              </a>
            </div>
            <div className="max-w-prose "></div>
          </div>
          <div className="relative w-full">
            <div
              ref={sliderRef}
              className="keen-slider keen-slider-16195080989caa835d -mx-6 flex items-stretch md:w-full"
            >
              {reviews.map((review, i) => {
                const block = review
                return (
                  <div key={i} className="keen-slider__slide min-h-full p-6 ">
                    <blockquote className="min-h-full space-y-2 ">
                      <div className="flex items-center justify-between gap-3 p-0 font-bold">
                        <div>
                          {block.consumer.displayName}
                          <div className="text-xs">
                            {new Date(
                              block.dates.publishedDate
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <img
                          className=" inline h-[16px] object-contain"
                          src="/stars-5.svg"
                          width={85}
                          height={16}
                        ></img>
                      </div>
                      <div
                        className="p-0 font-heading text-lg"
                        dangerouslySetInnerHTML={{
                          __html: t(block.title),
                        }}
                      ></div>
                      <div
                        className="line p-0"
                        dangerouslySetInnerHTML={{
                          __html: t(block.text),
                        }}
                      ></div>
                    </blockquote>
                  </div>
                )
              })}
            </div>
            <div className="pointer-events-none absolute left-0 right-0 top-0 flex h-full items-center justify-between lg:-left-8 lg:-right-8">
              <button
                className="arrow--disabled pointer-events-auto m-0 ml-[-12px] flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-80 !text-xl text-black shadow-lg hover:bg-gray-100 hover:shadow-lg lg:ml-0 lg:shadow-none"
                id="keen-slider-16195080989caa835d-arrow-left"
              >
                <svg
                  fill="black"
                  height="1em"
                  stroke="balck"
                  viewBox="0 0 100 100"
                  width="1em"
                >
                  <path
                    d="M 10,50 L 50,90 L 55,90 L 15,50 L 55,10 L 50,10 Z"
                    fill="black"
                    stroke="balck"
                  />
                </svg>
              </button>
              <div className="flex-1" />
              <button
                className="pointer-events-auto m-0 mr-[-12px] flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-80 !text-xl text-black shadow-lg hover:bg-gray-100 hover:shadow-lg lg:mr-0 lg:shadow-none"
                id="keen-slider-16195080989caa835d-arrow-right"
              >
                <svg
                  fill="black"
                  height="1em"
                  stroke="balck"
                  viewBox="0 0 100 100"
                  width="1em"
                >
                  <path
                    d="M 10,50 L 50,90 L 55,90 L 15,50 L 55,10 L 50,10 Z"
                    fill="black"
                    stroke="balck"
                    transform="translate(100, 100) rotate(180) "
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reviews
