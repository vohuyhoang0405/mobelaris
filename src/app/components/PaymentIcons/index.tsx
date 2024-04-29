import Image from "next/image"
import img from "./images/payment-icons_3.png"
function PaymentIcons() {
  return <Image src={img} alt="payment icons" width={300} unoptimized />
}

export default PaymentIcons
