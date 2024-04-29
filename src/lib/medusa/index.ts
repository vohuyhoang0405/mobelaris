import { isObject } from "lodash-es"
import { Product } from "./types"

const ENDPOINT =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000"
const MEDUSA_API_KEY = process.env.MEDUSA_API_KEY ?? ""
const REVALIDATE_WINDOW = parseInt(
  process.env.REVALIDATE_WINDOW ?? `${60 * 15}`
) // 15 minutes
export interface MedusaErrorLike {
  status: number
  message: Error
}
function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === "[object Error]") {
    return true
  }

  const prototype = Object.getPrototypeOf(error) as T | null

  return prototype === null ? false : findError(prototype)
}
export const isMedusaError = (error: unknown): error is MedusaErrorLike => {
  if (!isObject(error)) return false

  if (error instanceof Error) return true

  return findError(error)
}
export default async function medusaRequest(
  method: string,
  path = "",
  payload?: Record<string, unknown> | undefined
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-key": MEDUSA_API_KEY,
    },
  }

  if (!path.includes("/carts")) {
    options.next = { revalidate: REVALIDATE_WINDOW }
  }

  if (payload) {
    options.body = JSON.stringify(payload)
  }

  try {
    const result = await fetch(`${ENDPOINT}/store${path}`, options)

    const body = await result.json()

    if (body.errors) {
      throw body.errors[0]
    }

    return {
      status: result.status,
      body,
    }
  } catch (e) {
    if (isMedusaError(e)) {
      throw {
        status: e.status || 500,
        message: e.message,
      }
    }

    throw {
      error: e,
    }
  }
}

export async function getProduct(handle: string): Promise<Product> {
  const res = await medusaRequest("GET", `/products?handle=${handle}&limit=1`)
  const product = res.body.products[0]
  return product
}
