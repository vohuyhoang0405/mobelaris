import mainMenu from "@shop/navigations"
import dynamic from "next/dynamic"
const MobileNavbar = dynamic(() => import("./MobileNavbar"), {
  loading: () => null,
  ssr: false,
})

export default function MobileNavbarLazy() {
  return <MobileNavbar mainMenu={mainMenu} />
}
