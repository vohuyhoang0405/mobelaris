import dynamic from "next/dynamic"
import Image from "next/image"
import img from "./top-banner.png"

const Container = dynamic(() => import("../../components/Container"))

function page() {
  return (
    <Container>
      <Image src={img} alt="banner" />
    </Container>
  )
}

export default page
