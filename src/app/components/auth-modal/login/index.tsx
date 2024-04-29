"use client"
import { medusaClient } from "@lib/config"

import { LOGIN_VIEW, useAccount } from "app/[locale]/context/account-context"
import { useT } from "app/[locale]/context/sources"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

const Button = dynamic(() => import("../../common/button"))
const Input = dynamic(() => import("../../common/input"))

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = ({ redirectUrl }: { redirectUrl: string }) => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        redirectUrl && router.push(redirectUrl)
        refetchCustomer()
      })
      .catch(handleError)
  })
  const t = useT()
  return (
    <div className="mb-20 mt-20 flex w-full max-w-sm flex-col">
      <h1 className="mb-6 border-b pb-6 text-center text-3xl uppercase">
        {t("Login")}
      </h1>
      <div className="" />
      {authError && (
        <div>
          <span className="text-small-regular w-full text-rose-500">
            These credentials do not match our records
          </span>
        </div>
      )}
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-6">
          <Input
            icon={
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
              </svg>
            }
            label={t("Email address")}
            hideLabel
            {...register("email", { required: t("Email is required") })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            icon={
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
              </svg>
            }
            label={t("password")}
            hideLabel
            {...register("password", { required: t("Password is required") })}
            type="password"
            autoComplete="current-password"
            errors={errors}
          />
          <Button className="">{t("Sign In")}</Button>
          <a
            onClick={() => setCurrentView(LOGIN_VIEW.FORGOTPASSWORD)}
            className="right text-center text-sm font-semibold uppercase"
            href="#forgot-password"
          >
            {t("Forgot Password")}
          </a>
        </div>
      </form>
      <div className="mt-6 flex items-baseline justify-center pt-6 text-center">
        <span className="text-small-regular mt-6 text-center text-gray-700">
          {t("Don't have an account?")}
        </span>
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="btn btn-link btn-sm inline-flex items-baseline justify-center gap-2 text-lg"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
          </svg>

          {t("SIGN UP NOW")}
        </button>
      </div>
    </div>
  )
}

export default Login
