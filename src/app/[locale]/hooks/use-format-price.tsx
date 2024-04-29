import { useStore } from "app/[locale]/context/store-context"
import { formatAmount } from "app/helper/price"
const noFractionDigits = ["sek", "nok"]
export const useFormatPrice = () => {
  const { region } = useStore()
  if (noFractionDigits.includes(region.currency_code.toLowerCase())) {
    return (amount: number) =>
      formatAmount({
        amount: amount,
        region: region,
        includeTaxes: false,
        minimumFractionDigits: 0,
      })
  }
  return (amount: number) =>
    formatAmount({
      amount: amount,
      region: region,
      includeTaxes: false,
    })
}
