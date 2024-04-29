"use client"
import { useAccount } from "app/[locale]/context/account-context"
import { useStore } from "app/[locale]/context/store-context"
import Script from "next/script"
import React, { useState } from "react"
const klaviyoPublickKey = process.env.KLAVIYO_PUBLIC_KEY || "T9nwDG"

interface Props {}

const KlaviyoTracking: React.FC<Props> = ({}) => {
  const [loaded, setload] = useState(false)
  const { cart } = useStore()
  const { customer } = useAccount()
  React.useEffect(() => {
    if (loaded) {
      let email = cart?.email || customer?.email
      if (email) {
        window._learnq = window._learnq || []
        const identifyItem = {
          // Change the line below to dynamically print the user's email.
          $email: email,
        }
        window._learnq.push(["identify", identifyItem])
      }
    }
  }, [loaded, cart?.email])

  return (
    <Script
      defer
      onReady={() => {
        let timmer = setInterval(() => {
          if (window.klaviyo) {
            setload(window.klaviyo)
            clearInterval(timmer)
          }
        }, 2000)
      }}
      strategy="worker"
      src={
        "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=" +
        klaviyoPublickKey
      }
    ></Script>
  )
}

export default KlaviyoTracking
