import { i18n, localsMap } from "@shop/i18n"
import { NextRequest, NextResponse } from "next/server"

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  return i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const search = request.nextUrl.search
  const pathnameIsMissingLocale = localsMap.every(
    ({ locale }) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}${search}`, request.url)
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // '/((?!(?:_next|_next_tina|feed|admin|api|sitemap|favicon|images|robots\.txt)).*)',
    // Optional: only run on root (/) URL
    // '/',

    "/((?!api|_next/static|_next/image|favicon.ico|_next_tina|_next_assets|feed|admin|sitemap|favicon|images|robots.txt).*)",
  ],
}
