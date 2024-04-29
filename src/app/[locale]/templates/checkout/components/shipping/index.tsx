import { RadioGroup } from "@headlessui/react"
import { ErrorMessage } from "@hookform/error-message"
import { Cart } from "@medusajs/medusa"
import { STEPS, useCheckout } from "app/[locale]/context/checkout-context"
import { useT } from "app/[locale]/context/sources"
import Spinner from "app/components/Icon/spinner"
import Button from "app/components/common/button"
import Radio from "app/components/common/radio"
import clsx from "clsx"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"

type ShippingOption = {
  value: string
  label: string
  price: string
}

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

type ShippingFormProps = {
  soId: string
}
const ShippingForm: React.FC<ShippingProps> = ({
  cart,
  soId,
  shippingMethods,
}) => {
  const { setStep } = useCheckout()
  const { addShippingMethod, setCart } = useCart()
  const {
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId,
    },
  })

  const submitShippingOption = (soId: string) => {
    addShippingMethod.mutate(
      { option_id: soId },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          setStep(STEPS.PAYMENT)
        },
        onError: () =>
          setError("soId", {
            type: "validate",
            message:
              "An error occurred while adding shipping. Please try again.",
          }),
      }
    )
  }

  const handleChange = (value: string) => {
    addShippingMethod.mutate(
      { option_id: value },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
        onError: () =>
          setError("soId", {
            type: "validate",
            message:
              "An error occurred while adding shipping. Please try again.",
          }),
      }
    )
  }

  const t = useT()
  return (
    <Controller
      name="soId"
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <div>
            <div className="border bg-white p-3 px-5 ">
              <RadioGroup
                value={value}
                onChange={(value: string) => {
                  onChange(value)
                  handleChange(value)
                }}
              >
                {shippingMethods && shippingMethods.length ? (
                  shippingMethods.map((option) => {
                    return (
                      <RadioGroup.Option
                        about=""
                        key={option.value}
                        value={option.value}
                        className={clsx("flex justify-between gap-6 py-3")}
                      >
                        <div className="flex items-center gap-x-4">
                          <Radio checked={value === option.value} />
                          <span className="text-base-regular">
                            {t(option.label)}
                          </span>
                        </div>
                        <span className="justify-self-end text-gray-700">
                          {option.price}
                        </span>
                      </RadioGroup.Option>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900">
                    <Spinner />
                  </div>
                )}
              </RadioGroup>
            </div>

            <ErrorMessage
              errors={errors}
              name="soId"
              render={({ message }) => {
                return (
                  <div className="text-small-regular pt-2 text-rose-500">
                    <span>{message}</span>
                  </div>
                )
              }}
            />
            <div className="mt-6 flex justify-between gap-6">
              <button
                className="flex max-w-[200px] items-center gap-2"
                onClick={() => setStep(STEPS.INFORMATION)}
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
                {t("Return to infomation")}
              </button>
              <Button
                onClick={() => {
                  submitShippingOption(value)
                }}
                className="btn-lg max-w-[200px]"
              >
                {t("Continue to payment")}
              </Button>
            </div>
          </div>
        )
      }}
    />
  )
}
const Shipping: React.FC<ShippingProps> = ({ cart }) => {
  const t = useT()
  const {
    sameAsBilling: { state: sameBilling },
    editAddresses: { state: isEdit, toggle: setEdit },
  } = useCheckout()
  const { addShippingMethod, setCart } = useCart()
  let soId = cart.shipping_methods?.[0]?.shipping_option_id
  const { shipping_options, refetch } = useCartShippingOptions(cart?.id!, {
    enabled: !!cart?.id,
  })
  const shippingMethods = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          includeTaxes: false,
          amount: option.amount || 0,
          region: cart.region,
        }),
      }))
    }

    return []
  }, [shipping_options, cart])
  useEffect(() => {
    const refetchShipping = async () => {
      await refetch()
    }

    refetchShipping()
  }, [cart?.region_id, refetch])
  useEffect(() => {
    if (!soId && shippingMethods?.[0]?.value) {
      addShippingMethod.mutate(
        { option_id: shippingMethods?.[0]?.value },
        {
          onSuccess: ({ cart }) => {
            setCart(cart)
          },
          onError: console.error,
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingMethods?.[0]?.value, soId])
  return soId ? (
    <ShippingForm
      cart={cart}
      key={String(soId)}
      soId={soId}
      shippingMethods={shippingMethods}
    />
  ) : null
}

export default Shipping
