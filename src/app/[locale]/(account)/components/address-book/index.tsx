"use client"
import { useAccount } from "app/[locale]/context/account-context"
import dynamic from "next/dynamic"
import React from "react"

const AddAddress = dynamic(() => import("../address-card/add-address"))
const EditAddress = dynamic(() => import("../address-card/edit-address-modal"))

type AddressBookProps = {}

const AddressBook: React.FC<AddressBookProps> = ({}) => {
  const { customer } = useAccount()
  return (
    <div className="w-full">
      <div className="mt-4 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <AddAddress />
        {customer?.shipping_addresses.map((address) => {
          return <EditAddress address={address} key={address.id} />
        })}
      </div>
    </div>
  )
}

export default AddressBook
