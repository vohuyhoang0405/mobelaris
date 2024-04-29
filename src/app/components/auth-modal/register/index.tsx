"use client"
import { medusaClient } from "@lib/config"
import { useT } from "app/[locale]/context/sources"

import { LOGIN_VIEW, useAccount } from "app/[locale]/context/account-context"
import { gtagEvents } from "app/components/googleTag"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

const Button = dynamic(() => import("../../common/button"))
const Input = dynamic(() => import("../../common/input"))

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = ({ redirectUrl }) => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    console.log({ e })
    let em = t(
      e?.response?.data?.message || "These credentials do not match our records"
    )
    setAuthError(em)
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    const { email } = credentials
    if (email) {
      gtagEvents.SUBSCRIBE_TO_MAILING_LIST({ email: email })
    }
    medusaClient.customers
      .create(credentials)
      .then(({ customer }) => {
        setTimeout(() => {
          // emailSubscribe({
          //   email: customer.email,
          //   from: getListId(countryCode as string),
          // })
        })
        redirectUrl && router.push(redirectUrl)
        refetchCustomer()
      })
      .catch(handleError)
  })
  const t = useT()
  return (
    <div className="mb-20 mt-20 flex w-full max-w-sm flex-col">
      <h1 className="mb-6 border-b pb-6 text-center text-3xl uppercase">
        {t("Register")}
      </h1>
      {authError && (
        <div className="p-3 text-center ">
          <span className="text-small-regular w-full text-rose-500">
            {t(authError)}
          </span>
        </div>
      )}
      <form className="flex w-full flex-col" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            hideLabel
            label={t("First name")}
            {...register("first_name", {
              required: t("First name is required"),
            })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            hideLabel
            label={t("Last name")}
            {...register("last_name", { required: t("Last name is required") })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            hideLabel
            label={t("Email")}
            {...register("email", { required: t("Email is required") })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            hideLabel
            label={t("Phone")}
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            hideLabel
            label={t("Password")}
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
          <Button className="mt-6">{t("Submit")}</Button>
        </div>
      </form>
      <span className="text-small-regular mt-6 text-center text-gray-700">
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="btn-link btn-sm underline"
        >
          {t("GO TO LOGIN")}
        </button>
      </span>
    </div>
  )
}

export default Register
