function Collapse({
  title,
  content,
  children,
}: {
  title: any
  content?: any
  children?: any
}) {
  return (
    <div
      tabIndex={-1}
      className="group flex w-full flex-col items-center text-left focus-within:pointer-events-none md:relative "
    >
      <div className="flex w-full items-center justify-between gap-3 lg:flex-col lg:gap-6">
        {title}
        <svg
          tabIndex={-1}
          className="icon h2 infoo lg:hidden"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <div
        tabIndex={-1}
        className="invisible relative left-0 top-full z-10 max-h-0 w-full overflow-hidden bg-transparent p-0 opacity-0 transition-all duration-700 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:mt-0 group-focus-within:max-h-screen group-focus-within:overflow-auto group-focus-within:opacity-100 lg:pointer-events-auto lg:visible lg:relative lg:mt-0 lg:max-h-screen lg:overflow-auto lg:p-6 lg:opacity-100 lg:transition-none"
      >
        {content || children}
      </div>
    </div>
  )
}

export default Collapse
