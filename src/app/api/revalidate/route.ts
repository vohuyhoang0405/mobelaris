import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  revalidatePath("/[locale]", "page")
  return NextResponse.json({ path: "/[locale]", revalidated: true })
}
