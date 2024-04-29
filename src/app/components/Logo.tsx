import logo from "@shop/assets/images/logo.png"
import Image from "next/image"
function Logo() {
  return (
    <Image
      className="max-w-[150px] lg:max-w-[200px]"
      src={logo}
      alt="Mobelaris Logo"
    ></Image>
  )
}

export default Logo
