"use client"

import { useEffect } from "react"

const whoops = "Phew, I made it to the client-side…".padEnd(80)

const ErrorTesting = () => {
  useEffect(() => {
    whoops.ewrew.werwq
  }, [])
  return <pre>rerez</pre>
}

export default ErrorTesting
