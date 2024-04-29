"use client"
import { Order } from "@medusajs/medusa"
import { T } from "app/[locale]/context/sources"
import Button from "app/components/common/button"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import { useMemo } from "react"

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items.length
  }, [order])

  return (
    <div className="flex flex-col bg-white">
      <div className="text-large-semi mb-1 uppercase">#{order.display_id}</div>
      <div className="text-small-regular flex items-center divide-x divide-gray-200 text-gray-700">
        <span className="pr-2">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2">
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>
      <div className="my-4 grid grid-cols-2 gap-4 small:grid-cols-4">
        {order.items.slice(0, 3).map((i) => {
          return (
            <div key={i.id} className="flex flex-col gap-y-2">
              <div
                className="relative w-full"
                style={{ paddingBottom: "129.62356792144024%" }}
              >
                <img
                  className="lazyload-fade lazyautosizes lazyloaded absolute inset-0 h-full w-full bg-transparent object-contain"
                  data-sizes="auto"
                  alt={" image"}
                  src={order.items[0].thumbnail}
                />
              </div>
              <div className="text-small-regular flex items-center text-gray-700">
                <span className="font-semibold text-gray-900">{i.title}</span>
                <span className="ml-2">x</span>
                <span>{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="text-small-regular text-gray-700">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-gray-700">
              <T>more</T>
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Link href={`/order/details/${order.id}`}>
          <Button variant="secondary">
            <T>See details</T>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderCard
