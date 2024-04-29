"use client"
import { useT } from "app/[locale]/context/sources"
import React, { memo, useEffect, useState } from "react"
export function padZeros(string: string) {
  return string.padStart(2, "0")
}
interface CountDownProps {
  datetime: string
  style?: any
}
interface Time {
  days: string
  ready: boolean
  hours: string
  minutes: string
  seconds: string
}
const TimeCol = ({ time, text }: { time: string; text: string }) => {
  return (
    <svg
      className=" inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 200 200"
    >
      <circle cx={100} cy={100} r={100} fill="transparent" id="background" />
      <g>
        <path
          id="svg-text-top"
          d="M 0 65 H 200"
          fill="transparent"
          stroke="transparent"
        />

        <path
          id="svg-text"
          d="M 0 110 H 200"
          fill="transparent"
          stroke="transparent"
        />
        <text
          fill="currentColor"
          fontSize="130px"
          x={100}
          y={100}
          dy="15px"
          textAnchor="middle"
        >
          <textPath
            xlinkHref="#svg-text"
            method="stretch"
            lengthAdjust="spacingAndGlyphs"
          >
            {time}
          </textPath>
        </text>
        <path
          id="svg-text-bottom"
          d="M 0 185 H 200"
          fill="transparent"
          stroke="transparent"
        />
        <text
          fill="currentColor"
          fontSize="30"
          x={100}
          y={140}
          textAnchor="middle"
          dominantBaseline="text-bottom"
        >
          <textPath
            xlinkHref="#svg-text-bottom"
            method="stretch"
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
      </g>
    </svg>
  )
}
export const CountDown: React.FC<CountDownProps> = memo(
  ({ datetime, style }) => {
    const t = useT()
    const [time, setTime] = useState<Time>({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      ready: false,
    })
    const text = {
      days: t("days"),
      hours: t("hours"),
      minutes: t("minutes"),
      seconds: t("seconds"),
    }
    const { days, hours, minutes, seconds, ready } = time
    useEffect(() => {
      if (!datetime) {
        return
      }
      function addHours(date: Date, h: number) {
        date.setTime(date.getTime() + h * 60 * 60 * 1000)
        return date
      }
      // Set the date we're counting down to
      const date = new Date(datetime)
      const countDownDate = addHours(date, 7).getTime()
      const now = new Date().getTime()
      const distance = countDownDate - now
      if (distance <= 0) {
        return
      }

      const x = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownDate - now
        if (distance > 0) {
          setTime((state) => ({ ...state, ready: false }))
        }

        const days = padZeros(
          String(Math.floor(distance / (1000 * 60 * 60 * 24)))
        )
        const hours = padZeros(
          String(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          )
        )
        const minutes = padZeros(
          String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
        )
        const seconds = padZeros(
          String(Math.floor((distance % (1000 * 60)) / 1000))
        )

        setTime(() => ({
          days,
          minutes,
          hours,
          seconds,
          ready: true,
        }))
      }, 1000)

      return () => {
        x && clearInterval(x)
      }
    }, [datetime])
    if (!ready) return null
    let fontSize = style["font-size"]
    let finalStyle = {
      ...style,
      fontSize,
    }
    delete finalStyle["font-size"]
    return (
      <div className="text-[16vw] lg:text-[38px]">
        <div
          id="countDownDate-wrap"
          className="absolute flex w-full justify-center gap-2 animatecss animatecss-fadeIn lg:w-auto"
          style={finalStyle}
        >
          <span
            id="countDownDate"
            className="flex min-w-full justify-center gap-2 text-[200%]  uppercase leading-[1.8] "
          >
            <div className="relative flex flex-1 flex-shrink-0 flex-col items-center justify-center">
              <TimeCol time={days} text={text.days} />
            </div>
            <div className="flex items-center">:</div>
            <div className="relative flex flex-1 flex-shrink-0 flex-col items-center justify-center">
              <TimeCol time={hours} text={text.hours} />
            </div>
            <div className="flex items-center">:</div>
            <div className="relative flex flex-1 flex-shrink-0 flex-col items-center justify-center">
              <TimeCol time={minutes} text={text.minutes} />
            </div>
            <div className="flex items-center">:</div>
            <div className="relative flex flex-1 flex-shrink-0 flex-col items-center justify-center">
              <TimeCol time={seconds} text={text.seconds} />
            </div>
          </span>
        </div>
      </div>
    )
  }
)
