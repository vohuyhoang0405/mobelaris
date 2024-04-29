"use client"
import { medusaClient } from "@lib/config"

import { LOGIN_VIEW, useAccount } from "app/[locale]/context/account-context"
import { T, useT } from "app/[locale]/context/sources"
import dynamic from "next/dynamic"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

const Button = dynamic(() => import("../../common/button"))
const Input = dynamic(() => import("../../common/input"))

interface SignInCredentials extends FieldValues {
  email: string
}

const Forgotpassword = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const [sented, setSendted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.customers
      .generatePasswordToken(credentials)
      .then((res) => {
        console.log(res)
        setSendted(true)
      })
      .catch((err) => {
        console.log(err)
        setAuthError(err.message)
      })
  })
  const t = useT()
  return (
    <div className="mb-20 mt-20 flex w-full max-w-sm flex-col">
      <h1 className="mb-6 border-b pb-6 text-center text-3xl uppercase">
        {t("Forgot password")}
      </h1>
      <div className="" />
      {authError && (
        <div>
          <span className="text-small-regular w-full text-rose-500">
            <T>{"The email is not found."}</T>
          </span>
        </div>
      )}
      {sented ? (
        <div className="p-6 text-center">
          <T>{"Check your email!"}</T>
        </div>
      ) : (
        <form className="flex w-full flex-col" onSubmit={onSubmit}>
          <div className="flex w-full flex-col gap-y-2">
            <div>
              {t(
                "Please enter your email address below to receive a password reset link."
              )}
            </div>
            <Input
              hideLabel
              label={t("Email")}
              onKeyDown={() => setAuthError(undefined)}
              {...register("email", { required: t("Email is required") })}
              autoComplete="email"
              errors={errors}
            />
            <Button className="mt-6">{t("Submit")}</Button>
          </div>
        </form>
      )}

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

export default Forgotpassword
