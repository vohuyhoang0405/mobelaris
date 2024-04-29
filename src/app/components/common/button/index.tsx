import clsx from "clsx"
import dynamic from "next/dynamic"
import React from "react"

const Spinner = dynamic(() => import("../../Icon/spinner"))

type ButtonProps = {
  isLoading?: boolean
  variant?: "primary" | "secondary"
  ghost?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  ghost,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "btn min-w-[120px]",
        {
          "btn-ghost": ghost,
          "btn-primary  text-white": variant === "primary",
          "btn-secondary": variant === "secondary",
        },
        className
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
