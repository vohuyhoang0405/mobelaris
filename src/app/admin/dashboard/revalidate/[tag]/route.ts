import { locales } from "@shop/i18n"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { tag: string } }
) {
  let urls: string[] = []
  if (params.tag === "home") {
    locales.map((locale) => {
      return `/${locale}/${params.tag}`
    })
    urls.forEach((locale) => {
      let url = `/${locale}`
      revalidatePath(url)
    })
  }
  return NextResponse.json({ urls, revalidated: true, now: Date.now() })
}

export const revalidate = 0
