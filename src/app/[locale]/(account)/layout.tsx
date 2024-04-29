import { GTagEventEnterPage } from "app/components/googleTag"
import dynamic from "next/dynamic"

const AccountLayout = dynamic(() => import("./components/AccountLayout"))

function Layout({ children }: { children: JSX.Element }) {
  return (
    <AccountLayout>
      <>
        {children}
        <GTagEventEnterPage type="account" />
      </>
    </AccountLayout>
  )
}
export const metadata = {
  title: "My Account - Mobelaris",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title:
      "My Account - Designer Classic Handmade Furniture & Lighting | Mobelaris",
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
    url: "https://www.mobelaris.com/en/my-account",
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
export default Layout
