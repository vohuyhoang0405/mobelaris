"use client"
import clsx from "clsx"
import NextImage, { ImageProps } from "next/image"
import myImageLoader from "../helper/image/loader"
export default function Image({
  src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
  width,
  sizes,
  disableLoader,
  priority,
  alt = "image",
  ...img
}: ImageProps & { disableLoader?: boolean }) {
  return (
    <NextImage
      {...img}
      fill={!width}
      width={width}
      loader={
        !disableLoader
          ? ({ width: iw, ...rest }) => {
              return myImageLoader({ width: Math.min(iw, width), ...rest })
            }
          : undefined
      }
      priority={priority}
      loading={priority ? undefined : "lazy"}
      alt={alt}
      src={src}
      style={{ transform: "translate3d(0, 0, 0)" }}
      onLoad={(e) => {
        e.currentTarget.classList.remove("opacity-0")
      }}
      onLoadStart={(e) => {
        e.currentTarget.classList.add("opacity-0")
      }}
      className={clsx(
        "ease-in-out! transition-opacity  duration-700",
        img.className
      )}
      sizes={sizes}
    />
  )
}
