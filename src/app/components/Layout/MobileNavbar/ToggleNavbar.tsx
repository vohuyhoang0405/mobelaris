"use client"

import { usePathname } from "next/navigation"
import { PropsWithChildren, useState } from "react"

function ToggleNavbar({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  return (
    <div className="max-w-screen drawer drawer-end pointer-events-none fixed inset-0 top-0 z-10 h-full w-full lg:hidden">
      <input
        key={pathname}
        className="peer drawer-toggle"
        id="openMenuMobile"
        type="checkbox"
        hidden
        onChange={!show ? (e) => setShow(true) : undefined}
      />
      {show && children}
    </div>
  )
}
export default ToggleNavbar
