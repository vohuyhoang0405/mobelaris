"use client"
import { useAccount } from "app/[locale]/context/account-context"

import { T } from "app/[locale]/context/sources"
import dynamic from "next/dynamic"

const ProfileBillingAddress = dynamic(() => import("./profile-billing-address"))
const ProfileEmail = dynamic(() => import("./profile-email"))
const ProfileName = dynamic(() => import("./profile-name"))
const ProfilePassword = dynamic(() => import("./profile-password"))
const ProfilePhone = dynamic(() => import("./profile-phone"))

const ProfileTemplate = () => {
  const { customer, retrievingCustomer, refetchCustomer } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">
          <T>{`Profile`}</T>
        </h1>
        <p className="text-base-regular">
          <T>{`View and update your profile information, including your name, email,
          and phone number. You can also update your billing address, or change
          your password.`}</T>
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        <ProfilePassword customer={customer} />
        <Divider />
        <ProfileBillingAddress customer={customer} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="h-px w-full bg-gray-200" />
}

export default ProfileTemplate
