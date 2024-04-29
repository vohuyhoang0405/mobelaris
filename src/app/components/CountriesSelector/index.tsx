import dynamic from "next/dynamic"

const Spinner = dynamic(() => import("../Icon/spinner"))

const CountriesSelectorLazy = dynamic(() => import("./CountriesSelector"), {
  loading: () => (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  ),
  ssr: true,
})
const CountriesSelectorWrap = () => {
  return <CountriesSelectorLazy />
}

export default CountriesSelectorWrap
