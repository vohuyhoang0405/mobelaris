"use client"
import { FC, PropsWithChildren, useEffect, useRef } from "react"

const Prose: FC<PropsWithChildren> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerRef.current) return
    containerRef?.current.querySelectorAll("style").forEach((e) => {
      e.innerHTML = ""
    })
  }, [])
  return (
    <div
      ref={containerRef}
      className="prose mx-auto max-w-none prose-a:text-sale prose-img:mx-auto"
    >
      {children}
    </div>
  )
}
export default Prose
