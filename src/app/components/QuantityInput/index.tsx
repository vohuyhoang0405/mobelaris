"use client"
import useDebounce from "app/[locale]/hooks/use-debounce"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

const QuantityInput = ({
  value,
  onChange,
}: {
  value: number
  onChange: (n: number) => void
}) => {
  const inputRef = useRef<HTMLButtonElement>()
  const [quantity, setQuantity] = useState(value)
  const quanityDebounced = useDebounce(quantity, 300)
  const [loading, setLoading] = useState<Boolean>()
  useEffect(() => {
    if (value !== quanityDebounced) {
      setLoading(true)
      onChange(quanityDebounced)
    } else {
      setLoading(false)
    }
  }, [onChange, quanityDebounced, value])

  return (
    <div
      className={clsx(
        "grid h-full w-full grid-cols-5 grid-rows-2 border ring-gray-300 focus-within:border-[2px]",
        {
          "pointer-events-none opacity-60": loading,
        }
      )}
    >
      <button
        tabIndex={0}
        disabled={loading}
        onClick={() => {
          setQuantity(Math.max(1, Number(inputRef.current.value) - 1))
        }}
        className="col-span-2 col-start-4 row-span-1 row-start-2 flex cursor-pointer items-start justify-center bg-gray-100 hover:border hover:shadow"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" />
        </svg>
      </button>
      <input
        disabled={loading}
        ref={inputRef}
        min={1}
        type="text"
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="cart_qty col-span-3 col-start-1 row-span-2 row-start-1 mb-0 h-full w-full max-w-[unset] border-r border-none text-center focus:outline-none"
        value={quantity}
      />
      <button
        disabled={loading}
        tabIndex={0}
        onClick={() => {
          setQuantity(Math.max(1, Number(inputRef.current.value) + 1))
        }}
        className="col-span-2 col-start-4 row-span-1 row-start-1 flex cursor-pointer items-end justify-center bg-gray-100 hover:border hover:shadow"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z" />
        </svg>
      </button>
    </div>
  )
}
export default QuantityInput
