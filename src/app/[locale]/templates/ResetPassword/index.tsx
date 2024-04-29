"use client"

import { medusaClient } from "@lib/config"
import { useRouter, useSearchParams } from "next/navigation"

import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import Container from "app/components/Container"
import Button from "app/components/common/button"
import Input from "app/components/common/input"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
  confirn_password: string
}

const Resetpassword = ({ token }: { token: string }) => {
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const [sented, setSendted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()
  const { locale } = useStore()
  const submit = handleSubmit(async (data) => {
    setSubmitting(true)
    setError(undefined)
    if (data.password !== data.confirm_password) {
      setSubmitting(false)
      setError(t("password not match!"))
      return
    }

    await medusaClient.customers
      .resetPassword({
        password: data.password,
        email: data.email,
        token,
      })
      .then(() => {
        setSubmitting(false)
        setSendted(true)
        router.push("/" + locale + "/customer/account/login")
      })
      .catch(() => {
        setError(t("Token is expired."))
        setSubmitting(false)
      })
  })

  const t = useT()
  return (
    <div className="mb-20 mt-20 flex w-full max-w-sm flex-col">
      <h1 className="mb-6 border-b pb-6 text-center text-3xl uppercase">
        {t("Resset Password")}
      </h1>
      <div className="" />
      {error && (
        <div className="w-full p-6 text-center">
          <span className="text-small-regular w-full p-6 text-center text-rose-500">
            {error}
          </span>
        </div>
      )}
      <form className="flex w-full flex-col" onSubmit={submit}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            hideLabel
            label={t("Email")}
            type="email"
            required
            {...register("email", { required: t("Email is required") })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label={t("Password")}
            {...register("password", {
              required: t("Password is required"),
            })}
            type="password"
            autoComplete="password"
            errors={errors}
            required
          />
          <Input
            label={t("Password confirm")}
            {...register("confirm_password", {
              required: t("Password is required"),
            })}
            type="password"
            autoComplete="new_password"
            errors={errors}
            required
          />
          <Button className="mt-6">{t("Submit")}</Button>
        </div>
      </form>
    </div>
  )
}

const ResetPasswordTemplate = () => {
  const params = useSearchParams()
  const token = params?.get("token")
  const t = useT()
  if (!token)
    return (
      <Container className="mb-20 mt-20 flex w-full max-w-sm flex-col text-center">
        <h1 className="mb-6 border-b pb-6 text-center text-3xl uppercase">
          {t("Resset Password")}
        </h1>
        <div className="" />
        {t("Token is expired.")}
      </Container>
    )

  return (
    <>
      <Container className="flex justify-center">
        {token && <Resetpassword token={token} />}
      </Container>
    </>
  )
}

export default ResetPasswordTemplate
