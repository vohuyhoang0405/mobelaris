"use client"

import { useEffect, useState } from "react"

function Delay(props: { children: JSX.Element }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let lastKnownScrollPosition = 0
    let ticking = false
    document.addEventListener("scroll", (event) => {
      lastKnownScrollPosition = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastKnownScrollPosition > 100) {
            setReady(true)
          }
          ticking = false
        })

        ticking = true
      }
    })
  }, [])
  if (!ready) {
    return null
  }
  return props.children
}

export default Delay
