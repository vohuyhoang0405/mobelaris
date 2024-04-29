import { CountryType } from "types/global"

const ReactCountryFlag = ({
  countryCode,
  ...rest
}: {
  countryCode: CountryType
}) => {
  return (
    <img
      loading="lazy"
      src={`/images/flags/${countryCode}.svg`}
      alt={countryCode}
      {...rest}
    />
  )
}

export default ReactCountryFlag
