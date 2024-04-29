"use client"
import { LOGIN_VIEW, useAccount } from "app/[locale]/context/account-context"
import { useT } from "app/[locale]/context/sources"
import dynamic from "next/dynamic"
import { useState } from "react"

const Forgotpassword = dynamic(() => import("./forgot-password"))
const Login = dynamic(() => import("./login"))
const Register = dynamic(() => import("./register"))

const AuthModal = ({
  redirectUrl,
  id = "auth-modal",
}: {
  redirectUrl?: string | false | null
  id?: string
}) => {
  const { loginView, customer } = useAccount()
  const [show, setShow] = useState(false)
  const [currentView, setCurrentView] = loginView
  const t = useT()
  if (customer) return null
  return (
    <div>
      <input
        type="checkbox"
        hidden
        onChange={(e) => {
          if (e.target.checked) {
            setShow(true)
            setCurrentView(LOGIN_VIEW.SIGN_IN)
          }
        }}
        id={id}
        className="peer modal-toggle"
      />
      {show && (
        <div className="modal  animatecss animatecss-fadeIn ">
          <div className="modal-box">
            <div className="w-full bg-white">
              <div className="relative w-full border-2 border-black px-12">
                {currentView === "sign-in" && (
                  <Login redirectUrl={redirectUrl} />
                )}
                {currentView === "register" && (
                  <Register redirectUrl={redirectUrl} />
                )}
                {currentView === "forgot-password" && <Forgotpassword />}
                <label
                  aria-label={t("close")}
                  title={t("close")}
                  htmlFor="auth-modal"
                  className="btn btn-circle btn-sm absolute right-3 top-3"
                >
                  <svg
                    aria-label={t("close")}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthModal
