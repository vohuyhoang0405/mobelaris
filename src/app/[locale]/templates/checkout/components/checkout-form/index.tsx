import GTMAddShippingInfoEvent from "@lib/gtm-events/add-shipping-info"
import { STEPS, useCheckout } from "app/[locale]/context/checkout-context"
import { useT } from "app/[locale]/context/sources"
import { GTagEventEnterPage } from "app/components/googleTag"
import { formatAmount } from "medusa-react"
import dynamic from "next/dynamic"

const Addresses = dynamic(() => import("../addresses"))
const Payment = dynamic(() => import("../payment"))
const Shipping = dynamic(() => import("../shipping"))

const Infomation = () => {
  const t = useT()
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isEdit, toggle: setEdit },
    setStep,
    cart,
  } = useCheckout()
  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }
  const shipingmethod = cart?.shipping_methods?.[0]?.shipping_option
  let shippingAmount = 0
  if (shipingmethod?.price_type === "calculated") {
    shippingAmount = getAmount(cart?.shipping_total)
  } else {
    shippingAmount = getAmount(shipingmethod?.amount)
  }
  return (
    <div className="divide-y border bg-white p-3 px-5">
      <div className="flex w-full items-baseline justify-between pb-3">
        <div className="flex flex-1 flex-col gap-x-6 md:flex-row">
          <span className="opacity-80">{t("Contact")}</span>
          <span>{cart.email}</span>
        </div>
        <div>
          <button
            className="text-sm"
            onClick={() => setStep(STEPS.INFORMATION)}
          >
            {t("Change")}
          </button>
        </div>
      </div>
      <div className="flex w-full items-baseline justify-between pb-3 pt-3">
        <div className="flex flex-1 flex-col gap-x-6 md:flex-row">
          <span className="opacity-80">{t("Ship to")}</span>
          <p className="flex-1 whitespace-pre-wrap ">
            {[
              cart.shipping_address.address_2,
              cart.shipping_address.address_1,
              cart.shipping_address?.city,
              cart.shipping_address?.postal_code,
              cart.shipping_address?.country?.name,
            ]
              .filter(Boolean)
              .filter((item) => item?.length)
              .join(" , ")
              .replace(", , ", "")}
          </p>
        </div>
        <div>
          <button
            className="text-sm"
            onClick={() => setStep(STEPS.INFORMATION)}
          >
            {t("Change")}
          </button>
        </div>
      </div>
      {shipingmethod && (
        <div className="flex w-full items-baseline justify-between pt-3">
          <div className="flex flex-1 flex-col gap-x-6 md:flex-row">
            <span className="opacity-80">{t("Method")}</span>
            <p className="flex-1 whitespace-pre-wrap ">
              {[shipingmethod.name, shippingAmount]
                .filter(Boolean)
                .filter((item) => item?.length)
                .join(" · ")}
            </p>
          </div>
          <div></div>
        </div>
      )}
    </div>
  )
}
const CheckoutForm = () => {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isEdit, toggle: setEdit },
    cart,
    step,
  } = useCheckout()

  const t = useT()
  if (!cart?.id) {
    return null
  }

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-y-8">
        {step === STEPS.INFORMATION && (
          <div>
            <Addresses />
            <GTagEventEnterPage type="checkout_begin" />
          </div>
        )}
        {step === STEPS.SHIPPING && (
          <div className="space-y-6">
            <Infomation />
            <div className="space-y-3">
              <div className="font-heading text-xl">{t("Shipping method")}</div>
              <Shipping cart={cart} />
              <GTagEventEnterPage type="checkout_shipping" />
            </div>
          </div>
        )}
        {step === STEPS.PAYMENT && (
          <div className="space-y-6">
            <Infomation />
            <div className="space-y-3">
              <div>
                <div className="font-heading text-xl">{t("Payment")}</div>
                <p>All transactions are secure and encrypted.</p>
              </div>

              <Payment />
              <GTagEventEnterPage type="checkout_payment" />
              <GTMAddShippingInfoEvent />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutForm
