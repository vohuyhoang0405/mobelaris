"use client"
import { useEffect } from "react"
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document
      .querySelector("html")
      ?.style.setProperty(
        "--scrollbar-width",
        window.innerWidth - document.body.clientWidth + "px"
      )
  }, [])
  return children
}
