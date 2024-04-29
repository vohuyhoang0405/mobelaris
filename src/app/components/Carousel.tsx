"use client"
import { PropsWithChildren, useEffect, useRef, useState } from "react"
const Dragable = ({ sliderWrap }: { sliderWrap: HTMLElement | null }) => {
  useEffect(() => {
    const slider = sliderWrap?.querySelector("ul") as HTMLElement
    console.log({ slider })
    if (!slider) return
    let isDown = false
    let startX: number
    let scrollLeft: number

    slider.addEventListener("mousedown", (e) => {
      isDown = true
      slider.classList.add("active")
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
    slider.addEventListener("mouseleave", () => {
      isDown = false
      slider.classList.remove("active")
    })
    slider.addEventListener("mouseup", () => {
      isDown = false
      slider.classList.remove("active")
    })
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 3 //scroll-fast
      slider.scrollLeft = scrollLeft - walk
    })
  }, [sliderWrap])
  return null
}
export default function Slider({ children }: PropsWithChildren<{}>) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hovered, setHovered] = useState(false)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!ref.current) return
    let timer: any = null
    let slider = ref.current
    const start = () => {
      const sroller = slider.querySelector("ul") as HTMLElement
      const arrowLeft = prevRef.current
      const arrowRight = nextRef.current
      if (arrowLeft && arrowRight) {
        arrowRight.addEventListener("click", () => {
          sroller.scrollLeft = sroller.scrollLeft + sroller.clientWidth
        })
        arrowLeft.addEventListener("click", () => {
          sroller.scrollLeft = sroller.scrollLeft - sroller.clientWidth
        })

        const valid = () => {
          if (sroller.scrollLeft === 0) {
            arrowLeft.disabled = true
          } else {
            arrowLeft.disabled = false
          }
          if (
            sroller.scrollLeft + sroller.clientWidth ===
            sroller.scrollWidth
          ) {
            arrowRight.disabled = true
          } else {
            arrowRight.disabled = false
          }
        }
        sroller.addEventListener(
          "scroll",
          () => {
            if (timer !== null) {
              clearTimeout(timer)
            }
            timer = setTimeout(valid, 150)
          },
          false
        )

        valid()
      }
    }
    const handleIntersection = (entries: any[], observer: any) => {
      if (!entries[0].isIntersecting) return
      observer.unobserve(slider)
      start()
    }
    new IntersectionObserver(handleIntersection.bind(slider), {
      rootMargin: "0px 0px 500px 0px",
    }).observe(slider)
  }, [])

  return (
    <div
      ref={ref}
      className="group/slider relative"
      onMouseDown={() => {
        !hovered && setHovered(true)
      }}
    >
      {hovered && <Dragable sliderWrap={ref.current} />}
      {children}
      <button
        ref={prevRef}
        disabled
        data-rold="scrolling-arrow-left"
        className="!pointer-events-auto absolute -left-4 bottom-1/2 m-0  !h-10 !w-10 translate-y-1/2 scale-0 transform items-center justify-center rounded-full   bg-gray-200    bg-opacity-60   text-2xl  text-gray-500     transition-all hover:bg-opacity-100  hover:shadow-lg  disabled:!scale-0  group-hover/slider:scale-100 "
      >
        <svg
          className="m-auto rotate-180 transform"
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
        ref={nextRef}
        data-rold="scrolling-arrow-right"
        className="!pointer-events-auto absolute -right-4 bottom-1/2 m-0  !h-10 !w-10 translate-y-1/2 scale-0 transform items-center justify-center rounded-full  bg-gray-200  bg-opacity-60  text-2xl   text-gray-500    transition-all  hover:bg-opacity-100  hover:shadow-lg disabled:!scale-0  group-hover/slider:scale-100 "
      >
        <svg
          className="m-auto "
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
    </div>
  )
}
