import { medusaClient } from "@lib/config"
import { Cart } from "@medusajs/medusa"
import { useMutation } from "@tanstack/react-query"
import { useT } from "app/[locale]/context/sources"
import { useFormatPrice } from "app/[locale]/hooks/use-format-price"
import Trash from "app/components/Icon/trash"
import Button from "app/components/common/button"
import Input from "app/components/common/input"
import { formatAmount } from "app/helper/price"
import { useCart, useUpdateCart } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
const orderOverByCurrency = {
  eur: 100000,
  sek: 1300000,
  nok: 1300000,
  usd: 100000,
  gbp: 100000,
  chf: 100000,
}
type DiscountFormValues = {
  discount_code: string
}

type DiscountCodeProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}
const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const { id, discounts, region, discount_total } = cart
  const { mutate, isLoading } = useUpdateCart(id)
  const { setCart } = useCart()

  const { isLoading: mutationLoading, mutate: removeDiscount } = useMutation(
    (payload: { cartId: string; code: string }) => {
      return medusaClient.carts.deleteDiscount(payload.cartId, payload.code)
    }
  )
  const formatPrice = useFormatPrice()
  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined
    }
    switch (discounts[0].rule.type) {
      case "percentage":
        return `- ${discounts[0].rule.value}% (${discounts[0]?.code})`
      case "fixed":
        return `- ${formatAmount({
          amount: discounts[0].rule.value,
          region: region,
        })}`

      default:
        return "Free shipping"
    }
  }, [discounts, region])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields },
  } = useForm<DiscountFormValues>({
    mode: "onSubmit",
  })
  useEffect(() => {
    if (discounts.length && discount_total === 0) {
      removeDiscount(
        { cartId: id, code: discounts[0].code },
        {
          onSuccess: ({ cart }) => {
            setCart(cart)
          },
        }
      )
    }
  }, [])
  useEffect(() => {
    if (!discounts || !discounts.length) {
      return undefined
    }
    removeDiscount(
      { cartId: id, code: discounts[0].code },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
      }
    )
  }, [region.id])
  console.log({ errors })
  const onApply = (data: DiscountFormValues) => {
    if (
      data.discount_code.toUpperCase() === "NEWYEAR5" ||
      data.discount_code.toUpperCase() === "EASTER5"
    ) {
      const minimumOrder =
        orderOverByCurrency[region.currency_code.toLowerCase()]
      if (minimumOrder && cart.subtotal) {
        if (cart.subtotal < minimumOrder) {
          setError(
            "discount_code",
            {
              message:
                t("Only for orders over") + " " + formatPrice(minimumOrder),
            },
            {
              shouldFocus: true,
            }
          )
          return
        }
      }
    }
    mutate(
      {
        discounts: [{ code: data.discount_code }],
      },
      {
        onSuccess: ({ cart }) => {
          const { id, discounts, region, discount_total } = cart
          if (discounts.length && discount_total === 0) {
            setError(
              "discount_code",
              {
                message: t("Code is invalid"),
              },
              {
                shouldFocus: true,
              }
            )
            return removeDiscount(
              { cartId: id, code: discounts[0].code },
              {
                onSuccess: ({ cart }) => {
                  setCart(cart)
                },
              }
            )
          }
          setCart(cart)
        },
        onError: () => {
          setError(
            "discount_code",
            {
              message: t("Code is invalid"),
            },
            {
              shouldFocus: true,
            }
          )
        },
      }
    )
  }

  const onRemove = () => {
    removeDiscount(
      { cartId: id, code: discounts[0].code },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
      }
    )
  }
  const t = useT()
  return (
    <div className="e flex w-full flex-col">
      <div className="mb-4 hidden">
        <h3 className="text-base-semi">Discount</h3>
      </div>
      <div className="text-small-regular">
        {appliedDiscount ? (
          <div className="flex items-center justify-between">
            <div>
              <span>Code: </span>
              <span className="font-semibold">{appliedDiscount}</span>
            </div>
            <div>
              <button
                className="flex items-center gap-x-2"
                onClick={onRemove}
                disabled={isLoading}
              >
                <Trash size={16} />
                <span className="sr-only">Remove gift card from order</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onApply)} className="w-full">
            <div className="flex gap-x-2">
              <Input
                hideLabel
                label={t("Discount Code")}
                {...register("discount_code", {
                  required: "Code is required",
                })}
                touched={touchedFields}
                errors={errors}
              />
              <div className="flex-shrink-0">
                <Button
                  variant="primary"
                  className="h-[46px] !min-h-[0] w-[80px] text-lg"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  {t("Apply")}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
