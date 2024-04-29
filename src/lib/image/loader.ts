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
  quality = 80,
}: ImageLoaderProps) {
  if (src.includes("res.cloudinary.com")) {
    let newSrc = repalceImage(src)
    if (width) {
      newSrc = newSrc.replace(
        "/image/upload/",
        `/image/upload/e_trim,w_${width},c_limit,q_auto,`
      )
    } else {
      newSrc = newSrc.replace(
        "/image/upload/",
        `/image/upload/e_trim,c_limit,q_auto,`
      )
    }
    return newSrc
  }
  return src
}
