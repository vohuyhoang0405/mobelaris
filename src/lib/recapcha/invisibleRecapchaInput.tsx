"use client"

import { useEffect, useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export default function InvisibleRecapchaInput({
  children,
  onChange,
  name,
}: {
  children?: React.ReactNode
  onChange?: Function
  name?: string
}) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [token, setToken] = useState<undefined | string>()

  async function handleCaptchaSubmission(token: string | null) {
    token &&
      (() => {
        setToken(token)
        onChange && onChange(token)
      })()
  }
  useEffect(() => {
    recaptchaRef.current?.execute()
  }, [])
  return (
    <>
      <style>{`.grecaptcha-badge{visible:hidden}`}</style>
      {children}
      <ReCAPTCHA
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
      />
      {token && name && (
        <input
          type="text"
          name={name}
          hidden
          defaultValue={token}
          key={token}
        />
      )}
    </>
  )
}
