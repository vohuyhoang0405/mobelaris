import dynamic from "next/dynamic"
import { draftMode } from "next/headers"

const Adminbar = dynamic(() => import("./_components/adminbar"))

const Page = () => {
  if (draftMode().isEnabled) return <Adminbar />
  return null
}

export default Page
