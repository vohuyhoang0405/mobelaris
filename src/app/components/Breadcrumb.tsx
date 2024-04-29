import clsx from "clsx"
import dynamic from "next/dynamic"
import { Fragment } from "react"

const Link = dynamic(() => import("./Link"))

export const Breadcrumb = ({
  items = [{ title: "Chairs" }],
  onClick,
}: {
  items: [
    {
      title: string
      url?: string
      active?: boolean
    }
  ]
  onClick: () => void
}) => {
  return (
    <div className="hidden py-2 text-left text-xs  text-[#8c8c8c] lg:block">
      {items.map((item, i) => {
        const { title, url, active } = item
        return (
          <Fragment key={i}>
            {i !== 0 && (
              <div className="li icon h2 mx-1 inline items-end justify-center text-[12px]">
                <svg
                  className="inline "
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 16 16"
                  height="1em"
                  width="0.9em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            )}
            {url ? (
              <Link
                onClick={onClick ? () => onClick(item) : undefined}
                href={url}
                className={clsx(
                  "page-title text-[#333]",
                  active && "font-bold text-black"
                )}
              >
                {title}
              </Link>
            ) : (
              <span
                className={clsx(
                  "page-title ",
                  active && "font-bold text-black"
                )}
              >
                {title}
              </span>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
