import { T } from "app/[locale]/context/sources"
import CountriesSelectorWrap from "app/components/CountriesSelector"
import dynamic from "next/dynamic"

const Link = dynamic(() => import("../../Link"))
const Collapse = dynamic(() => import("../../collapse"))
const Socials = dynamic(() => import("../../socials/Socials"))
const AcountNavbar = dynamic(() => import("./AcountNavbar"))
const CartCount = dynamic(() => import("./CartCount"))
const ToggleNavbar = dynamic(() => import("./ToggleNavbar"))

const t = (text: string) => <T>{text}</T>
const getItemMenuHref = (item: { handle: string }) => {
  return "/" + item.handle
}
const MenuItemMobile = ({
  menuItem,
}: {
  menuItem: {
    title: string
    handle: string
    items: {
      title: string
      handle: string
    }[]
  }
}) => {
  const title = t(menuItem.title.toLowerCase())
  const href = getItemMenuHref(menuItem)
  let [_, ...items] = menuItem.items
  return (
    <li className="">
      <Collapse
        {...{
          title: (
            <Link
              className="pointer-events-auto p-3 uppercase group-focus:bg-transparent"
              href={href}
            >
              {title}
            </Link>
          ),
          content: (
            <ul className="bg-gray-50 p-2 shadow-inner">
              {items.map((item, i) => {
                return (
                  <li
                    key={i}
                    className="w-full border-b py-3 pl-3 leading-snug last:border-none"
                  >
                    <Link
                      className="block w-full text-base"
                      href={getItemMenuHref(item)}
                    >
                      {t(item.title)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ),
        }}
      ></Collapse>
    </li>
  )
}
function MobileNavbar({
  mainMenu,
}: {
  mainMenu: {
    title: string
    handle: string
    items: {
      title: string
      handle: string
    }[]
  }[]
}) {
  return (
    <ToggleNavbar>
      <div className="drawer-side ">
        <label className="drawer-overlay " htmlFor="openMenuMobile" />
        <div className="pointer-events-auto absolute right-0 isolate flex h-full w-[calc(100vw-60px)] max-w-md flex-col justify-start overflow-auto border-t bg-white pb-[100px] ease-in-out  animatecss animatecss-fadeIn  ">
          <div className="contaienr flex w-full items-center justify-between px-4 py-3 ">
            <label
              className="btn btn-square btn-ghost btn-sm text-2xl"
              htmlFor="openMenuMobile"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
              </svg>
            </label>
            <div className="btn btn-circle btn-ghost border">
              <CountriesSelectorWrap />
            </div>
          </div>
          <ul className="w-full list-none divide-y px-4">
            <MenuItemMobile menuItem={mainMenu[0]} />
            <MenuItemMobile menuItem={mainMenu[1]} />
            <MenuItemMobile menuItem={mainMenu[2]} />
            <MenuItemMobile menuItem={mainMenu[3]} />
            <MenuItemMobile menuItem={mainMenu[4]} />
            <MenuItemMobile menuItem={mainMenu[5]} />
            <li className="">
              <div className="p-3 group-focus:bg-transparent">
                <Link className="uppercase" href="/designers">
                  {t("Designers")}
                </Link>
              </div>
            </li>
            <li className="border-b ">
              <div className="p-3 group-focus:bg-transparent">
                <Link href="/express-delivery">{t("Express Delivery")}</Link>
              </div>
            </li>
            <li className="p-3 group-focus:bg-transparent ">
              <AcountNavbar></AcountNavbar>
            </li>
            <li></li>
          </ul>
          <div className="flex justify-center px-7 pt-7 ">
            <Socials />
          </div>
          <div className="p-3 ">
            <Link
              href="/checkout/cart"
              className="flex items-baseline gap-3 border p-3"
            >
              {t("Cart")}{" "}
              <span className=" badge badge-sm opacity-80 empty:hidden">
                <CartCount />
              </span>
              <div className="flex-1"></div>
              <i className="icon icon-cart text-lg" aria-hidden="true">
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
            </Link>
          </div>

          <div className=" flex w-full flex-col !items-center justify-between py-6 lg:flex-row">
            <div className="footer-left text-center">
              <div className="flex-1">
                <div className="flex justify-center gap-3 lg:justify-start" />
                <div className="mt-[10px] flex flex-col items-center text-sm leading-[48px] lg:flex-row lg:items-baseline lg:gap-6 ">
                  <div className="small-links flex items-baseline justify-center gap-2 text-center">
                    <Link className="ph2" href="/pages/privacy-policy">
                      {t("Privacy Policy")}
                    </Link>
                    <Link className="ph2" href="/pages/terms-conditions">
                      {t("Terms & Conditions")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-right" id="payment">
              <div className="payment-methods flex flex-wrap gap-1 text-center lg:text-right">
                <svg
                  className="payment-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width={38}
                  height={24}
                  aria-labelledby="header-pi-american_express"
                >
                  <title id="header-pi-american_express">
                    {t("American Express")}
                  </title>
                  <g fill="none">
                    <path
                      fill="#000"
                      d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z"
                      opacity=".07"
                    />
                    <path
                      fill="#006FCF"
                      d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"
                    />
                    <path
                      fill="#FFF"
                      d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"
                    />
                  </g>
                </svg>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  width={38}
                  height={24}
                  aria-labelledby="header-pi-diners_club"
                >
                  <title id="header-pi-diners_club">{t("Diners Club")}</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <path
                    d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z"
                    fill="#3086C8"
                  />
                </svg>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  width={38}
                  height={24}
                  role="img"
                  aria-labelledby="header-pi-discover"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title id="header-pi-discover">{t("Discover")}</title>
                  <path
                    fill="#000"
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
                    fill="#fff"
                  />
                  <path
                    d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z"
                    fill="#231F20"
                  />
                  <path
                    d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
                    fill="url(#pi-paint0_linear)"
                  />
                  <path
                    opacity=".65"
                    d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
                    fill="url(#pi-paint1_linear)"
                  />
                  <path
                    d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z"
                    fill="#231F20"
                  />
                  <path
                    d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z"
                    fill="#231F20"
                  />
                  <path
                    d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z"
                    fill="#F48120"
                  />
                  <defs>
                    <linearGradient
                      id="pi-paint0_linear"
                      x1="21.657"
                      y1="12.275"
                      x2="19.632"
                      y2="9.104"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F89F20" />
                      <stop offset=".25" stopColor="#F79A20" />
                      <stop offset=".533" stopColor="#F68D20" />
                      <stop offset=".62" stopColor="#F58720" />
                      <stop offset=".723" stopColor="#F48120" />
                      <stop offset={1} stopColor="#F37521" />
                    </linearGradient>
                    <linearGradient
                      id="pi-paint1_linear"
                      x1="21.338"
                      y1="12.232"
                      x2="18.378"
                      y2="6.446"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F58720" />
                      <stop offset=".359" stopColor="#E16F27" />
                      <stop offset=".703" stopColor="#D4602C" />
                      <stop offset=".982" stopColor="#D05B2E" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width={38}
                  height={24}
                  role="img"
                  aria-labelledby="header-pi-maestro"
                >
                  <title id="header-pi-maestro">Maestro</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <circle fill="#EB001B" cx={15} cy={12} r={7} />
                  <circle fill="#00A2E5" cx={23} cy={12} r={7} />
                  <path
                    fill="#7375CF"
                    d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                  />
                </svg>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  width={38}
                  height={24}
                  aria-labelledby="header-pi-master"
                >
                  <title id="header-pi-master">Mastercard</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <circle fill="#EB001B" cx={15} cy={12} r={7} />
                  <circle fill="#F79E1B" cx={23} cy={12} r={7} />
                  <path
                    fill="#FF5F00"
                    d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                  />
                </svg>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  width={38}
                  height={24}
                  aria-labelledby="header-pi-visa"
                >
                  <title id="header-pi-visa">Visa</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  />
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  />
                  <path
                    d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                    fill="#142688"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToggleNavbar>
  )
}

export default MobileNavbar