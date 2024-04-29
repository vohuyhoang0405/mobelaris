"use client"
import { medusaClient } from "@lib/config"
import { trigleAddToCartEvent } from "@lib/gtm-events/add-to-cart"
import { trigleRemoveFromCartEvent } from "@lib/gtm-events/remove-from-cart"
import { handleError } from "@lib/util/handle-error"
import { Region, StoreCartsRes } from "@medusajs/medusa"
import { klaviyoAddedToCart } from "app/components/klaviyo/util"
import {
  formatVariantPrice,
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
} from "medusa-react"

import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { LangType, LocaleType } from "types/global"

interface VariantInfoProps {
  variantId: string
  quantity: number
}

interface LineInfoProps {
  lineId: string
  quantity: number
}

interface StoreContext {
  cart?: StoreCartsRes["cart"]
  locale: LocaleType
  langCode: LangType
  cartLoading: boolean
  countryCode: string | undefined
  region: Region
  setRegion: (region: Region, countryCode: string) => void
  addItem: (item: VariantInfoProps) => void
  updateItem: (item: LineInfoProps) => void
  deleteItem: (lineId: string) => void
  resetCart: () => void
  formatPrice: (price: any) => string
  cartCount: number
  pageProps: { [key: string]: any }
}

const StoreContext = React.createContext<StoreContext>({})

export const useStore = () => {
  const context = React.useContext(StoreContext)
  return context
}

interface StoreProps {
  children: React.ReactNode
  locale: LocaleType
  region: Region
  langCode: LangType
  ready?: boolean
  pageProps: { [key: string]: any }
}

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"

export const StoreProvider = ({
  children,
  locale,
  langCode,
  region: defaultRegion,
  pageProps,
  ready,
}: StoreProps) => {
  const { push } = useRouter() || {
    push: () => {},
  }
  const [region, setRegion] = useState(defaultRegion)
  const { cart, setCart, createCart, updateCart } = useCart()
  const addLineItem = useCreateLineItem(cart?.id!)
  const removeLineItem = useDeleteLineItem(cart?.id!)
  const adjustLineItem = useUpdateLineItem(cart?.id!)
  const countryCode = region?.countries[0].iso_2
  const cartId = cart?.id
  const getRegion = () => {
    return region
  }

  const storeCart = useCallback((id: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(CART_KEY, id)
    }
  }, [])

  const getCart = useCallback(() => {
    if (!IS_SERVER) {
      return localStorage.getItem(CART_KEY)
    }
    return null
  }, [])

  const deleteCart = useCallback(() => {
    if (!IS_SERVER) {
      localStorage.removeItem(CART_KEY)
    }
  }, [])
  useEffect(() => {
    if (cartId) {
      storeCart(cartId)
    }
  }, [cartId, storeCart])
  const createNewCart = async (regionId?: string) => {
    await createCart.mutateAsync(
      { region_id: regionId },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const resetCart = () => {
    deleteCart()

    const savedRegion = getRegion()

    createCart.mutate(
      {
        region_id: savedRegion?.regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }
  const isComplated = Boolean(cart?.completed_at)
  const isDeleted = Boolean(cart?.deleted_at)
  useEffect(() => {
    const ensureCart = async () => {
      const cartId = getCart()
      if (cartId) {
        const cartRes = await medusaClient.carts
          .retrieve(cartId)
          .then(({ cart }) => {
            return cart
          })
          .catch(async (_) => {
            return null
          })

        if (!cartRes || cartRes.completed_at || cartRes.deleted_at) {
          deleteCart()
          await createNewCart()
          return
        }

        setCart(cartRes)
      } else {
        await createNewCart(region?.regionId)
      }
    }

    if (!IS_SERVER && !cartId) {
      ensureCart()
    }
  }, [cartId])
  useEffect(() => {
    if (isComplated || isDeleted) {
      resetCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplated, isDeleted])
  useEffect(() => {
    const setRegion = async (regionId: string, countryCode?: string) => {
      await updateCart.mutateAsync(
        {
          region_id: regionId,
        },
        {
          onSuccess: ({ cart }) => {
            setCart(cart)
          },
          onError: (error) => {
            if (process.env.NODE_ENV === "development") {
              console.error(error)
            }
          },
        }
      )
    }
    if (cartId && cart?.region_id !== region.id) {
      setRegion(region.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId, region.id, cart?.region_id])
  const addItem = (
    {
      variantId,
      quantity,
    }: {
      variantId: string
      quantity: number
    },
    goToCart = false
  ) => {
    addLineItem.mutate(
      {
        variant_id: variantId,
        quantity: quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          trigleAddToCartEvent({
            variantId,
            quantity,
            cart,
          })
          klaviyoAddedToCart(cart, quantity, variantId)
          goToCart && push("/" + locale + "/checkout/cart")
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  const deleteItem = (lineId: string) => {
    let item = cart?.items.find((item) => item.id === lineId)
    console.log(lineId, item)
    let oldCart = cart
    removeLineItem.mutate(
      {
        lineId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          trigleRemoveFromCartEvent({
            variantId: item?.variant_id,
            diff: item?.quantity,
            cart: oldCart,
          })
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  const updateItem = ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    let oldCart = cart

    let item = cart?.items.find((item) => item.id === lineId)
    let diff = quantity - (item?.quantity || 0)
    adjustLineItem.mutate(
      {
        lineId,
        quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          if (diff > 0) {
            trigleAddToCartEvent({
              variantId: item?.variant_id,
              quantity: diff,
              cart,
            })
          }
          if (diff < 0) {
            trigleRemoveFromCartEvent({
              variantId: item?.variant_id,
              quantity: -diff,
              cart: oldCart,
            })
          }
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }
  const cartCount = useMemo(
    () =>
      cart?.items.reduce((result, item) => {
        result = result + item.quantity
        return result
      }, 0) || 0,
    [cart?.items]
  )

  const formatPrice = useCallback(
    ({ variant, ...rest }) => {
      return formatVariantPrice({
        variant,
        region: region,
        includeTaxes: false,
        ...rest,
      })
    },
    [region]
  )
  return (
    <StoreContext.Provider
      value={{
        countryCode,
        cart,
        locale,
        langCode: langCode,
        cartLoading: !cart?.id,
        setRegion,
        addItem,
        region,
        deleteItem,
        updateItem,
        resetCart,
        cartCount,
        formatPrice,
        pageProps,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
export const Store = ({
  children,
}: {
  children: ({ store }: { store: StoreContext }) => JSX.Element
}) => {
  const store = useStore()
  return children({ store })
}
