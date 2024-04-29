"use client"
import { T, useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import ContactForm from "app/components/ContactForm"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
function ContactFormTrade() {
  const t = useT()
  const { locale } = useStore()
  const searchParams = useSearchParams()
  const [success, setSuccess] = useState(searchParams?.get("success"))
  const [container, setContainer] = useState<HTMLElement | undefined>()
  useEffect(() => {
    setContainer(document.querySelector("#contctfree-sc"))
  }, [])
  if (!container) {
    return null
  }
  return createPortal(
    <div>
      <div className="text-center">
        <T>Send us a note and we’ll get back to you as quickly as possible.</T>
      </div>
      <ContactForm />
    </div>,
    document.querySelector("#contctfree-sc")
  )
}

export default ContactFormTrade
