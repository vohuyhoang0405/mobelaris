"use client"

import Container from "app/components/Container"
import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "./_actions/verifyCapcha"

export default function WithRecapcha({
  children,
}: {
  children: React.ReactNode
}) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsverified] = useState<boolean>(false)

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false))
  }
  return (
    <>
      {!isVerified && (
        <Container className="flex min-h-[500px] items-center justify-center">
          <ReCAPTCHA
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
          />
        </Container>
      )}
      {isVerified && children}
    </>
  )
}
