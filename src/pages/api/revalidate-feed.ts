import { medusaServerClient } from "@lib/config.server"
import { NextRequest, NextResponse } from "next/server"

export default async function handler(req: NextRequest, res: NextResponse) {
  // Check for secret to confirm this is a valid request

  if (req.query.secret !== "hello") {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const { regions } = await medusaServerClient.regions.list()
    let urls = regions.map((reg) => `/feed/${reg.id}`)
    await Promise.all(urls.map(async (url) => res.revalidate(url)))
    return res.json({ urls, revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating")
  }
}
