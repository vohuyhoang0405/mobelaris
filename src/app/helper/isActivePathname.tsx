function isActivePathname({
  pathname,
  href,
  locale,
}: {
  pathname: string
  href: string
  locale: string
}) {
  return pathname === href || pathname === `/${locale}${href}`
}

export default isActivePathname
