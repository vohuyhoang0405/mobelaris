"use client"
import { useAccount } from "app/[locale]/context/account-context"
import { T } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import Container from "app/components/Container"
import Link from "app/components/Link"
import isActivePathname from "app/helper/isActivePathname"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
let menu = [
  { title: "My Account", href: "/customer/account" },
  { title: "My Orders", href: "/sales/order/history" },
  // { title: "My Wish List", href: "/wishlist" },
  { title: "Address Book", href: "/customer/address" },
  {
    title: "Account Information",
    href: "/customer/account/edit",
  },
  // {
  //   title: "Stored Payment Methods",
  //   href: "/vault/cards/listaction",
  // },
  // {
  //   title: "My Product Reviews",
  //   href: "/review/customer",
  // },
  // {
  //   title: "Newsletter Subscriptions",
  //   href: "/newsletter/manage",
  // },
  // {
  //   title: "Terms and Conditions",
  //   href: "/paypal/billing_agreement",
  // },
  // { title: "My Saved Cards", href: "/stripe/customer/cards" },
  // {
  //   title: "My Subscriptions",
  //   href: "/stripe/customer/subscriptions",
  // },
]
function AccountLayout({ children }: { children: JSX.Element }) {
  const { locale } = useStore()
  const pathname = usePathname() || ""
  const current = menu.find(
    (item) =>
      pathname && isActivePathname({ pathname, href: item.href, locale })
  )
  const { checkSession } = useAccount()
  useEffect(() => {
    checkSession()
  }, [checkSession])
  return (
    <>
      <div className="section-title span-12 flex items-center justify-center bg-[#f4f4f4] py-12 text-center">
        <Container>
          <h1
            id="account-layout-title"
            className="font-body text-4xl uppercase"
          >
            <T>{current?.title || "Welcome"}</T>
          </h1>
        </Container>
      </div>
      <Container
        flush
        className="mt-6 flex w-full max-w-8xl flex-col gap-6 lg:flex-row lg:gap-12"
      >
        <div className="w-1/3 max-w-sm divide-y ">
          {menu.map((item, i) => {
            return (
              <Link
                href={item.href}
                className={clsx(
                  "group relative inset-y-1 isolate flex px-3 py-1 first:border-t last:!border-b hover:text-white",
                  item === current && "bg-secondary bg-opacity-60 text-white"
                )}
                key={i}
              >
                <div className="absolute -inset-y-[1px] left-0 z-[-1] w-0 bg-transparent font-button  transition-all duration-[0.5s] ease-in-out group-hover:w-full group-hover:border-none group-hover:bg-secondary" />
                <T>{item.title}</T>
              </Link>
            )
          })}
        </div>
        <div className="flex-1 ">{children}</div>
      </Container>
    </>
  )
}

export default AccountLayout
