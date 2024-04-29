import { SourcesProvider } from "app/[locale]/context/sources"
import dynamic from "next/dynamic"

const HeaderSearchLazy = dynamic(() => import("./HeaderSearch"), {
  loading: () => null,
  ssr: true,
})
const HeaderSearchWrap = () => {
  return (
    <div className="group block w-full" id="HeaderSearchWrap">
      <SourcesProvider name="header_search" value={{}}>
        <HeaderSearchLazy />
      </SourcesProvider>
    </div>
  )
}

export default HeaderSearchWrap
