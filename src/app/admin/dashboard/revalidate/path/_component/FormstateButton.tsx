"use client"

import { useFormStatus } from "react-dom"

function SubmitButton({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()
  if (pending) {
    return (
      <button
        {...props}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <span className="loading loading-ball loading-md animatecss-fadeIn"></span>
      </button>
    )
  }
  return (
    <button type="submit" aria-disabled={pending} {...props}>
      {children}
    </button>
  )
}
export default SubmitButton
