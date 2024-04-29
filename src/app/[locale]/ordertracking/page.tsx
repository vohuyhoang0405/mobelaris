"use client"
import { GTagEventEnterPage } from "app/components/googleTag"
import dynamic from "next/dynamic"

import { T, useT } from "../context/sources"

const Button = dynamic(() => import("../../components/common/button"))
const Input = dynamic(() => import("../../components/common/input"))

type Props = {}

function Page({}: Props) {
  const t = useT()
  return (
    <div className="flex justify-center py-12">
      <form
        method="post"
        action="/api/ordertracking"
        id="contact_form"
        acceptCharset="UTF-8"
        className="block max-w-md space-y-6 border-2 border-black p-6 lg:p-12"
      >
        <div className="font-heading text-5xl">
          <T>Order Tracking</T>
        </div>
        <Input required label={t("Order id")} name="orderId"></Input>
        <Input required label={t("Email address")} name="email"></Input>
        <Button
          type="submit"
          className="btn-lg btn-block block border-black bg-black font-button"
        >
          {t("TRACK ORDER")}
        </Button>
      </form>
      <GTagEventEnterPage type="undefined" />
    </div>
  )
}

export default Page
