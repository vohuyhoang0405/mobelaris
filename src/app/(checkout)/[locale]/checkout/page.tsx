import GTMBeginCheckoutEvent from "@lib/gtm-events/begin-checkout"
import { translateAndSave } from "@lib/translation"
import { config } from "@shop/index"
import { SourcesProvider } from "app/[locale]/context/sources"
import CheckoutTemplate from "app/[locale]/templates/checkout"
import KlaviyoTrackingStartedCheckout from "app/components/klaviyo/klaviyoTrackingStartedCheckout"
import { getServerContext } from "app/helper"
import { LocaleType } from "types/global"
let strings = {
  "5 Years warranty": "5 Years warranty",
  "7 days a week support": "7 days a week support",
  Address: "Address",
  "Address is required": "Address is required",
  "Already have an account?": "Already have an account?",
  "Apartments, suite, etc.": "Apartments, suite, etc.",
  "Card number": "Card number",
  Cart: "Cart",
  Change: "Change",
  City: "City",
  "City is required": "City is required",
  Contact: "Contact",
  "Contact information": "Contact information",
  "Continue to delivery": "Continue to delivery",
  "Continue to payment": "Continue to payment",
  Country: "Country",
  "Country is required": "Country is required",
  "Credit card": "Credit card",
  "Delivery Charge": "Delivery Charge",
  "Discount Code": "Discount Code",
  "Don't have an account?": "Don't have an account?",
  Email: "Email",
  "Email address": "Email address",
  "Email is required": "Email is required",
  "Expiration date": "Expiration date",
  "First name": "First name",
  "First name is required": "First name is required",
  "Forgot Password": "Forgot Password",
  "GO TO LOGIN": "GO TO LOGIN",
  "Hide order summary": "Hide order summary",
  Information: "Information",
  "Last name": "Last name",
  "Last name is required": "Last name is required",
  Login: "Login",
  Method: "Method",
  Password: "Password",
  "Password is required": "Password is required",
  "Pay now": "Pay now",
  Payment: "Payment",
  Phone: "Phone",
  "Please enter your email address below to receive a password reset link.":
    "Please enter your email address below to receive a password reset link.",
  "Postal code": "Postal code",
  "Postal code is required": "Postal code is required",
  Register: "Register",
  "Return to cart": "Return to cart",
  "Return to infomation": "Return to infomation",
  "Return to shipping": "Return to shipping",
  "SIGN UP NOW": "SIGN UP NOW",
  "Secure checkout": "Secure checkout",
  "Secure payment with PayPal": "Secure payment with PayPal",
  "Secure payment with credit card": "Secure payment with credit card",
  "Secure payment with iDEAL": "Secure payment with iDEAL",
  "Ship to": "Ship to",
  Shipping: "Shipping",
  "Shipping address": "Shipping address",
  "Shipping method": "Shipping method",
  "Show order summary": "Show order summary",
  "Sign In": "Sign In",
  Submit: "Submit",
  Subtotal: "Subtotal",
  "Test payment": "Test payment",
  "Test payment using medusa-payment-manual":
    "Test payment using medusa-payment-manual",
  Total: "Total",
  close: "close",
  "Forgot password": "Forgot password",
  password: "password",
}
async function Page({
  params,
}: {
  params: {
    locale: LocaleType
  }
}) {
  const context = await getServerContext(params.locale)
  const translatedText = await translateAndSave({
    resources: Object.keys(strings).map((key) => ({
      key,
      value: key,
    })),
    langCode: context.langCode,
  })
  return (
    <SourcesProvider
      name="checkout"
      value={translatedText.resources.reduce(
        (acc: { [key: string]: string }, cur) => {
          acc[cur.key] = cur.value
          return acc
        },
        {}
      )}
    >
      <CheckoutTemplate />
      {/* <GTagEventBeginCheckout /> */}
      <KlaviyoTrackingStartedCheckout />
      <GTMBeginCheckoutEvent />
    </SourcesProvider>
  )
}

export const metadata = {
  title: "Secure Checkout - Designer Furniture & Lighting | Mobelaris",
  description:
    "Complete your purchase securely with our easy checkout process at Mobelaris. Enjoy fast shipping, reliable support, and explore our designer classic handmade furniture & lighting.",
  openGraph: {
    title:
      "Secure Checkout - Designer Classic Handmade Furniture & Lighting | Mobelaris",
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

export async function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }))
}
export default Page
