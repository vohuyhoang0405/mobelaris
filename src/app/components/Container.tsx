import clsx from "clsx"
import React from "react"
export type ContainerProps = {
  children?: React.ReactNode
  className?: string
  id?: string
  flush?: boolean
  render?: (className: string) => any
}

const Container: React.FC<ContainerProps> = ({
  children,
  flush,
  className,
  render,
  ...rest
}) => {
  if (render) {
    return render("max-w-[1264px] w-full px-4 sm:px-8 mx-auto gap-6")
  }
  return (
    <div
      className={clsx(
        " mx-auto w-full gap-6 px-4  sm:px-8",
        !flush ? "max-w-[1264px]" : "",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
export default Container
