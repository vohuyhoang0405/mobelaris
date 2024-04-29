// route handler with secret and slug
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  // const secret = searchParams.get('secret')
  const path = searchParams.get("path") as string | null

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (
    // secret !== 'showmethemoney' ||
    !path
  ) {
    return new Response("Invalid token", { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(path)
}
