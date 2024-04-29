import { Dialog, Transition } from "@headlessui/react"
import X from "app/components/Icon/x"
import clsx from "clsx"
import React, {
  Fragment,
  PropsWithChildren,
  createContext,
  useContext,
} from "react"

interface ModalContext {
  close: () => void
}

const ModalContext = createContext<ModalContext | null>(null)

interface ModalProviderProps {
  children?: React.ReactNode
  close: () => void
}

export const ModalProvider = ({ children, close }: ModalProviderProps) => {
  return (
    <ModalContext.Provider
      value={{
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === null) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

type ModalProps = {
  isOpen: boolean
  close: () => void
  size?: "small" | "medium" | "large"
}

const Modal: React.FC<
  ModalProps & {
    children: React.ReactNode
  }
> & {
  Title: React.FC
  Description: React.FC
  Body: React.FC
  Footer: React.FC
} = ({ isOpen, close, size = "medium", children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="modal modal-open" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel
            className={clsx(" modal-box w-full transition-all", {
              "max-w-md": size === "small",
              "max-w-xl": size === "medium",
              "max-w-3xl": size === "large",
            })}
          >
            <ModalProvider close={close}>{children}</ModalProvider>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

const Title: React.FC = ({ children }) => {
  const { close } = useModal()

  return (
    <Dialog.Title className="flex items-center justify-between">
      <h3 className="text-lg font-bold">{children}</h3>
      <div className="w-12">
        <button
          className="btn btn-square btn-ghost absolute right-2 top-2"
          onClick={close}
        >
          <X size={20} />
        </button>
      </div>
    </Dialog.Title>
  )
}

const Description: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Dialog.Description className="text-small-regular flex h-full items-center justify-center pb-4 pt-2 text-gray-700">
      {children}
    </Dialog.Description>
  )
}

const Body: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="h-full">{children}</div>
}

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="modal-action">{children}</div>
}

Modal.Title = Title
Modal.Description = Description
Modal.Body = Body
Modal.Footer = Footer

export default Modal
