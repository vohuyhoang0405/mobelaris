"use client"
import { useStore } from "app/[locale]/context/store-context"
import type { Route } from "next"
import NextLink, { LinkProps } from "next/link"
function Link({
  href,
  ...rest
}: Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps & {
    href: Route | URL
  }
> &
  LinkProps & {
    children?: React.ReactNode
  } & React.RefAttributes<HTMLAnchorElement>) {
  const { locale } = useStore()
  return <NextLink href={`/${locale}${href}`} {...rest} />
}

export default Link
