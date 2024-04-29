import { PaymentSession } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"
import Radio from "app/components/common/radio"
import clsx from "clsx"
import dynamic from "next/dynamic"
import React from "react"

const PaymentStripe = dynamic(() => import("../payment-stripe"))
const PaymentTest = dynamic(() => import("../payment-test"))

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  const t = useT()
  const PaymentInfoMap: Record<string, { title: string; description: string }> =
    {
      stripe: {
        title: t("Credit card"),
        description: t("Secure payment with credit card"),
      },
      "stripe-ideal": {
        title: "iDEAL",
        description: t("Secure payment with iDEAL"),
      },
      paypal: {
        title: "PayPal",
        description: t("Secure payment with PayPal"),
      },
      manual: {
        title: t("Test payment"),
        description: t("Test payment using medusa-payment-manual"),
      },
    }
  return (
    <div
      className={clsx("flex flex-col border-b border-gray-200 last:border-b-0")}
    >
      <button
        className={"flex  gap-x-4  gap-y-3 px-5 py-3"}
        onClick={setSelected}
        disabled={disabled}
      >
        <Radio checked={selected} />
        <div className="flex flex-1 flex-col text-left">
          <h3 className="text-base-semi leading-none text-gray-900">
            {PaymentInfoMap[paymentSession.provider_id].title}
          </h3>
          <span className="text-small-regular mt-2 flex text-gray-700">
            {PaymentInfoMap[paymentSession.provider_id].description}
          </span>
        </div>
      </button>
      {selected && (
        <div className="w-full border-t bg-gray-50 p-3 shadow-inner">
          <div className="bg-white p-6">
            <PaymentElement paymentSession={paymentSession} />
          </div>
        </div>
      )}
    </div>
  )
}

const PaymentElement = ({
  paymentSession,
}: {
  paymentSession: PaymentSession
}) => {
  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <div className="pr-7 pt-8">
          <PaymentStripe />
        </div>
      )
    case "manual":
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === "development" ? <PaymentTest /> : null
    default:
      return null
  }
}

export default PaymentContainer
