"use client"

import { useAccount } from "app/[locale]/context/account-context"
import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import Forgotpassword from "app/components/auth-modal/forgot-password"
import Login from "app/components/auth-modal/login"
import Register from "app/components/auth-modal/register"
import { GTagEventEnterPage } from "app/components/googleTag"

function Page() {
  const { locale } = useStore()
  const { loginView, customer } = useAccount()
  const [currentView, setCurrentView] = loginView
  const t = useT()
  const redirectUrl = "/" + locale + "/customer/account"
  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-full justify-center px-12">
        {currentView === "sign-in" && <Login redirectUrl={redirectUrl} />}
        {currentView === "register" && <Register redirectUrl={redirectUrl} />}
        {currentView === "forgot-password" && <Forgotpassword />}
      </div>
      <GTagEventEnterPage type="account" />
    </div>
  )
}

export default Page
