import Alert from "app/components/Icon/alert"

const PaymentTest = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-x-2 bg-yellow-100 p-2">
        <Alert size={16} className="text-yellow-700" />
        <span className="text-small-regular text-yellow-700">
          <span className="font-semibold">Attention:</span> For testing purposes
          only.
        </span>
      </div>
    </div>
  )
}

export default PaymentTest
