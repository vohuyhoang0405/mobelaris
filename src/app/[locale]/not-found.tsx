import { GTagEventEnterPage } from "app/components/googleTag"
import { Metadata } from "next"
import dynamic from "next/dynamic"

const SearchNotFound = dynamic(
  () => import("./collections/components/collections/search404")
)

export default function NotFound() {
  return (
    <>
      <SearchNotFound />
      <GTagEventEnterPage type="search_results" />
    </>
  )
}
export const metadata: Metadata = {
  title: "Page Not Found - Mobelaris",
  description:
    "Sorry, the page you are looking for could not be found. Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
  openGraph: {
    title:
      "Page Not Found - Designer Classic Handmade Furniture & Lighting | Mobelaris",
    description:
      "Sorry, the page you are looking for could not be found. Join 1000's of happy customers enjoying our 7-day-a-week support, safe shopping experience, and hot discounts. Call us at 02081449316.",
    images: [
      {
        url: "https://www.mobelaris.com",
        width: 1200,
        height: 630,
        alt: "Mobelaris",
      },
    ],
    type: "website",
    url: "https://www.mobelaris.com/en/page-not-found",
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
