"use client"
import { T } from "app/[locale]/context/sources"
import Spinner from "app/components/Icon/spinner"
import Button from "app/components/common/button"
import { useCustomerOrders } from "medusa-react"
import dynamic from "next/dynamic"
import Link from "next/link"

const OrderCard = dynamic(() => import("../order-card"))

const OrderOverview = () => {
  const { orders, isLoading } = useCustomerOrders()

  if (isLoading) {
    return (
      <div className="flex w-full justify-center pt-12 text-gray-900">
        <Spinner size={36} />
      </div>
    )
  }

  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-gray-200 pb-6 last:border-none last:pb-0"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You dont have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <Link href="/" passHref legacyBehavior>
          <Button>
            <T>Continue shopping</T>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderOverview
