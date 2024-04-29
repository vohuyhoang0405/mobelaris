import { useCheckout } from "app/[locale]/context/checkout-context"
import { useT } from "app/[locale]/context/sources"
import Link from "app/components/Link"
import Button from "app/components/common/button"
import dynamic from "next/dynamic"

const ShippingAddress = dynamic(() => import("../shipping-address"))

const Addresses = () => {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isEdit, toggle: setEdit },
    setAddresses,
    handleSubmit,
    cart,
  } = useCheckout()
  const t = useT()
  return (
    <div className="bg-white">
      <div className="md: pb-8 md:px-8">
        <ShippingAddress />
        <div className="mt-6 flex justify-between gap-6">
          <Link
            href={"/cart"}
            className="flex max-w-[200px] items-center gap-2"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              height="1.4em"
              className="inline leading-none"
              width="1.4em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
            </svg>
            {t("Return to cart")}
          </Link>
          <Button
            className="btn-lg max-w-[200px]"
            variant="primary"
            onClick={handleSubmit(setAddresses)}
          >
            {t("Continue to delivery")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Addresses
