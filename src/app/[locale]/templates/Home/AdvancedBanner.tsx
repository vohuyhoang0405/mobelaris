"use client"
import useWindowDimensions from "app/[locale]/hooks/useWindowDimensions"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import allFonts from "styles/fonts"
import {
  HomepageBlocksHeroCustomBlock,
  HomepageBlocksHeroCustomBlockDesktopFields,
} from "../../../../../tina/__generated__/types"
import { CountDown } from "./CountDown"
function transferToStyleObj(obj = {}, prefix = "--") {
  return Object.keys(obj).reduce((result, value) => {
    result[`${prefix}${value}`] = obj[value] + "%"
    return result
  }, {})
}
const Text = ({
  text,
  color,

  ...props
}: HomepageBlocksHeroCustomBlockDesktopFields) => {
  let countdownpostion = {}
  let style = {}
  try {
    countdownpostion = JSON.parse(props.position)
    style = transferToStyleObj(countdownpostion)
  } catch (error) {
    console.error(error)
  }
  return (
    <text
      fill={color || "currentColor"}
      x={countdownpostion.left + "%"}
      y={countdownpostion.top + "%"}
      style={{
        fontSize: countdownpostion.width + "%",
        fontFamily: allFonts[countdownpostion.font]?.style.fontFamily,
      }}
    >
      {text}
    </text>
  )
}
const AdvancedBanner = (props: HomepageBlocksHeroCustomBlock) => {
  const bgDesktop = props.desktop?.bg
  const bgMobile = props.mobile?.bg_mobile
  let datetime = props.datetime
  const link = props.link
  const { width } = useWindowDimensions()
  let countdownpostion = {}
  let mobilecountdownpostion = {}
  try {
    countdownpostion = JSON.parse(props.desktop?.countdown_postion)
    mobilecountdownpostion = JSON.parse(props.mobile?.mobile_countdown_postion)
  } catch (error) {
    console.error(error)
  }
  const isLargeScreen = width && width >= 1024
  let fontclass = allFonts[countdownpostion["font"]]?.className
  let videoUrl =
    width &&
    (isLargeScreen ? props.desktop?.video_link : props.mobile?.video_link)
  const isGif = bgDesktop?.includes(".gif")
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

      {!!videoUrl &&
        (isLargeScreen ? (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">
            <div className=" w-full min-w-[1333.3px]">
              <div className="relative pb-[100%]">
                <iframe
                  key={videoUrl}
                  loading="lazy"
                  src={videoUrl}
                  title="Mobelaris video"
                  allow="autoplay; fullscreen"
                  width={1920}
                  height={720}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">
            <iframe
              key={videoUrl}
              loading="lazy"
              src={videoUrl}
              title="Mobelaris video"
              allow="autoplay; fullscreen"
              width={600}
              height={750}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </div>
        ))}
      {bgDesktop && (
        <Image
          priority={!isGif && true}
          unoptimized={isGif}
          className="hidden w-full lg:block"
          alt="banner"
          fill
          quality={100}
          sizes="1440px"
          src={bgDesktop}
        />
      )}
      {bgMobile && (
        <Image
          priority={!isGif && true}
          unoptimized={isGif}
          className="block w-full lg:hidden"
          fill
          quality={100}
          alt=""
          sizes="600px"
          src={bgMobile}
        />
      )}
      {!!datetime && (
        <CountDown
          key={datetime}
          datetime={datetime}
          style={{
            color: props.color,
            ...(isLargeScreen
              ? transferToStyleObj(countdownpostion, "")
              : transferToStyleObj(mobilecountdownpostion, "")),
          }}
        />
      )}
      {!!width && isLargeScreen && (
        <svg
          className="absolute inset-0 h-full w-full"
          style={{ fontSize: "300px" }}
          viewBox="0 0 1920 720"
          xmlns="http://www.w3.org/2000/svg"
        >
          {props.desktop?.fields?.map((field, i) => {
            return <Text key={i} {...field} />
          })}
        </svg>
      )}
      {!!width && !isLargeScreen && (
        <svg
          className="absolute inset-0 h-full w-full"
          style={{ fontSize: "300px" }}
          viewBox="0 0 600 750"
          xmlns="http://www.w3.org/2000/svg"
        >
          {props.mobile?.fields?.map((field, i) => {
            return <Text key={i} {...field} />
          })}
        </svg>
      )}
    </Link>
  )
}
export default AdvancedBanner
