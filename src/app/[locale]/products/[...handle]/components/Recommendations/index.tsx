import dynamic from "next/dynamic"

const Recommendations = dynamic(() => import("./Recommendations"), {
  loading: () => null,
  ssr: false,
})
export default function RecommendationsLazy(props) {
  return (
    <div className="min-h-6 w-full">
      <Recommendations {...props} />
    </div>
  )
}
