"use client"
import { getLocalStorage, setLocalStorage } from "@lib/storageHelper"
import { T, useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Container = dynamic(() => import("./Container"))

const COOKIES_KEY = "cookie_consent"
const NewLetter = () => {
  const { locale } = useStore()
  const t = useT()
  const id = "cookies-modal"
  const [show, setShow] = useState(false)
  const [cookieConsent, setCookieConsent] = useState(false)
  const handleSubmit = () => {
    setCookieConsent(true)
  }
  useEffect(() => {
    const storedCookieConsent = getLocalStorage(COOKIES_KEY, null)
    setCookieConsent(storedCookieConsent)
    if (!storedCookieConsent) {
      setTimeout(() => {
        setShow(true)
      }, 2000)
    }
  }, [setCookieConsent])
  useEffect(() => {
    if (!show) return
    const newValue = cookieConsent ? "granted" : "denied"
    window.gtag("consent", "update", {
      analytics_storage: newValue,
      ad_personalization: newValue,
      ad_user_data: newValue,
    })
    setLocalStorage(COOKIES_KEY, cookieConsent)
  }, [cookieConsent, show])

  if (!show || cookieConsent) return null
  return (
    <>
      <input
        type="checkbox"
        id={id}
        hidden
        defaultChecked={show}
        className="peer modal-toggle"
      />
      <div className="modal modal-bottom !pointer-events-none  hidden bg-transparent ease-in-out animatecss animatecss-fadeInUp peer-checked:flex">
        <div className="modal-box pointer-events-auto w-full overflow-visible bg-black text-neutral-content">
          <Container>
            <div className="flex flex-col items-center justify-center gap-5  lg:flex-row">
              <div
                className="prose prose-sm  w-full max-w-none text-white prose-a:uppercase prose-a:text-white"
                dangerouslySetInnerHTML={{
                  __html:
                    t(`<a href="/${locale}/">www.mobelaris.com</a> and our partners use cookies
to manage performance, advertising and customer experience. By
continuing, you agree to our use of cookies. Please review our  <a href="/${locale}/privacy-policy/#Howweusecookie">
policy</a> to learn about managing cookies.`),
                }}
              ></div>
              <button
                onClick={handleSubmit}
                className="m-button m-accept btn btn-outline min-w-[100px] bg-white text-neutral hover:border-white hover:ring"
              >
                <T>Accept</T>
              </button>
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}
export default NewLetter
