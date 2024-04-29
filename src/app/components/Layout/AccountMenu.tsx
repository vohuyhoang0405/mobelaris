"use client"
import { Account } from "app/[locale]/context/account-context"
import { T } from "app/[locale]/context/sources"
import dynamic from "next/dynamic"

const Link = dynamic(() => import("../Link"))

let menuAuth = [
  { title: "My Account", href: "/customer/account" },
  { title: "My Orders", href: "/sales/order/history" },

  {
    title: "Account Information",
    href: "/customer/account/edit",
  },
  { title: "Address Book", href: "/customer/address" },
  {
    title: "Sign Out",
    href: "/customer/account/logout",
  },
]

function AccountMenu() {
  return (
    <Account>
      {({ account }) => {
        if (account.customer) {
          return (
            <ul className="menu-compact menu">
              {menuAuth.map((item, i) => {
                return (
                  <li
                    key={i}
                    className="focus-inset gap-2 capitalize  leading-none"
                  >
                    <Link href={item.href}>
                      <T>{item.title}</T>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )
        }
        return (
          <ul className="menu-compact menu">
            <li className="focus-inset gap-2 capitalize  leading-none">
              <Link href={"/customer/account/login"}>
                <T>Sign In / Sign up</T>
              </Link>
            </li>
          </ul>
        )
      }}
    </Account>
  )
}

export default AccountMenu
