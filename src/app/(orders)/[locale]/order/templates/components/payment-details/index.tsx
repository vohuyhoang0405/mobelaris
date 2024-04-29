import { Payment, PaymentStatus } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"

type PaymentDetailsProps = {
  payments: Payment[]
  paymentStatus: PaymentStatus
}

const PaymentDetails = ({ payments, paymentStatus }: PaymentDetailsProps) => {
  const t = useT()
  return (
    <div>
      <h2 className="text-base-semi">{t("Payment")}</h2>
      <div className="my-2 capitalize">
        {payments.map((p) => {
          return p.provider_id
        })}
      </div>
    </div>
  )
}

const PayPalDetails = () => {
  return (
    <div className="text-base-regular flex flex-col">
      <span className="text-small-regular text-gray-700">PayPal</span>
      <span>PayPal payment</span>
    </div>
  )
}

const StripeDetails = ({ payment }: { payment: Payment }) => {
  const card: {
    brand: string
    last4: string
    exp_year: number
    exp_month: number
  } = (payment.data.charges as any).data[0].payment_method_details.card

  return (
    <div className="text-base-regular flex flex-col">
      <span className="text-small-regular text-gray-700">
        {card.brand.substring(0, 1).toUpperCase()}
        {card.brand.substring(1)}
      </span>
      <span>************{card.last4}</span>
      <span>
        {card.exp_month > 9 ? card.exp_month : `0${card.exp_month}`} /{" "}
        {card.exp_year.toString().slice(2)}
      </span>
    </div>
  )
}

const TestDetails = () => {
  return (
    <div className="text-base-regular flex flex-col">
      <span className="text-small-regular text-gray-700">Test</span>
      <span>Test payment using medusa-payment-manual</span>
    </div>
  )
}

export default PaymentDetails
