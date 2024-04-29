"use client"
import InvisibleRecapchaInput from "@lib/recapcha/invisibleRecapchaInput"
import { T, useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import Input from "app/components/common/input"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { gtagEvents } from "./googleTag"

const Spinner = dynamic(() => import("./Icon/spinner"))

function ContactForm({
  redirectUrl = "/contact-us?success=true",
}: {
  redirectUrl?: string
}) {
  const t = useT()
  const { locale } = useStore()
  const [submitting, setsubmitting] = useState(false)
  const searchParams = useSearchParams()
  const emailref = useRef<HTMLInputElement>(null)
  const [success, setSuccess] = useState(searchParams?.get("success"))
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setsubmitting(true)
    // Perform any additional actions here
    console.log("Submitting form in 2 seconds...")
    if (emailref.current?.value) {
      gtagEvents.SUBSCRIBE_TO_MAILING_LIST_ENGAGEMENT({
        email: emailref.current?.value,
      })
    }
    setTimeout(() => {
      event.target.submit()
    }, 2000)
  }
  return (
    <div id="contactFormWrapper">
      {success && (
        <div>
          <input
            defaultChecked
            type="checkbox"
            hidden
            id="contact-success"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box">
              <div className="font-heading text-lg font-bold">
                <T>{`Thank you for your submission`}</T>
              </div>
              <div className="modal-action">
                <label htmlFor="contact-success" className="btn">
                  <T>Close</T>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      {submitting && (
        <div>
          <input
            defaultChecked
            type="checkbox"
            hidden
            id="contact-success"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box flex flex-col items-center justify-center gap-6">
              <div className="font-heading text-lg font-bold">
                <T>{`Thank you for your submission`}</T>
              </div>
              <Spinner size={40} />
            </div>
          </div>
        </div>
      )}
      <form
        method="post"
        action="/api/contact"
        id="contact_form"
        acceptCharset="UTF-8"
        className="contact-form space-y-6"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form_type" defaultValue="contact" />
        <input type="hidden" name="utf8" defaultValue="✓" />
        <input
          hidden
          type="hidden"
          name="to"
          defaultValue={"/" + locale + redirectUrl}
        />
        <Input required type="text" id="name" name="name" label={t("Name")} />

        <Input
          ref={emailref}
          required
          type="email"
          id="contactFormEmail"
          name="email"
          label={t("Email")}
        />
        <Input
          type="text"
          id="contactFormTelephone"
          name="phone"
          label={t("Phone Number")}
        />
        <Input
          rows={15}
          cols={4}
          id="contactFormMessage"
          name="body"
          required
          label={t("What’s on your mind?")}
          defaultValue={""}
        >
          {(props) => (
            <textarea
              {...props}
              className="peer textarea input-bordered w-full border px-2 pb-[0.35em] pt-[1em]  text-base  leading-none placeholder:text-transparent"
            />
          )}
        </Input>
        <InvisibleRecapchaInput onChange={console.log}>
          <div className="text-xs text-gray-400 [&_a]:text-blue-500">
            <T ishtml>
              {`This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                  <a href="https://policies.google.com/terms">Terms of Service</a> apply.`}
            </T>
          </div>
        </InvisibleRecapchaInput>

        <input
          data-badge="inline"
          type="submit"
          id="contactFormSubmit"
          className="secondary button btn btn-primary float-right ml-auto inline-block min-w-[200px] font-button text-white"
          defaultValue="Send"
        />
      </form>
    </div>
  )
}

export default ContactForm
