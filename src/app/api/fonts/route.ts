import { NextResponse } from "next/server"
import allFonts from "styles/fonts"

export async function GET() {
  return await NextResponse.json({ data: allFonts })
}

export const revalidate = 86400
