import { T } from "app/[locale]/context/sources"

export const ExpandableText = ({ content }: { content: string }) => {
  return (
    <div className="mx-auto w-full max-w-[1264px] px-4 sm:px-8">
      <div className="rte">
        <div className="relative pb-6 ">
          <input
            hidden
            className="peer !hidden"
            id="template--16666519830755__1655715231316a816c"
            type="checkbox"
            hidden
          />
          <div className=" group h-[10.5rem] max-h-[10.5rem] overflow-hidden bg-base-100 transition-all duration-[2s] ease-in-out peer-checked:h-auto peer-checked:max-h-[3000px] lg:!bg-transparent">
            <div className="prose max-w-page">
              <T ishtml>{content}</T>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-white peer-checked:from-transparent" />
          <label
            htmlFor="template--16666519830755__1655715231316a816c"
            className="absolute  bottom-0 right-0 !m-0 transform rounded-tl-[20px] border-none bg-transparent bg-gradient-to-br from-transparent via-white to-white p-3 !text-3xl text-black shadow-2xl shadow-white transition-all duration-1000 peer-checked:rotate-180 "
          >
            <svg
              className="collapse-toggle-icon"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  )
}
