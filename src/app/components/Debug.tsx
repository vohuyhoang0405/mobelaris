"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

function Debug(props: any) {
  const pathname = usePathname()
  useEffect(() => {
    console.log({ props })
    console.log("pathname:", pathname)
  }, [])
  return null
}

export default Debug
