"use client"
import useToggleState from "@lib/hooks/use-toggle-state"
import dynamic from "next/dynamic"

const Container = dynamic(() => import("../Container"))
const Spinner = dynamic(() => import("../Icon/spinner"))

const DynamicMiniCartContent = dynamic(() => import("./MinicartInner"), {
  loading: () => (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  ),
  ssr: false,
})
function Minicart() {
  const { state, open } = useToggleState()
  return (
    <div>
      <input
        hidden
        type="checkbox"
        onChange={(e) => e.target.value && open()}
        id="minicart"
        className="modal-toggle hidden"
      />
      {state && (
        <label
          htmlFor="minicart"
          className="modal fixed  items-start pt-[74px]"
        >
          <Container className="flex justify-end ">
            <label className="modal-box w-4/5 !max-w-sm ">
              <DynamicMiniCartContent />
              <div className="absolute right-2 top-2">
                <label
                  htmlFor="minicart"
                  className="btn btn-square btn-primary btn-xs !text-white"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth={2}
                      d="M3,3 L21,21 M3,21 L21,3"
                    />
                  </svg>
                </label>
              </div>
            </label>
          </Container>
        </label>
      )}
    </div>
  )
}

export default Minicart
