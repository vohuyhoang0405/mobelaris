import { SITE_URL } from "@lib/constants"
import { Metadata } from "next"
import "server-only"
import { LocaleType } from "types/global"
import { Region } from "types/medusa"
import favicon from "./assets/images/favicon.png"
import { i18n, locales, localsMap } from "./i18n"
export * from "./i18n"

export const createAlternates = ({
  pathname,
  currentLocale,
}: {
  pathname: string
  currentLocale: LocaleType
}) => {
  return {
    canonical: SITE_URL + "/en" + pathname,
    languages: locales.reduce((result: { [key: string]: string }, locale) => {
      if (locale === "uk") {
        return result
      }
      if (locale === "en") {
        return result
      }
      if (locale === "eu") {
        result["en-eu"] = `${SITE_URL}/${locale}${pathname}`
        return result
      }
      result[locale] = `${SITE_URL}/${locale}${pathname}`
      return result
    }, {}),
  }
}
const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mobelaris",
    template: "%s | Mobelaris",
  },
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
    apple: favicon.src,
    other: {
      rel: "favicon",
      url: favicon.src,
    },
  },
  verification: {
    google: "2oY50k5LLeuQrWmbZU7Dr6MHk0Z1t3FYCn2hqcQhy2Y",
  },
  description:
    "Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
  keywords:
    "Mid Century Furniture, Designer, Affordable Online Furniture, Modern Lighting, Designer Lighting",
  openGraph: {
    title: "Designer Classic Handmade Furniture & Lighting | Mobelaris",
    description:
      "Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
    images: [
      {
        url: "https://www.mobelaris.com",
        width: 1200,
        height: 630,
        alt: "Mobelaris",
      },
    ],
    type: "website",
    url: "https://www.mobelaris.com/en/checkout/cart",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mobelaris",
    creator: "@mobelaris",
    title: "Mobelaris",
    description:
      "We are passionate about contemporary design: furniture, art, tapestries, and accessories for your office or home",
    images: "https://twitter.com/mobelaris/photo",
  },
}
const regions: Region[] = [
  {
    id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
    created_at: "2023-01-13T09:53:22.820Z",
    updated_at: "2023-01-13T09:53:22.820Z",
    deleted_at: null,
    name: "EU",
    currency_code: "eur",
    tax_rate: 0,
    tax_code: null,
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 106,
        iso_2: "ie",
        iso_3: "irl",
        num_code: 372,
        name: "IRELAND",
        display_name: "Ireland",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 34,
        iso_2: "bg",
        iso_3: "bgr",
        num_code: 100,
        name: "BULGARIA",
        display_name: "Bulgaria",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 55,
        iso_2: "hr",
        iso_3: "hrv",
        num_code: 191,
        name: "CROATIA",
        display_name: "Croatia",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 59,
        iso_2: "cz",
        iso_3: "cze",
        num_code: 203,
        name: "CZECH REPUBLIC",
        display_name: "Czech Republic",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 123,
        iso_2: "lv",
        iso_3: "lva",
        num_code: 428,
        name: "LATVIA",
        display_name: "Latvia",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 182,
        iso_2: "ro",
        iso_3: "rom",
        num_code: 642,
        name: "ROMANIA",
        display_name: "Romania",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 74,
        iso_2: "fi",
        iso_3: "fin",
        num_code: 246,
        name: "FINLAND",
        display_name: "Finland",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 81,
        iso_2: "ge",
        iso_3: "geo",
        num_code: 268,
        name: "GEORGIA",
        display_name: "Georgia",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 100,
        iso_2: "hu",
        iso_3: "hun",
        num_code: 348,
        name: "HUNGARY",
        display_name: "Hungary",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 129,
        iso_2: "lt",
        iso_3: "ltu",
        num_code: 440,
        name: "LITHUANIA",
        display_name: "Lithuania",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 130,
        iso_2: "lu",
        iso_3: "lux",
        num_code: 442,
        name: "LUXEMBOURG",
        display_name: "Luxembourg",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 147,
        iso_2: "mc",
        iso_3: "mco",
        num_code: 492,
        name: "MONACO",
        display_name: "Monaco",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 177,
        iso_2: "pl",
        iso_3: "pol",
        num_code: 616,
        name: "POLAND",
        display_name: "Poland",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 178,
        iso_2: "pt",
        iso_3: "prt",
        num_code: 620,
        name: "PORTUGAL",
        display_name: "Portugal",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 202,
        iso_2: "sk",
        iso_3: "svk",
        num_code: 703,
        name: "SLOVAKIA",
        display_name: "Slovakia",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 203,
        iso_2: "si",
        iso_3: "svn",
        num_code: 705,
        name: "SLOVENIA",
        display_name: "Slovenia",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
      {
        id: 85,
        iso_2: "gr",
        iso_3: "grc",
        num_code: 300,
        name: "GREECE",
        display_name: "Greece",
        region_id: "reg_01GPN8RXCTYDYZFBYRS74125M1",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GRN5YPG0WVZD6TK8CZRGQ60J",
    created_at: "2023-02-07T05:35:37.462Z",
    updated_at: "2023-03-02T08:02:28.952Z",
    deleted_at: null,
    name: "Austria",
    currency_code: "eur",
    tax_rate: 0,
    tax_code: "8000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 14,
        iso_2: "at",
        iso_3: "aut",
        num_code: 40,
        name: "AUSTRIA",
        display_name: "Austria",
        region_id: "reg_01GRN5YPG0WVZD6TK8CZRGQ60J",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
      {
        id: "manual",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GRN602N4P9CZ01XM90PQ5D6G",
    created_at: "2023-02-07T05:36:22.682Z",
    updated_at: "2023-03-02T08:02:40.932Z",
    deleted_at: null,
    name: "Belgium",
    currency_code: "eur",
    tax_rate: 0,
    tax_code: "9000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 21,
        iso_2: "be",
        iso_3: "bel",
        num_code: 56,
        name: "BELGIUM",
        display_name: "Belgium",
        region_id: "reg_01GRN602N4P9CZ01XM90PQ5D6G",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
      {
        id: "manual",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GPSR50ZHH3HPBT79KBJ1RF2P",
    created_at: "2023-01-15T03:39:13.259Z",
    updated_at: "2023-03-02T08:01:15.976Z",
    deleted_at: null,
    name: "Norway",
    currency_code: "nok",
    tax_rate: 0,
    tax_code: "3000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 166,
        iso_2: "no",
        iso_3: "nor",
        num_code: 578,
        name: "NORWAY",
        display_name: "Norway",
        region_id: "reg_01GPSR50ZHH3HPBT79KBJ1RF2P",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
      {
        id: "manual",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GPTW4Z73CT0GS17R18AQMPDG",
    created_at: "2023-01-15T14:08:20.189Z",
    updated_at: "2023-03-02T08:02:09.598Z",
    deleted_at: null,
    name: "Netherland",
    currency_code: "eur",
    tax_rate: 0,
    tax_code: "6000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 157,
        iso_2: "nl",
        iso_3: "nld",
        num_code: 528,
        name: "NETHERLANDS",
        display_name: "Netherlands",
        region_id: "reg_01GPTW4Z73CT0GS17R18AQMPDG",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
      {
        id: "manual",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GPSR0ZQE8DD18EVC07T5W34H",
    created_at: "2023-01-15T03:37:00.904Z",
    updated_at: "2023-03-02T06:34:07.010Z",
    deleted_at: null,
    name: "United Kingdom",
    currency_code: "gbp",
    tax_rate: 0,
    tax_code: "1000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 235,
        iso_2: "gb",
        iso_3: "gbr",
        num_code: 826,
        name: "UNITED KINGDOM",
        display_name: "United Kingdom",
        region_id: "reg_01GPSR0ZQE8DD18EVC07T5W34H",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GPSR47M15EVEP5YZ7J4J7V0T",
    created_at: "2023-01-15T03:38:47.290Z",
    updated_at: "2023-03-02T08:00:59.061Z",
    deleted_at: null,
    name: "Sweden",
    currency_code: "sek",
    tax_rate: 0,
    tax_code: "2000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 215,
        iso_2: "se",
        iso_3: "swe",
        num_code: 752,
        name: "SWEDEN",
        display_name: "Sweden",
        region_id: "reg_01GPSR47M15EVEP5YZ7J4J7V0T",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GPTW1PF70WZBFSH0KRA9D7HN",
    created_at: "2023-01-15T14:06:32.922Z",
    updated_at: "2023-03-02T08:01:28.234Z",
    deleted_at: null,
    name: "France",
    currency_code: "eur",
    tax_rate: 0,
    tax_code: "4000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 75,
        iso_2: "fr",
        iso_3: "fra",
        num_code: 250,
        name: "FRANCE",
        display_name: "France",
        region_id: "reg_01GPTW1PF70WZBFSH0KRA9D7HN",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
      {
        id: "manual",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GPTW2KQVJGPAPQ8TECS74RSH",
    created_at: "2023-01-15T14:07:02.901Z",
    updated_at: "2023-03-02T08:01:48.096Z",
    deleted_at: null,
    name: "Spain",
    currency_code: "eur",
    tax_rate: 0,
    tax_code: "4000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 209,
        iso_2: "es",
        iso_3: "esp",
        num_code: 724,
        name: "SPAIN",
        display_name: "Spain",
        region_id: "reg_01GPTW2KQVJGPAPQ8TECS74RSH",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
      {
        id: "manual",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GPTW3T3ER54R4WBX1G51M5W8",
    created_at: "2023-01-15T14:07:42.184Z",
    updated_at: "2023-03-02T08:01:58.129Z",
    deleted_at: null,
    name: "German",
    currency_code: "eur",
    tax_rate: 0,
    tax_code: "5000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 82,
        iso_2: "de",
        iso_3: "deu",
        num_code: 276,
        name: "GERMANY",
        display_name: "Germany",
        region_id: "reg_01GPTW3T3ER54R4WBX1G51M5W8",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
      {
        id: "manual",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01GPTW5NFZ68PKYEQ37QBDBZ4F",
    created_at: "2023-01-15T14:08:43.000Z",
    updated_at: "2023-03-02T08:02:20.256Z",
    deleted_at: null,
    name: "Italy",
    currency_code: "eur",
    tax_rate: 0,
    tax_code: "7000",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 109,
        iso_2: "it",
        iso_3: "ita",
        num_code: 380,
        name: "ITALY",
        display_name: "Italy",
        region_id: "reg_01GPTW5NFZ68PKYEQ37QBDBZ4F",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
      {
        id: "manual",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01H18MYMM1RGYHX9KVZ6REB8KG",
    created_at: "2023-05-25T05:08:52.985Z",
    updated_at: "2023-05-25T05:08:52.985Z",
    deleted_at: null,
    name: "Denmark",
    currency_code: "gbp",
    tax_rate: 0,
    tax_code: null,
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 60,
        iso_2: "dk",
        iso_3: "dnk",
        num_code: 208,
        name: "DENMARK",
        display_name: "Denmark",
        region_id: "reg_01H18MYMM1RGYHX9KVZ6REB8KG",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
  {
    id: "reg_01HCCEAD8Z4AR2RTKKHC0660KQ",
    created_at: "2023-10-10T09:22:36.440Z",
    updated_at: "2023-10-18T03:12:12.445Z",
    deleted_at: null,
    name: "Switzerland",
    currency_code: "chf",
    tax_rate: 0,
    tax_code: null,
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    metadata: null,
    countries: [
      {
        id: 216,
        iso_2: "ch",
        iso_3: "che",
        num_code: 756,
        name: "SWITZERLAND",
        display_name: "Switzerland",
        region_id: "reg_01HCCEAD8Z4AR2RTKKHC0660KQ",
      },
    ],
    fulfillment_providers: [
      {
        id: "my-fulfillment",
        is_installed: true,
      },
    ],
    payment_providers: [
      {
        id: "stripe",
        is_installed: true,
      },
    ],
  },
]
const storeConfig = {
  features: {
    search: true,
  },
  regions,
  localsMap,
  i18n: i18n,
  metadata,
  trustpilot: {
    url: "https://www.trustpilot.com/review/www.mobelaris.com",
  },
  klaviyo: {},
  google: {},
  socials: {
    facebook: "https://www.facebook.com/Mobelaris/",
    twitter: "https://twitter.com/mobelaris",
    google_plus: "https://plus.google.com/u/0/108691237385259268978",
    pinterest: "https://www.pinterest.com/mobelaris/",
    instagram: "https://www.instagram.com/mobelaris.furniture/",
  },
}
export default storeConfig
