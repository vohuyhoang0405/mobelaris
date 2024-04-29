"use client"
import {
  CheckoutProvider,
  STEPS,
  useCheckout,
} from "app/[locale]/context/checkout-context"
import { useT } from "app/[locale]/context/sources"
import { Breadcrumb } from "app/components/Breadcrumb"
import Container from "app/components/Container"
import Link from "app/components/Link"
import Logo from "app/components/Logo"
import { formatAmount } from "medusa-react"
import dynamic from "next/dynamic"

const CheckoutForm = dynamic(() => import("./components/checkout-form"))
const CheckoutLoader = dynamic(() => import("./components/checkout-loader"))
const CheckoutSummary = dynamic(() => import("./components/checkout-summary"))

const CheckoutInner = () => {
  const t = useT()
  const { cart, step, setStep } = useCheckout()

  if (!cart?.id) {
    return null
  }
  const { total } = cart

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }
  return (
    <div className="w-full overflow-hidden">
      <div className="relative mx-auto min-h-screen w-full max-w-7xl small:min-h-screen">
        <div className="first_logo flex justify-center py-6 text-center md:hidden">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <CheckoutLoader />
        <div className="flex min-h-screen w-full flex-col-reverse items-start md:flex-row ">
          <Container className="flex-1 ">
            <div className="content-container mx-auto grid max-w-3xl flex-1 grid-cols-1 gap-x-8 py-6 md:gap-y-8 md:py-12">
              <div
                className="flex flex-col items-center justify-center text-center"
                id="logo"
              >
                <div className="first_logo hidden text-center md:block">
                  <Link href="/">
                    <Logo />
                  </Link>
                </div>
                <Breadcrumb
                  onClick={(item) => setStep(item.id)}
                  items={[
                    {
                      url: `/cart`,
                      title: t("Cart"),
                    },
                    {
                      title: t("Information"),
                      active: step === STEPS.INFORMATION,
                      id: STEPS.INFORMATION,
                    },
                    {
                      title: t("Shipping"),
                      active: step === STEPS.SHIPPING,
                      id: STEPS.SHIPPING,
                    },
                    {
                      title: t("Payment"),
                      active: step === STEPS.PAYMENT,
                      id: STEPS.PAYMENT,
                    },
                  ]}
                />
              </div>
              <CheckoutForm />
            </div>
          </Container>
          <div className="relative hidden h-full min-h-screen border-l md:block">
            <div className="absolute left-0 top-0 h-full w-screen "></div>
          </div>
          <Container className="relative w-full border-y  bg-gray-100 md:min-h-screen md:w-1/3 md:!max-w-md md:py-12 ">
            <div className="absolute left-0 top-0 -z-10 hidden h-full w-screen bg-gray-100 md:block"></div>
            <input
              id="opensumary"
              name="opensumary"
              type="checkbox"
              hidden
              className="peer hidden"
            />
            <label
              htmlFor="opensumary"
              className="flex border-b py-5 peer-checked:hidden md:hidden"
            >
              <div className="flex flex-1 items-center gap-2">
                <svg
                  className="text-lg"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={9} cy={21} r={1} />
                  <circle cx={20} cy={21} r={1} />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {t("Show order summary")}
                <svg
                  className="text-lg"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
              <div className="text-xl font-bold">{getAmount(total)}</div>
            </label>
            <label
              htmlFor="opensumary"
              className="hidden border-b py-5 peer-checked:flex md:!hidden"
            >
              <div className="flex flex-1 items-center gap-2">
                <svg
                  className="text-lg"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={9} cy={21} r={1} />
                  <circle cx={20} cy={21} r={1} />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {t("Hide order summary")}
                <svg
                  className="rotate-180 transform text-lg"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
              <div className="text-lg font-bold">{getAmount(total)}</div>
            </label>
            <div className="hidden py-6 peer-checked:!block md:block md:min-h-screen ">
              <CheckoutSummary />
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <CheckoutInner />
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
