"use client"
import { Address, ShippingMethod } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"

type ShippingDetailsProps = {
  address: Address
  shippingMethods: ShippingMethod[]
}

const ShippingDetails = ({
  address,
  shippingMethods,
}: ShippingDetailsProps) => {
  const t = useT()
  return (
    <div className="text-base-regular">
      <h2 className="text-base-semi">{t("Delivery")}</h2>
      <div className="my-2">
        <h3 className="text-small-regular text-gray-700">{t("Address")}</h3>
        <div className="flex flex-col">
          <span>{`${address.first_name} ${address.last_name}`}</span>
          <span>{`${address.address_1}${
            address.address_2 && ", " + address.address_2
          }`}</span>
          <span>{`${address.city}, ${address.province} ${address.postal_code}`}</span>
          <span>{address.country_code?.toUpperCase()}</span>
        </div>
      </div>
      <div className="my-2">
        <h3 className="text-small-regular text-gray-700">
          {t("Delivery method")}
        </h3>
        <div>
          {shippingMethods.map((sm) => {
            return <div key={sm.id}>{sm?.shipping_option?.name}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
