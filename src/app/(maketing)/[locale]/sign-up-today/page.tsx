import { T } from "app/[locale]/context/sources"
import ContactForm from "app/components/ContactForm"
import Container from "app/components/Container"
import Spinner from "app/components/Icon/spinner"
import { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"
import bg from "./sign-up-today-bg.jpg"
export default function Page() {
  return (
    <div className="newsletter-custom relative isolate flex min-h-screen w-full flex-col items-center justify-start ">
      <Image
        fill
        src={bg}
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover mix-blend-multiply blur-sm lg:blur-none"
      />

      <div className="relative pb-48 pt-32 text-center text-black">
        <Container flush className="max-w-3xl space-y-8">
          <h3 className="m-0  border-b border-b-current p-[0_0_13px] font-heading text-3xl leading-snug lg:text-5xl">
            <T>{`Subscribe to out Newsletter and receive £10 off your next order`}</T>
          </h3>
          <p>
            <T>{`Members of or mailing list receive updates on new products, unique
            sale items, events, this season trends and much more. Join today and
            get some insite to the Mobelaris way!`}</T>
          </p>
        </Container>
        <Container flush className="relative mt-16 max-w-md text-left">
          <Suspense
            fallback={
              <div className="flex justify-center p-6">
                <Spinner></Spinner>
              </div>
            }
          >
            <ContactForm redirectUrl="/" />
          </Suspense>
        </Container>
      </div>
    </div>
  )
}
export const metadata: Metadata = {
  title: "Join Mobelaris Newsletter",
  description:
    "Subscribe to our newsletter and receive updates on new products, unique sale items, events, and more. Get £10 off your next order!",
  openGraph: {
    title: "Join Mobelaris Newsletter",
    description:
      "Subscribe to our newsletter and receive updates on new products, unique sale items, events, and more. Get £10 off your next order!",
    images: [
      {
        url: "https://www.mobelaris.com",
        width: 1200,
        height: 630,
        alt: "Mobelaris",
      },
    ],
    type: "website",
    url: "https://www.mobelaris.com/en/newsletter",
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
