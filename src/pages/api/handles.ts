import { medusaServerClient } from "@lib/config.server"
import type { NextApiRequest, NextApiResponse } from "next"

import { addSlugs } from "@lib/supbase"
import { Json } from "@lib/supbase/supabase"

type ResponseData = {
  data?: any
  error?: string | null
}
export default async function transhandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Check for secret to confirm this is a valid request
  try {
    let handles: {
      [key: string]: {
        slug: string
        data: Json
      }
    } = {}
    let feed: {
      [key: string]: {
        url: string
        data: Json
      }
    } = {}
    await medusaServerClient.collections
      .list({ limit: 9999 })
      .then(({ collections }) => {
        return collections.forEach(({ handle }) => {
          handles[handle] = {
            slug: handle,
            data: {
              type: "collection",
              handle: handle,
            },
          }
        })
      })
    await medusaServerClient.products
      .list({ limit: 9999 })
      .then(({ products }) => {
        return products.forEach(({ handle, id, variants }) => {
          if (handle) {
            handles[handle] = {
              slug: handle,
              data: {
                type: "product",
                handle: handle,
                id: id,
              },
            }
          }
          variants.forEach(({ id: variantId, metadata }) => {
            if (metadata?.handle) {
              handles[metadata?.handle] = {
                slug: metadata?.handle,
                data: {
                  type: "variant",
                  product: id,
                  productHandle: handle,
                  handle: metadata?.handle,
                  variantId,
                },
              }
            }
          })
        })
      })
    const { data, error } = await addSlugs(Object.values(handles))
    res.status(200).json({ data, error: null })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ error: err.message })
  }
}
