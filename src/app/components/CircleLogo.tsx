import logo from "@shop/assets/images/popup-logo.png"
import Image from "next/image"
function CircleLogo({ size = 80 }: { size?: number }) {
  return (
    <Image
      width={size}
      height={size}
      className="w-full"
      src={logo}
      alt="Mobelaris Logo"
    ></Image>
  )
}

export default CircleLogo
