"use client"
import { useStore } from "app/[locale]/context/store-context"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { T } from "../[locale]/context/sources"

const Image = dynamic(() => import("./Image"))

const saleDiffs = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 60, 70, 70, 80, 80,
]
const imagesByLang = {
  de: {
    25: "/images/2024-product-labels/de/25percent.png",
    30: "/images/2024-product-labels/de/30percent.png",
    35: "/images/2024-product-labels/de/35percent.png",
    40: "/images/2024-product-labels/de/40percent.png",
    50: "/images/2024-product-labels/de/50percent.png",
    55: "/images/2024-product-labels/de/55percent.png",
    60: "/images/2024-product-labels/de/60percent.png",
    65: "/images/2024-product-labels/de/65percent.png",
    70: "/images/2024-product-labels/de/70percent.png",
    80: "/images/2024-product-labels/de/80percent.png",
  },
  en: {
    25: "/images/2024-product-labels/en/25percent.png",
    30: "/images/2024-product-labels/en/30percent.png",
    35: "/images/2024-product-labels/en/35percent.png",
    40: "/images/2024-product-labels/en/40percent.png",
    50: "/images/2024-product-labels/en/50percent.png",
    55: "/images/2024-product-labels/en/55percent.png",
    60: "/images/2024-product-labels/en/60percent.png",
    65: "/images/2024-product-labels/en/65percent.png",
    70: "/images/2024-product-labels/en/70percent.png",
    80: "/images/2024-product-labels/en/80percent.png",
  },
  nl: {
    25: "/images/2024-product-labels/nlbe/25percent.png",
    30: "/images/2024-product-labels/nlbe/30percent.png",
    35: "/images/2024-product-labels/nlbe/35percent.png",
    40: "/images/2024-product-labels/nlbe/40percent.png",
    50: "/images/2024-product-labels/nlbe/50percent.png",
    55: "/images/2024-product-labels/nlbe/55percent.png",
    60: "/images/2024-product-labels/nlbe/60percent.png",
    65: "/images/2024-product-labels/nlbe/65percent.png",
    70: "/images/2024-product-labels/nlbe/70percent.png",
    80: "/images/2024-product-labels/nlbe/80percent.png",
  },
  no: {
    25: "/images/2024-product-labels/no/25percent.png",
    30: "/images/2024-product-labels/no/30percent.png",
    35: "/images/2024-product-labels/no/35percent.png",
    40: "/images/2024-product-labels/no/40percent.png",
    50: "/images/2024-product-labels/no/50percent.png",
    55: "/images/2024-product-labels/no/55percent.png",
    60: "/images/2024-product-labels/no/60percent.png",
    65: "/images/2024-product-labels/no/65percent.png",
    70: "/images/2024-product-labels/no/70percent.png",
    80: "/images/2024-product-labels/no/80percent.png",
  },
  sv: {
    25: "/images/2024-product-labels/sv/25percent.png",
    30: "/images/2024-product-labels/sv/30percent.png",
    35: "/images/2024-product-labels/sv/35percent.png",
    40: "/images/2024-product-labels/sv/40percent.png",
    50: "/images/2024-product-labels/sv/50percent.png",
    55: "/images/2024-product-labels/sv/55percent.png",
    60: "/images/2024-product-labels/sv/60percent.png",
    65: "/images/2024-product-labels/sv/65percent.png",
    70: "/images/2024-product-labels/sv/70percent.png",
    80: "/images/2024-product-labels/sv/80percent.png",
  },
  fi: {
    25: "/images/2024-product-labels/fi/25percent.png",
    30: "/images/2024-product-labels/fi/30percent.png",
    35: "/images/2024-product-labels/fi/35percent.png",
    40: "/images/2024-product-labels/fi/40percent.png",
    50: "/images/2024-product-labels/fi/50percent.png",
    55: "/images/2024-product-labels/fi/55percent.png",
    60: "/images/2024-product-labels/fi/60percent.png",
    65: "/images/2024-product-labels/fi/65percent.png",
    70: "/images/2024-product-labels/fi/70percent.png",
    80: "/images/2024-product-labels/fi/80percent.png",
  },
  fr: {
    25: "/images/2024-product-labels/fr/25percent.png",
    30: "/images/2024-product-labels/fr/30percent.png",
    35: "/images/2024-product-labels/fr/35percent.png",
    40: "/images/2024-product-labels/fr/40percent.png",
    50: "/images/2024-product-labels/fr/50percent.png",
    55: "/images/2024-product-labels/fr/55percent.png",
    60: "/images/2024-product-labels/fr/60percent.png",
    65: "/images/2024-product-labels/fr/65percent.png",
    70: "/images/2024-product-labels/fr/70percent.png",
    80: "/images/2024-product-labels/fr/80percent.png",
  },
  it: {
    25: "/images/2024-product-labels/it/25percent.png",
    30: "/images/2024-product-labels/it/30percent.png",
    35: "/images/2024-product-labels/it/35percent.png",
    40: "/images/2024-product-labels/it/40percent.png",
    50: "/images/2024-product-labels/it/50percent.png",
    55: "/images/2024-product-labels/it/55percent.png",
    60: "/images/2024-product-labels/it/60percent.png",
    65: "/images/2024-product-labels/it/65percent.png",
    70: "/images/2024-product-labels/it/70percent.png",
    80: "/images/2024-product-labels/it/80percent.png",
  },
  es: {
    25: "/images/2024-product-labels/es/25percent.png",
    30: "/images/2024-product-labels/es/30percent.png",
    35: "/images/2024-product-labels/es/35percent.png",
    40: "/images/2024-product-labels/es/40percent.png",
    50: "/images/2024-product-labels/es/50percent.png",
    55: "/images/2024-product-labels/es/55percent.png",
    60: "/images/2024-product-labels/es/60percent.png",
    65: "/images/2024-product-labels/es/65percent.png",
    70: "/images/2024-product-labels/es/70percent.png",
    80: "/images/2024-product-labels/es/80percent.png",
  },
}

export function SaleLabel({
  salepercent,
  type = "image",
}: {
  salepercent: string
  type?: string | undefined | null
}) {
  const { langCode } = useStore()
  const [error, setError] = useState(false)
  useEffect(() => {
    setError(false)
  }, [salepercent])
  let saleDiff =
    saleDiffs[(Number(salepercent.replace("%", "")) / 5).toFixed(0)]
  const langLower = langCode.toLowerCase()

  if (error) {
    return (
      <div className="absolute inset-0 aspect-square h-full w-full  rounded-full  border border-white  text-white  before:block before:w-full before:pt-[100%]">
        <Image
          width="100"
          height="100"
          disableLoader
          src={`/images/saleoff/EN/${saleDiff}-percent-off-en.png`}
          className="absolute inset-0 h-full w-full object-cover"
          alt="sale off"
        />
      </div>
    )
  }
  if (type === "image") {
    let imageUrl = imagesByLang[langLower][saleDiff]
    return (
      <div className="absolute inset-0 aspect-square h-full w-full  rounded-full  border border-white  text-white  before:block before:w-full before:pt-[100%]">
        <Image
          // onError={() => setError(true)}
          width="100"
          height="100"
          disableLoader
          src={imageUrl}
          className="absolute inset-0 h-full w-full object-cover"
          alt="sale off"
        />
      </div>
    )
  }
  if (type === "xmas-sale") {
    let upperLang = langCode.toUpperCase()
    let src = `/images/xmas-sale/${upperLang}/${
      langCode === "en" ? "UK" : langCode === "sv" ? "SE" : upperLang
    }-Xmas-Label-${saleDiff}Percent-off.png`

    return (
      <div className="absolute inset-0 aspect-square h-full w-full  rounded-full before:block before:w-full before:pt-[100%]">
        <Image
          // onError={() => setError(true)}
          width="120"
          height="120"
          disableLoader
          src={src}
          className="absolute inset-0 h-full w-full object-contain"
          alt="sale off"
        />
      </div>
    )
  }
  return (
    <div className="absolute inset-0 aspect-square h-full w-full  rounded-full border border-white text-white before:block  before:w-full  before:pt-[100%]  ">
      <div className="absolute inset-0 h-full w-full rounded-full" />
      <svg
        className="absolute inset-0 h-full w-full rounded-full border-[1.2px] "
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 200 200"
      >
        <circle cx={100} cy={100} r={100} fill="#ed2424" id="background" />
        <g>
          <path
            id="svg-text-top"
            d="M 0 50 H 200"
            fill="transparent"
            stroke="transparent"
          />
          <text
            className="text-top"
            fill="currentColor"
            fontSize="50px"
            x={100}
            y={10}
            textAnchor="middle"
            dominantBaseline="text-bottom"
          >
            <textPath
              xlinkHref="#svg-text-top"
              method="stretch"
              lengthAdjust="spacingAndGlyphs"
            >
              <T>{"Up to"}</T>
            </textPath>
          </text>
          <path
            id="svg-text"
            d="M 0 110 H 200"
            fill="transparent"
            stroke="transparent"
          />
          <text
            className="text-center font-heading"
            fill="currentColor"
            fontSize="90px"
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
              {salepercent}
            </textPath>
          </text>
          <path
            id="svg-text-bottom"
            d="M 0 180 H 200"
            fill="transparent"
            stroke="transparent"
          />
          <text
            className="text-bottom"
            fill="currentColor"
            fontSize="68px"
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
              <T>{"Off"}</T>
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  )
}
