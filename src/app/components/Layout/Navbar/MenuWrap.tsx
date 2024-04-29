"use client"
import { PropsWithChildren, useState } from "react"

const MenuWrap = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const [show, setShow] = useState(false)
  return (
    <div
      onMouseEnter={!show ? () => setShow(true) : undefined}
      className={className}
    >
      {show && children}
    </div>
  )
}
export default MenuWrap
