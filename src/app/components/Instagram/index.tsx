import dynamic from "next/dynamic"
import { InView } from "react-intersection-observer"

const DynamicInstagram = dynamic(() => import("./Instagram"), {
  loading: () => null,
})

export default function Instagram(props: any) {
  return (
    <InView allowFullScreen allowTransparency>
      {({ entry, inView, ref }) => {
        return (
          <div ref={ref} className="min-h-6">
            {inView && <DynamicInstagram {...props} />}
          </div>
        )
      }}
    </InView>
  )
}
