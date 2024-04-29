"use client"
import { medusaClient } from "@lib/config"
import useToggleState from "@lib/hooks/use-toggle-state"
import { useAccount } from "app/[locale]/context/account-context"
import Input from "app/components/common/input"
import Modal from "app/components/common/modal"

import Spinner from "app/components/Icon/spinner"
import Button from "app/components/common/button"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { IconProps } from "types/icon"

const CountrySelect = dynamic(() => import("../country-select"))

const Plus: React.FC<IconProps> = ({
  size = "16",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M8 3.33331V12.6666"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 8H12.6663"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
type FormValues = {
  first_name: string
  last_name: string
  city: string
  country_code: string
  postal_code: string
  province?: string
  address_1: string
  address_2?: string
  phone?: string
  company?: string
}

const AddAddress: React.FC = () => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const handleClose = () => {
    reset({
      first_name: "",
      last_name: "",
      city: "",
      country_code: "",
      postal_code: "",
      address_1: "",
      address_2: "",
      company: "",
      phone: "",
      province: "",
    })
    close()
  }

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || "",
      address_1: data.address_1,
      address_2: data.address_2 || "",
      city: data.city,
      country_code: data.country_code,
      province: data.province || "",
      postal_code: data.postal_code,
      phone: data.phone || "",
      metadata: {},
    }

    medusaClient.customers.addresses
      .addAddress({ address: payload })
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        handleClose()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Failed to add address, please try again.")
      })
  })

  return (
    <>
      <button
        className="flex h-full min-h-[220px] w-full flex-col justify-between border border-gray-200 p-5"
        onClick={open}
      >
        <span className="text-base-semi">New address</span>
        <Plus size={24} />
      </button>

      <Modal isOpen={state} close={handleClose}>
        <Modal.Title>Add address</Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2">
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="First name"
                {...register("first_name", {
                  required: "First name is required",
                })}
                required
                errors={errors}
                autoComplete="given-name"
              />
              <Input
                label="Last name"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                required
                errors={errors}
                autoComplete="family-name"
              />
            </div>
            <Input label="Company" {...register("company")} errors={errors} />
            <Input
              label="Address"
              {...register("address_1", {
                required: "Address is required",
              })}
              required
              errors={errors}
              autoComplete="address-line1"
            />
            <Input
              label="Apartment, suite, etc."
              {...register("address_2")}
              errors={errors}
              autoComplete="address-line2"
            />
            <div className="grid grid-cols-[144px_1fr] gap-x-2">
              <Input
                label="Postal code"
                {...register("postal_code", {
                  required: "Postal code is required",
                })}
                required
                errors={errors}
                autoComplete="postal-code"
              />
              <Input
                label="City"
                {...register("city", {
                  required: "City is required",
                })}
                errors={errors}
                required
                autoComplete="locality"
              />
            </div>
            <Input
              label="Province / State"
              {...register("province")}
              errors={errors}
              autoComplete="address-level1"
            />
            <CountrySelect
              {...register("country_code", { required: true })}
              autoComplete="country"
            />
            <Input
              label="Phone"
              {...register("phone")}
              errors={errors}
              autoComplete="phone"
            />
          </div>
          {error && (
            <div className="text-small-regular py-2 text-rose-500">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="min-h-0 !border-gray-200 !bg-gray-200 !text-gray-900"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className="min-h-0" onClick={submit} disabled={submitting}>
            Save
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddAddress
