"use client"
import { Store } from "app/[locale]/context/store-context"

function CartCount({}: {}) {
  return (
    <Store>
      {({ store: { cartCount } }) => {
        return <>{cartCount < 100 ? cartCount : "99+"}</>
      }}
    </Store>
  )
}

export default CartCount
