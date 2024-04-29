import { T } from "app/[locale]/context/sources"
import Image from "app/components/Image"
import dynamic from "next/dynamic"
import Collapse from "../../collapse"
import footerLogo from "./images/FOOTER_LOGO.png"

const Container = dynamic(() => import("../../Container"))
const Icon = dynamic(() => import("../../Icon"))
const Link = dynamic(() => import("../../Link"))
const PaymentIcons = dynamic(() => import("../../PaymentIcons"))
const Socials = dynamic(() => import("../../socials/Socials"))

const data = {
  logo: footerLogo,
  description: `Hand Made Style Designer Furniture from around the world come together at Mobelaris, bringing you a vast range of designer furniture, lighting and accessories at a fraction of the high street price.`,
  address: "85 Great Portland street, First Floor, London, W1W 7LT",
  phone: "+44 (0) 2081449316",
  email: "customersupport@mobelaris.com",
  menu: [
    {
      title: "CATEGORIES",
      items: [
        {
          title: "Chairs",
          href: "/chairs",
        },
        {
          title: "Sofas",
          href: "/sofas",
        },
        {
          title: "Lighting",
          href: "/lighting",
        },
        {
          title: "Tables",
          href: "/tables",
        },
        {
          title: "Accessories",
          href: "/accessories",
        },
      ],
    },
    {
      title: "INFORMATION",
      items: [
        {
          title: "About Us",
          href: "/about",
        },
        {
          title: "Contact Us",
          href: "/contact-us",
        },
        {
          title: "Terms & Conditions",
          href: "/term-and-condition",
        },
        {
          title: "Returns and Refund",
          href: "/refunds-and-returns",
        },
        {
          title: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          title: "Trade",
          href: "/trade",
        },
        {
          title: "Blog",
          href: "/mobelarisblog",
        },
        {
          title: "Brexit",
          href: "/faq/question/id/30",
        },
        {
          title: "FAQs",
          href: "/faq",
        },
        {
          title: "Join Our Mailing List",
          href: "/sign-up-today",
        },
        {
          title: "Transparency Policy",
          href: "/transparency-policy",
        },
        {
          title: "Ethical Trading",
          href: "/ethical-trading-policy",
        },
        {
          title: "Sitemap",
          href: "/sitemap",
        },
        // {
        //   title: "Photo Contest",
        //   href: "/photocontest",
        // },
      ],
    },
    {
      title: "ACCOUNT",
      items: [
        {
          title: "My Account",
          href: "/customer/account",
        },
        {
          title: "Order Tracking",
          href: "/ordertracking",
        },
        // {
        //   title: "Wish List",
        //   href: "/wishlist",
        // },
        {
          title: "Shopping Cart",
          href: "/checkout/cart",
        },
        {
          title: "Checkout",
          href: "/checkout",
        },
        // {
        //   title: "Promo Offers",
        //   href: "/promo-offer",
        // },
      ],
    },
    {
      title: "PRODUCT TAGS",
      items: [
        {
          title: "Sofas",
          href: "/product-tags/sofas",
        },
        {
          title: "Armchairs",
          href: "/product-tags/armchairs",
        },
        {
          title: "Living",
          href: "/product-tags/living",
        },
        {
          title: "Bedroom",
          href: "/product-tags/bedroom",
        },
        {
          title: "Lighting",
          href: "/product-tags/lighting",
        },
        {
          title: "Tables",
          href: "/product-tags/tables",
        },
        {
          title: "Pouf",
          href: "/product-tags/pouf",
        },
        {
          title: "Wood",
          href: "/product-tags/wood",
        },
        {
          title: "Office",
          href: "/product-tags/office",
        },
        {
          title: "Outdoor",
          href: "/product-tags/outdoor",
        },
        {
          title: "Kitchen",
          href: "/product-tags/kitchen",
        },
        {
          title: "Stools",
          href: "/product-tags/stools",
        },
        {
          title: "Footstools",
          href: "/product-tags/footstools",
        },
        {
          title: "Desks",
          href: "/product-tags/desks",
        },
        {
          title: "Lounge Chair",
          href: "/product-tags/lounge-chair",
        },
      ],
    },
  ],
  copyright: "© Mobelaris - All rights Reserved",
}
const strings = {
  Address: "Address",
  "Contact Us": "Contact Us",
  Email: "Email",
  Chairs: "Chairs",
  Sofas: "Sofas",
  "Lighting tables": "Lighting tables",
  Accessories: "Accessories",
  INFORMATION: "INFORMATION",
  "About Us": "About Us",
  "Covid-19 FAQ": "Covid-19 FAQ",
  FAQS: "FAQS",
  "Terms & Conditions": "Terms & Conditions",
  "Privacy Policy": "Privacy Policy",
  "Return & Refunds": "Return & Refunds",
  ACCOUNT: "ACCOUNT",
  "My account": "My account",
  "GET TO KNOW US": "GET TO KNOW US",
}
export const Footer = ({
  address = data.address,
  phone = data.phone,
  email = data.email,
  description = data.description,
  copyright = data.copyright,
  socials,
}: {
  socials: { [key: string]: string }
  address?: string
  phone?: string
  description?: string
  email?: string
  copyright?: JSX.Element | string
}) => {
  const t = (key: string) => <T>{key}</T>
  return (
    <div id="shopify-section-footer" className="mt-12 w-full bg-[#f6f6f6]">
      <footer
        className="footer-section w-full py-16 pb-32 lg:pb-0"
        data-section-id="footer"
        data-section-type="footer-section"
      >
        <Container
          flush
          className="mx-auto flex w-full flex-col gap-12 px-4 sm:px-8"
        >
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex flex-col gap-6 lg:max-w-[300px]">
              <Link href="/" className="lg:-mx-[5%] lg:-my-[5%]">
                <Image
                  disableLoader
                  src={footerLogo}
                  alt="Mobelaris logo"
                  width={300}
                  height={150}
                />
              </Link>
              {description && <div>{t(description)}</div>}
              <div className="flex justify-start ">
                <Socials {...socials} />
              </div>
              <div className="gap-2">
                <div>
                  <span className="mr-3 opacity-70">{t("Address")}</span>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/search?q=${address}`}
                  >
                    {address}
                  </a>
                </div>
                <div>
                  <span className="mr-3 opacity-70"> {t("Contact Us")}:</span>
                  <a
                    href={"tel:" + phone}
                    target="_blank"
                    rel="noreferrer"
                    title={"tel:" + phone}
                  >
                    {phone}
                  </a>
                </div>
                <div>
                  <span className="mr-3 opacity-70">{t("Email")}:</span>
                  <a className="text-secondary" href={"mailto:" + email}>
                    {email}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div
                className="flex flex-1 flex-col flex-wrap justify-start gap-12 gap-x-6 lg:flex-row lg:gap-6 xl:flex-nowrap xl:justify-between"
                id="footer"
              >
                {data.menu.map((item, i) => {
                  if (item.title === "CATEGORIES") {
                    return (
                      <div
                        key={i}
                        className="footer-menu w-full  lg:w-1/4 xl:max-w-[200px]"
                      >
                        <Collapse
                          title={
                            <div className="w-full text-left text-lg font-bold uppercase lg:px-6">
                              <T>{item.title}</T>
                            </div>
                          }
                        >
                          <ul className="grid list-none text-left text-gray-400">
                            {item.items.map((item, i) => (
                              <li key={i}>
                                <Link
                                  className="block py-2 capitalize hover:text-secondary"
                                  href={item.href}
                                >
                                  <T>{item.title}</T>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </div>
                    )
                  }
                  if (item.title === "INFORMATION") {
                    return (
                      <div
                        key={i}
                        className="footer-menu w-full lg:w-1/2 xl:w-[440px] "
                      >
                        <Collapse
                          title={
                            <div className="w-full text-left text-lg font-bold uppercase lg:px-6 xl:text-center">
                              <T>{item.title}</T>
                            </div>
                          }
                        >
                          <ul className="grid list-none grid-cols-2 gap-x-2 text-left text-gray-400">
                            {item.items.map((item, i) => (
                              <li key={i}>
                                <Link
                                  className="block py-2 capitalize hover:text-secondary"
                                  href={item.href}
                                >
                                  <T>{item.title}</T>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </div>
                    )
                  }
                  if (item.title === "ACCOUNT") {
                    return (
                      <div
                        key={i}
                        className="footer-menu w-full text-left  lg:w-1/4 xl:w-[200px]"
                      >
                        <Collapse
                          title={
                            <div className="w-full text-left text-lg font-bold uppercase lg:px-6">
                              <T>{item.title}</T>
                            </div>
                          }
                        >
                          <ul className="grid list-none text-gray-400">
                            {item.items.map((item, i) => (
                              <li key={i}>
                                <Link
                                  className="block py-2 capitalize hover:text-secondary"
                                  href={item.href}
                                >
                                  <T>{item.title}</T>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </div>
                    )
                  }
                  if (item.title === "PRODUCT TAGS") {
                    return (
                      <div
                        key={i}
                        className="footer-menu w-full text-left lg:w-1/3 xl:max-w-md"
                      >
                        <Collapse
                          title={
                            <div className="w-full text-left text-lg font-bold uppercase lg:px-6">
                              <T>{item.title}</T>
                            </div>
                          }
                        >
                          <ul className="mt-3 flex flex-wrap items-baseline gap-1 gap-y-2 text-gray-400 lg:mt-0">
                            {item.items.map((item, i) => (
                              <li key={i}>
                                <Link
                                  className="inline-block rounded-full border border-gray-400 px-2 leading-[24px] hover:border-secondary hover:bg-secondary hover:text-white"
                                  href={item.href}
                                >
                                  <T>{item.title}</T>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
              <div className="mt-6 flex w-full flex-col gap-6 text-center lg:ml-auto lg:mt-0 lg:max-w-md lg:flex-row lg:justify-end lg:px-6 lg:text-left">
                <div className="font-button text-xl">
                  <T>GET TO KNOW US</T>
                </div>
                <ul
                  id="social-icons"
                  className="flex flex-wrap justify-center gap-6 lg:justify-start"
                >
                  <li>
                    <a
                      href={socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="twitter.com"
                    >
                      <Icon name="twitter" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={socials.facebook}
                      target="_blank"
                      aria-label="www.facebook.com"
                      rel="noreferrer"
                    >
                      <Icon name="facebook" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={"https://plus.google.com/u/0/108691237385259268978"}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="plus.google.com"
                    >
                      <Icon name="google-plus" />
                    </a>
                  </li>

                  <li>
                    <a
                      href={socials.pinterest}
                      target="_blank"
                      aria-label="www.pinterest.ph"
                      rel="noreferrer"
                    >
                      <Icon name="pinterest" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className=" flex w-full flex-col !items-center justify-between py-6 lg:flex-row"
            id="bottom-footer"
          >
            <div className="footer-left text-center">
              <div className="flex-1">
                <div className="flex justify-center gap-3 lg:justify-start" />
                <div className="mt-[10px] flex flex-col items-center  leading-[30px] lg:flex-row lg:items-baseline lg:gap-6 ">
                  <div className="small-links flex items-baseline justify-center gap-2 text-center">
                    <Link className="ph2" href="/privacy-policy">
                      <T>Privacy Policy</T>
                    </Link>
                    <Link className="ph2" href="/term-and-condition">
                      <T>Terms & Conditions</T>
                    </Link>
                  </div>
                  <div className="flex items-baseline text-center">
                    <Link href="/">{copyright}</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-right" id="payment">
              <PaymentIcons />
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
export default Footer
