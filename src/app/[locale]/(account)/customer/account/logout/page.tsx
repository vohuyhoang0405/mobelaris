"use client"

import { useAccount } from "app/[locale]/context/account-context"
import Spinner from "app/components/Icon/spinner"
import { useEffect } from "react"

function Page() {
  const {
    loginView,
    customer,
    handleLogout,
    checkSession,
    retrievingCustomer,
  } = useAccount()
  useEffect(() => {
    handleLogout && handleLogout()
  }, [])

  return (
    <div className="flex w-full justify-center p-12">
      <Spinner size={64} />
    </div>
  )
}

export default Page
