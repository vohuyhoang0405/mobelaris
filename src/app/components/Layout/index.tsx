import { config } from "@shop/index"
import { ServerContextType } from "app/helper"
import dynamic from "next/dynamic"
import { ReactNode } from "react"

const Footer = dynamic(() => import("./Footer"))
const Header = dynamic(() => import("./Header"))

async function Layout({
  children,
  context,
}: {
  children: ReactNode
  context: ServerContextType
}) {
  return (
    <>
      <Header context={context} />
      <main>{children}</main>
      <Footer socials={config.socials} />
    </>
  )
}

export default Layout
