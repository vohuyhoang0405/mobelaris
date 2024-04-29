import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import Input from "app/components/common/input"
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
    const { setRegion, locale } = useStore()
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
    if (locale === "uk" || locale === "en-dk") {
      return (
        <>
          <Input
            hideLabel
            label={t("Country")}
            name={"country_text"}
            defaultValue={"Denmark"}
          />
          <div className="hidden">
            <NativeSelect
              key={countryOptions?.length}
              ref={innerRef}
              placeholder={t(placeholder)}
              onChange={(e) => {}}
              {...props}
            >
              {countryOptions.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </NativeSelect>
          </div>
        </>
      )
    }
    if (locale === "en") {
      let options = countryOptions.filter((country) => country.value === "gb")
      return (
        <NativeSelect
          key={countryOptions?.length}
          ref={innerRef}
          placeholder={t(placeholder)}
          onChange={(e) => {
            onChange && onChange(e)
            const option = options.find((o) => o.value === e.target.value)
            option?.region && setRegion(option.region)
          }}
          {...props}
        >
          {options.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </NativeSelect>
      )
    }
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
