"use client"
import { medusaClient } from "@lib/config"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import { notFound, useParams } from "next/navigation"

const OrderCompletedTemplate = dynamic(
  () => import("../../templates/order-completed-template")
)

const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}

const Confirmed = () => {
  const params = useParams()
  const id = typeof params?.id === "string" ? params.id : ""
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_order_confirmed", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  if (isError) {
    return notFound()
  }

  return <>{isSuccess && <OrderCompletedTemplate order={data} />}</>
}

export default Confirmed
