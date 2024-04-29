"use client"
import { T, useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import Spinner from "app/components/Icon/spinner"
import Input from "app/components/common/input"
import { gtagEvents } from "app/components/googleTag"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const CircleLogo = dynamic(() => import("./CircleLogo"))

const ContactForm = ({ onSubmit }: { onSubmit: (email: string) => void }) => {
  const t = useT()
  const { locale } = useStore()
  const emailref = useRef<HTMLInputElement>()
  const [submitting, setsubmitting] = useState(false)
  function handleSubmit(event: any) {
    event.preventDefault()
    setsubmitting(true)
    // Perform any additional actions here
    if (emailref.current?.value) {
      gtagEvents.SUBSCRIBE_TO_MAILING_LIST_ENGAGEMENT({
        email: emailref.current?.value,
      })
    }
    setTimeout(() => {
      onSubmit(emailref.current?.value || "")
    }, 1000)
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: emailref.current?.value,
        "g-recaptcha-response": event.target["g-recaptcha-response"].value,
        locale,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  return (
    <div>
      <form
        method="post"
        action="/api/contact"
        id="contact_form"
        acceptCharset="UTF-8"
        className="contact-form flex flex-col space-y-6"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form_type" defaultValue="contact" />
        <input type="hidden" name="utf8" defaultValue="✓" />

        <div className="grid gap-3">
          <Input
            ref={emailref}
            required
            type="email"
            id="contactFormEmail"
            name="email"
            label={t("Email address")}
          />
          {/* <InvisibleRecapchaInput onChange={console.log}>
            <div className="text-xs text-gray-400 [&_a]:text-blue-500">
              <T ishtml>
                {
                  `This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                  <a href="https://policies.google.com/terms">Terms of Service</a> apply.`
                }
              </T>
            </div>
          </InvisibleRecapchaInput> */}
          {submitting ? (
            <button
              disabled
              className="button btn btn-block ml-auto flex min-w-[200px] items-center justify-center font-button text-xl font-bold text-white"
            >
              <Spinner size={24} />
            </button>
          ) : (
            <input
              type="submit"
              id="contactFormSubmit"
              onClick={(e) => {
                if (emailref.current?.value) {
                  gtagEvents.SUBSCRIBE_TO_MAILING_LIST_ENGAGEMENT({
                    email: emailref.current?.value,
                  })
                }
              }}
              className="btn btn-accent btn-block ml-auto inline-block min-w-[200px] font-button text-xl font-bold text-white"
              defaultValue={t("SIGN UP")}
            ></input>
          )}
        </div>
      </form>
    </div>
  )
}
const NewLetter = () => {
  const t = useT()
  const id = "newleter-modal"
  const forceShow = useSearchParams()?.get("showNewLetter")
  const { region, countryCode } = useStore()
  const [show, setShow] = useState(forceShow)
  const [code, setCode] = useState<string>()
  const [submited, setsubmited] = useState(false)
  const handleSubmit = (email: string) => {
    localStorage.setItem("NewLetter_submited", "true")
    setsubmited(true)
    setCode(
      ("WELCOME" + (countryCode === "gb" ? "" : countryCode)).toUpperCase()
    )
  }
  const handleClose = () => {
    localStorage.setItem("NewLetter_submited", "true")
  }
  useEffect(() => {
    if (localStorage.getItem("NewLetter_submited") !== "true") {
      setTimeout(() => {
        setShow(true)
      }, 8000)
    }
  }, [])
  console.log({ forceShow })
  if (show || forceShow) {
    return (
      <>
        {submited ? (
          <div>
            <input
              defaultChecked
              type="checkbox"
              hidden
              id="newleter-success"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box">
                <div className="w-full bg-white">
                  <div className="relative w-full border-2 border-black px-12 text-center">
                    <div className="py-12">
                      <div>
                        <label
                          aria-label={t("close")}
                          title={t("close")}
                          htmlFor="newleter-success"
                          onClick={() => {
                            handleClose()
                          }}
                          className="btn btn-circle btn-sm absolute right-3 top-3"
                        >
                          <svg
                            aria-label={t("close")}
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
                          </svg>
                        </label>
                        <div className="wrap">
                          <h2 className="text-2xl">
                            <T>THANKS FOR SIGNING UP!</T>
                          </h2>
                          <p>
                            <T>Here is your coupon code</T>
                          </p>
                          <small>
                            <T>(we will also email it to you)</T>:
                          </small>
                          <h2 id="coupon-code" className="mb-2 mt-5 text-4xl">
                            <span>{code}</span>
                          </h2>
                          <small>
                            <T>*Copy and paste in checkout</T>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <input
              type="checkbox"
              hidden
              id={id}
              defaultChecked={show}
              className="peer modal-toggle"
            />
            <div className="modal   animatecss-fadeIn ">
              <div className="modal-box overflow-visible">
                <div className="absolute left-1/2 top-[-30px] z-10 w-[100px] -translate-x-1/2 transform  rounded-full bg-white p-5">
                  <CircleLogo />
                </div>
                <div className="w-full bg-white">
                  <div className="relative w-full border-2 border-black px-12">
                    <div className="py-12">
                      <section className="homepage-newsletter gridlock">
                        <div className=" mx-auto flex w-full max-w-[1264px] flex-col items-center justify-between gap-6 px-4 text-center sm:px-8 lg:flex-row">
                          <div className="wrap">
                            <div className="font-heading text-[48px] font-bold">
                              <T ishtml>{`${
                                (() => {
                                  let discount = "12 eur"
                                  if (countryCode === "gb") {
                                    return "10 GBP"
                                  }
                                  if (countryCode === "no") {
                                    return "150 kr"
                                  }
                                  if (countryCode === "se") {
                                    return "150 kr"
                                  }
                                  if (countryCode === "ch") {
                                    return "12 chf"
                                  }
                                  return discount
                                })() + " "
                              } <span class="text-[40px]">OFF</span>`}</T>
                            </div>
                            <h2 className="text-2xl">
                              <T>YOUR FIRST ORDER</T>
                            </h2>
                            <p>
                              <T>{`Sign up and be the first to hear of promotions, new products, events and more.`}</T>
                            </p>
                            <ContactForm onSubmit={handleSubmit} />
                            <small>
                              <T>* ON ORDERS OVER</T>{" "}
                              {(() => {
                                let discount = "250 eur"
                                if (countryCode === "gb") {
                                  return "200 GBP"
                                }
                                if (countryCode === "no") {
                                  return "3000kr"
                                }
                                if (countryCode === "se") {
                                  return "3000kr"
                                }
                                if (countryCode === "ch") {
                                  return "237 chf"
                                }
                                return discount
                              })()}
                            </small>
                          </div>
                        </div>
                      </section>
                    </div>
                    <label
                      aria-label={t("close")}
                      title={t("close")}
                      htmlFor={id}
                      onClick={() => {
                        handleClose()
                      }}
                      className="btn btn-circle btn-sm absolute right-3 top-3"
                    >
                      <svg
                        aria-label={t("close")}
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  return null
}
export default NewLetter
