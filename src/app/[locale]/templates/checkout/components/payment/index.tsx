import { STEPS, useCheckout } from "app/[locale]/context/checkout-context"
import { useT } from "app/[locale]/context/sources"
import Spinner from "app/components/Icon/spinner"
import dynamic from "next/dynamic"
import { useEffect } from "react"

const PaymentButton = dynamic(() => import("../payment-button"))
const PaymentContainer = dynamic(() => import("../payment-container"))

const Payment = () => {
  const {
    cart,
    setPaymentSession,
    initPayment,
    sameAsBilling: { state: isSame },
    setStep,
  } = useCheckout()

  /**
   * Fallback if the payment session are not loaded properly we
   * retry to load them after a 5 second delay.
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (cart?.shipping_address && cart?.payment_sessions) {
      timeout = setTimeout(() => {
        initPayment()
      }, 1000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])
  const t = useT()
  return (
    <div className="">
      {cart?.payment_sessions?.length ? (
        <div className="border bg-white ">
          {cart.payment_sessions
            .sort((a, b) => {
              return a.provider_id > b.provider_id ? 1 : -1
            })
            .map((paymentSession) => {
              return (
                <PaymentContainer
                  paymentSession={paymentSession}
                  key={paymentSession.id}
                  selected={
                    cart?.payment_session?.provider_id ===
                    paymentSession.provider_id
                  }
                  setSelected={() =>
                    setPaymentSession(paymentSession.provider_id)
                  }
                />
              )
            })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-gray-900">
          <Spinner />
        </div>
      )}
      <div className="mt-6 flex justify-between gap-6">
        <button
          onClick={() => setStep(STEPS.SHIPPING)}
          className="flex max-w-[200px] items-center gap-2"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 512 512"
            height="1.4em"
            className="inline leading-none"
            width="1.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
          </svg>
          {t("Return to shipping")}
        </button>
        <PaymentButton paymentSession={cart?.payment_session} />
      </div>
    </div>
  )
}

export default Payment
