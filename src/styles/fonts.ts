import localFont from "next/font/local"

const fontheading = localFont({
  src: "../../public/fonts/Verlag Black.otf",
  variable: "--font-heading",
  display: "swap",
  adjustFontFallback: "Arial",
})
const fontbody = localFont({
  src: "../../public/fonts/calibril.woff",
  variable: "--font-body",
  adjustFontFallback: "Arial",
  display: "swap",
})

const fonttitle = localFont({
  src: "../../public/fonts/Verlag-Bold.woff",
  variable: "--font-title",
  adjustFontFallback: "Arial",
  display: "swap",
})
const fontbutton = localFont({
  src: "../../public/fonts/Calibre-Regular.woff",
  variable: "--font-button",
  adjustFontFallback: "Arial",
  display: "swap",
})
const arialBlack = localFont({
  src: "../../public/fonts/ariblk.ttf",
  variable: "--font-arialBlack",
  adjustFontFallback: "Arial",
  display: "swap",
})

const allFonts = {
  fontheading,
  fontbody,
  fonttitle,
  fontbutton,
  arialBlack,
  "Verlag Black": fontheading,
  calibril: fontbody,
  "Verlag-Bold": fonttitle,
  "Calibre-Regular": fontbutton,
}
export { fontbody, fontbutton, fontheading, fonttitle }

export default allFonts
