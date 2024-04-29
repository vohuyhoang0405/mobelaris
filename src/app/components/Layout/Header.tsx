import { ServerContextType } from "app/helper"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import AuthModalLazy from "../auth-modal"
import MobileNavbarLazy from "./MobileNavbar"

const Cartcount = dynamic(() => import("../Cartcount"))
const Container = dynamic(() => import("../Container"))
const CountriesSelectorWrap = dynamic(() => import("../CountriesSelector"))
const Icon = dynamic(() => import("../Icon"))
const MenuIcon = dynamic(() => import("../Icon/Menu"))
const Link = dynamic(() => import("../Link"))
const Logo = dynamic(() => import("../Logo"))
const Minicart = dynamic(() => import("../Minicart"))
const Trustpilot = dynamic(() => import("../trustpilot"))
const AccountMenu = dynamic(() => import("./AccountMenu"))
const HeaderSearchWrap = dynamic(() => import("./HeaderSearchWrap"))
const Navbar = dynamic(() => import("./Navbar"))

function Header({ context }: { context: ServerContextType }) {
  const { t, langCode, locale } = context
  const cartCount = <Cartcount />
  return (
    <header
      tabIndex={0}
      className="header-section group/header sticky top-0 z-30 border-y border-solid border-t-white bg-white lg:border-none lg:pb-0"
    >
      <Container className="relative z-10">
        <div className="relative mx-auto  flex h-[60px] w-full max-w-page items-center lg:h-[74px] ">
          <div className="flex w-full items-center justify-center gap-6">
            <div className=" lg:flex-1">
              <Link
                className="-mt-[5%]  w-[40vw] max-w-[220px] text-center lg:-mt-[2%]"
                href="/"
              >
                <Logo />
              </Link>
              <Trustpilot />
            </div>
            <div className="pointer-events-none absolute left-0 top-full z-10 flex w-full flex-1 items-center justify-center bg-white opacity-0 transition-all focus-within:pointer-events-auto focus-within:opacity-100 focus-within:shadow peer-checked:pointer-events-auto peer-checked:flex peer-checked:opacity-100 lg:pointer-events-auto lg:static lg:px-0 lg:pb-0 lg:opacity-100 lg:focus-within:shadow-none">
              <Suspense>
                <HeaderSearchWrap />
              </Suspense>
            </div>
            <ul
              className="hidden flex-1 items-center justify-end gap-3 lg:flex"
              id="cart"
            >
              <li className="">
                <label
                  htmlFor="minicart"
                  className="group relative flex  w-[52px] flex-col items-center justify-center whitespace-nowrap"
                >
                  <span className="cart-words hidden" />
                  <Icon name="minicart" className="group-hover:hidden" />
                  <Icon
                    name="minicart-invert"
                    className="hidden group-hover:block"
                  />
                  <div className="mt-1 max-w-[60px] overflow-hidden text-ellipsis text-center text-xs leading-none">
                    {t("My Cart")}
                  </div>
                  <span className="badge badge-xs absolute -top-2 left-2/4 min-h-[1.6em] min-w-[1.6em] border border-white border-opacity-70 bg-black bg-opacity-70 text-white animatecss animatecss-fadeIn empty:hidden">
                    {cartCount}
                  </span>
                </label>
                <Suspense>
                  <Minicart />
                </Suspense>
              </li>
              <li className="">
                <label
                  htmlFor="auth-modal"
                  className="group dropdown dropdown-end dropdown-hover flex flex w-[52px] flex-col items-center justify-center whitespace-nowrap"
                >
                  <Icon name="account" className="group-hover:hidden" />
                  <Icon
                    name="account-invert"
                    className="hidden group-hover:block"
                  />
                  <Link
                    href="/customer/account"
                    className="mt-1 text-center text-xs leading-none "
                  >
                    {t("ACCOUNT")}
                  </Link>
                  <div className="dropdown-content top-full w-[200px] bg-white shadow">
                    <AccountMenu />
                  </div>
                </label>
              </li>
              <li className="">
                <Link
                  href="/faq"
                  className="group flex w-[52px] flex-col items-center justify-center whitespace-nowrap"
                >
                  <Icon name="faq" className="group-hover:hidden" />
                  <Icon
                    name="faq-invert"
                    className="hidden group-hover:block"
                  />
                  <div className="mt-1 text-center text-xs leading-none ">
                    FAQs
                  </div>
                </Link>
              </li>
              <li className="inline-flex items-end align-middle">
                <Suspense>
                  <CountriesSelectorWrap locale={locale} />
                </Suspense>
              </li>
            </ul>
            <div className="flex flex-1 justify-end lg:hidden ">
              <ul className="-mr-3 flex list-none">
                <li className="seeks flex items-center ">
                  <label
                    htmlFor="q"
                    id="search_trigger"
                    className="js-search-trigger js-search-mobile-trigger btn btn-circle btn-ghost m-0 p-2 text-xl"
                  >
                    <svg
                      aria-label="searchcontainer max-w-page w-full px-4 sm:px-8 mx-autorelative h-[60px] lg:h-[74px] flex items-center  icon"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                      />
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M338.29 338.29L448 448"
                      />
                    </svg>
                  </label>
                </li>
                <li className="flex items-center ">
                  <Link
                    href="/cart"
                    className="btn btn-circle btn-ghost relative p-2"
                  >
                    <span className="cart-words hidden">My Cart</span>
                    <i aria-label="cart" className="text-xl">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                      </svg>
                    </i>
                    <span className="CartCount badge badge-xs absolute right-[5%] top-[5%] h-[1.4em] transform border-current bg-slate-600 leading-loose text-white empty:hidden">
                      {cartCount}
                    </span>
                  </Link>
                </li>
                <li className="flex items-center text-left">
                  <label
                    htmlFor="openMenuMobile"
                    className="btn btn-circle btn-ghost p-2 text-left text-black"
                  >
                    <MenuIcon />
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <div className="hidden w-full border-y lg:flex">
        <Container className="pointer-events-none w-full justify-center bg-white ">
          <Suspense>
            <Navbar />
            <AuthModalLazy />
          </Suspense>
        </Container>
      </div>
      <Suspense>
        <MobileNavbarLazy />
      </Suspense>
    </header>
  )
}

export default Header
