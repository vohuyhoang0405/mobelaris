// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
// export default function cloudinaryLoader({ src, width, quality }) {
//   const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
//   return `https://example.com/${params.join(',')}${src}`

import { ImageLoaderProps } from "next/image"

export const repalceImage = (src: string) =>
  src.replace("res.cloudinary.com", "imageproxy.mobelaris.com/api/images")
export default function myImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  let newSrc = repalceImage(src)
  newSrc = newSrc.replace("old.mobelaris.com", `www.mobelaris.com`)
  newSrc = newSrc.replace("http://", `https://`)
  if (newSrc.includes("/e_trim/")) {
    if (width) {
      newSrc = newSrc.replace(
        "/image/upload/e_trim/",
        `/image/upload/e_trim,w_${width}/`
      )
    }
  } else if (newSrc.includes("/e_trim,f_auto/")) {
    if (width) {
      newSrc = newSrc.replace(
        "/image/upload/e_trim,f_auto/",
        `/image/upload/e_trim,w_${width}/`
      )
    }
  } else if (newSrc.includes("/e_trim,")) {
    if (width) {
      newSrc = newSrc.replace(
        "/image/upload/e_trim,",
        `/image/upload/e_trim,w_${width},`
      )
    }
  } else if (newSrc.includes("/f_auto/")) {
    if (width) {
      newSrc = newSrc.replace(
        "/image/upload/f_auto/",
        `/image/upload/e_trim,w_${width}/`
      )
    }
  } else {
    if (width) {
      newSrc = newSrc.replace(
        "/image/upload/",
        `/image/upload/e_trim,w_${width}/`
      )
    } else {
      newSrc = newSrc.replace("/image/upload/", `/image/upload/e_trim/`)
    }
  }
  return newSrc
}
