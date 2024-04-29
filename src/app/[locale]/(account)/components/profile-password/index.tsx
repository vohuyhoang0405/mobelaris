import { medusaClient } from "@lib/config"
import { Customer } from "@medusajs/medusa"
import { T } from "app/[locale]/context/sources"
import Input from "app/components/common/input"
import { useUpdateMe } from "medusa-react"
import dynamic from "next/dynamic"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

const AccountInfo = dynamic(() => import("../account-info"))

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type UpdateCustomerPasswordFormData = {
  old_password: string
  new_password: string
  confirm_password: string
}

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<UpdateCustomerPasswordFormData>()

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe()

  useEffect(() => {
    reset()
  }, [customer, reset])

  const updatePassword = async (data: UpdateCustomerPasswordFormData) => {
    const isValid = await medusaClient.auth
      .authenticate({
        email: customer.email,
        password: data.old_password,
      })
      .then(() => true)
      .catch(() => false)

    if (!isValid) {
      setError("old_password", {
        type: "validate",
        message: "Old password is incorrect",
      })
      setErrorMessage("Old password is incorrect")

      return
    }

    if (data.new_password !== data.confirm_password) {
      setError("confirm_password", {
        type: "validate",
        message: "Passwords do not match",
      })
      setErrorMessage("Passwords do not match")

      return
    }

    return update({
      id: customer.id,
      password: data.new_password,
    })
  }

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      onReset={() => reset()}
      className="w-full"
    >
      <AccountInfo
        label="Password"
        currentInfo={
          <span>
            <T>The password is not shown for security reasons</T>
          </span>
        }
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        errorMessage={errorMessage}
        clearState={clearState}
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Old password"
            {...register("old_password", {
              required: true,
            })}
            type="password"
            errors={errors}
          />
          <Input
            label="New password"
            type="password"
            {...register("new_password", { required: true })}
            errors={errors}
          />
          <Input
            label="Confirm password"
            type="password"
            {...register("confirm_password", { required: true })}
            errors={errors}
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePassword
