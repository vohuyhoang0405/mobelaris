import dynamic from "next/dynamic"

const AuthModal = dynamic(() => import("./auth-modal"), {
  loading: () => null,
  ssr: false,
})
export default AuthModal
