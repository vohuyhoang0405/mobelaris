import dynamic from "next/dynamic"
import { Suspense } from "react"

const Recommendations = dynamic(() => import("./Recommendations"), {
  loading: () => null,
  ssr: false,
})
export default function RecommendationsSection(props) {
  return (
    <Suspense>
      <Recommendations {...props} />
    </Suspense>
  )
}
