import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.formData()
  const value = formData.get("value")
  if (value) {
    cookies().set("theToken", "" + value, { secure: true })
    return NextResponse.redirect(
      new URL("/admin/dashboard/tool", request.url),
      {
        status: 301,
      }
    )
  }
  return NextResponse.json({ value })
}
