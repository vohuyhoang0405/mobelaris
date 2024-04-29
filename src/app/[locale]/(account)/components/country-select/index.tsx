"use client"
import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import NativeSelect, {
  NativeSelectProps,
} from "app/components/common/native-select"
import { useRegions } from "medusa-react"

import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"

const CountrySelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = "Country", onChange, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    const { regions } = useRegions()
    const { setRegion } = useStore()
    const t = useT()
    const countryOptions =
      useMemo(() => {
        return regions?.flatMap((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
            region,
          }))
        })
      }, [regions]) || []
    return (
      <NativeSelect
        key={countryOptions?.length}
        ref={innerRef}
        placeholder={t(placeholder)}
        onChange={(e) => {
          onChange && onChange(e)
          const option = countryOptions.find((o) => o.value === e.target.value)
          option?.region && setRegion(option.region)
        }}
        {...props}
      >
        {countryOptions.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
    )
  }
)

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
