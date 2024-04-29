"use client"
import { ErrorMessage } from "@hookform/error-message"

import clsx from "clsx"

import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import { get } from "react-hook-form"
import Eye from "../../Icon/eye"
import EyeOff from "../../Icon/eye-off"

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  hideLabel?: boolean
  icon?: ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      icon,
      label,
      errors,
      touched,
      required,
      hideLabel,
      topRightLabel,
      bottomLeftLabel,
      bottomRightLabel,
      children,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const hasError = get(errors, name) && get(touched, name)
    return (
      <div className="group form-control w-full">
        <label className="input-group-sm relative">
          {children ? (
            children({
              type: inputType,
              required,
              name: name,
              className: clsx(
                "peer input-bordered input w-full border px-2 pb-[0.35em] pt-[1em]  leading-none  placeholder:text-transparent",
                {
                  "border-rose-500 focus:border-rose-500": hasError,
                }
              ),
              placeholder: label,
              ref: inputRef,
              ...props,
            })
          ) : (
            <input
              required={required}
              type={inputType}
              name={name}
              className={clsx(
                "peer input input-bordered w-full border px-2 pb-[0.35em] pt-[1em]  leading-none  placeholder:text-transparent",
                {
                  "border-rose-500 focus:border-rose-500": hasError,
                }
              )}
              placeholder={label}
              {...props}
              ref={inputRef}
            />
          )}
          <div
            onClick={() => inputRef.current?.focus()}
            className={clsx(
              " pointer-events-none absolute left-0 top-0 z-10 flex h-6 w-full items-center  px-2 py-0  text-xs transition-all peer-placeholder-shown:!h-[3em] peer-placeholder-shown:text-base peer-focus:!h-6 peer-focus:!text-xs",
              {
                "!text-rose-500": hasError,
              }
            )}
          >
            <span className="flex gap-2 opacity-60">
              {icon && <span className="flex items-center ">{icon}</span>}
              {label}
              {required && <span className="text-rose-500">*</span>}
            </span>
            {topRightLabel && (
              <span className="label-text-alt">{topRightLabel}</span>
            )}
          </div>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 px-4 text-gray-400 outline-none transition-all duration-150 focus:text-gray-700 focus:outline-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </label>
        <label className="label hidden">
          <span className="label-text-alt">{bottomLeftLabel || null}</span>
          <span className="label-text-alt">{bottomRightLabel || null}</span>
        </label>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="text-xsmall-regular pl-2 pt-1 text-rose-500">
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
