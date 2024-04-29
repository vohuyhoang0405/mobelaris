"use client"
import { useFormatPrice } from "../[locale]/hooks/use-format-price"

const FormatPrice = ({ amount }: { amount: number }) => {
  const format = useFormatPrice()
  return <>{format(amount)}</>
}

export default FormatPrice
