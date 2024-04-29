import { Disclosure } from "@headlessui/react"
import { useCheckout } from "app/[locale]/context/checkout-context"
import clsx from "clsx"

type StepContainerProps = {
  index: number
  title: string
  closedState?: React.ReactNode
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const StepContainer = ({
  index,
  title,
  className,
  closedState,
  children,
  ...props
}: StepContainerProps) => {
  const {
    editAddresses: { state },
  } = useCheckout()
  return (
    <div>
      <div
        className={clsx("bg-white", className, {
          "pointer-events-none select-none opacity-50": state,
        })}
        {...props}
      >
        <div className="font-heading text-xl">{title}</div>
        <Disclosure>
          <Disclosure.Panel
            static
            className={clsx(
              "overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out",
              {
                "max-h-[9999px] opacity-100": !state,
                "max-h-0 opacity-0": state,
              }
            )}
          >
            {children}
          </Disclosure.Panel>
          <Disclosure.Panel
            static
            className={clsx(
              "overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out",
              {
                "max-h-[9999px] opacity-100": state,
                "max-h-0 opacity-0": !state,
              }
            )}
          >
            {closedState}
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  )
}

export default StepContainer
