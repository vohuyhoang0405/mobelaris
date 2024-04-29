"use client"
import { useStore } from "../[locale]/context/store-context"

function Cartcount() {
  const { cartCount } = useStore()
  return <>{cartCount > 0 && `${cartCount > 99 ? "99+" : cartCount}`}</>
}

export default Cartcount
