"use client"
import { medusaClient } from "@lib/config"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import { notFound, useParams } from "next/navigation"

const OrderDetailsTemplate = dynamic(
  () => import("../../templates/order-details-template")
)

const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}

const Details = () => {
  const params = useParams()
  const id = typeof params?.id === "string" ? params.id : ""

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_order_details", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  )

  if (isError) {
    return notFound()
  }

  return <>{isSuccess && <OrderDetailsTemplate order={data} />}</>
}

export default Details
