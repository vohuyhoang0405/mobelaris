"use client"
import useWindowDimensions from "app/[locale]/hooks/useWindowDimensions"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import allFonts from "styles/fonts"
import {
  HomepageBlocksHero,
  HomepageBlocksHeroFields,
} from "../../../../../tina/__generated__/types"
import { CountDown } from "./CountDown"
function transferToStyleObj(obj = {}, prefix = "--") {
  return Object.keys(obj).reduce((result, value) => {
    result[`${prefix}${value}`] = obj[value] + "%"
    return result
  }, {})
}
const Field = ({
  text,
  text_postion_desktop,
  text_postion_mobile,
  isLargeScreen,
}: HomepageBlocksHeroFields & { isLargeScreen: boolean }) => {
  let countdownpostion = {}
  let mobilecountdownpostion = {}
  let style = {}
  try {
    countdownpostion = JSON.parse(text_postion_desktop)
    mobilecountdownpostion = JSON.parse(text_postion_mobile)
    style = {
      ...(isLargeScreen
        ? transferToStyleObj(countdownpostion, "")
        : transferToStyleObj(mobilecountdownpostion, "")),
    }
  } catch (error) {
    console.error(error)
  }
  let fontclass = allFonts[countdownpostion?.["font"]]?.className || ""

  let fontSize = style["font-size"]
  let finalStyle = {
    ...style,
    fontSize,
  }
  delete finalStyle["font-size"]
  let textSize = 200 / (text?.length || 1) + "px"
  return (
    <svg
      style={finalStyle}
      className={clsx(
        fontclass,
        "absolute flex w-full justify-center gap-2 animatecss animatecss-fadeIn lg:w-auto"
      )}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 200 200"
    >
      <circle cx={100} cy={100} r={100} fill="transparent" id="background" />
      <g>
        <path
          id="svg-text"
          d="M 0 110 H 200"
          fill="transparent"
          stroke="transparent"
        />
        <text
          fill="currentColor"
          fontSize={textSize}
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
            {text}
          </textPath>
        </text>
      </g>
    </svg>
  )
}
const Banner = ({
  datetime,
  link = "#",
  countdown_postion,
  mobile_countdown_postion,
  bg,
  bg_mobile,
  fields,
  color,
}: HomepageBlocksHero) => {
  const bgDesktop = bg
  const bgMobile = bg_mobile
  const { width } = useWindowDimensions()
  let countdownpostion = {}
  let mobilecountdownpostion = {}
  try {
    countdownpostion = JSON.parse(countdown_postion)
    mobilecountdownpostion = JSON.parse(mobile_countdown_postion)
  } catch (error) {
    console.error(error)
  }
  const isLargeScreen = width && width >= 1024
  let fontclass = allFonts[countdownpostion["font"]]?.className
  return (
    <Link
      href={link || "/"}
      className={clsx(
        "relative isolate block w-full bg-slate-100 pb-[125%] lg:pb-[37.5%]",
        fontclass
      )}
    >
      {/* {style && style.length && (
        <style dangerouslySetInnerHTML={{ __html: style }}></style>
      )} */}
      {bgDesktop && (
        <Image
          priority={true}
          className="hidden w-full lg:block "
          alt="banner"
          fill
          quality={100}
          sizes="1440px"
          src={bgDesktop}
        />
      )}
      {bgMobile && (
        <Image
          priority={true}
          className="block w-full lg:hidden"
          fill
          quality={100}
          alt=""
          sizes="600px"
          src={bgMobile}
        />
      )}

      {datetime && (
        <CountDown
          key={datetime}
          datetime={datetime}
          style={{
            color: color,
            ...(isLargeScreen
              ? transferToStyleObj(countdownpostion, "")
              : transferToStyleObj(mobilecountdownpostion, "")),
          }}
        />
      )}
      {fields &&
        fields.map((field, i) => {
          return <Field isLargeScreen={isLargeScreen} key={i} {...field} />
        })}
    </Link>
  )
}
export default Banner
