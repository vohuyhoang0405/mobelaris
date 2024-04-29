import { medusaServerClient } from "@lib/config.server"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { regid: string } }
) {
  // Check for secret to confirm this is a valid request
  const { regions } = await medusaServerClient.regions.list()
  let urls = regions.map((reg) => `/feed/${reg.id}`)
  urls.map(async (url) => revalidatePath(url))
  return NextResponse.json({ urls, revalidated: true, now: Date.now() })
}

export const revalidate = 0
