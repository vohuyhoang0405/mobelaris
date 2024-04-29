"use client"
import themes from "daisyui/src/theming/themes"
import { useEffect, useState } from "react"
import { themeChange } from "theme-change"
import AllTheme from "./themes.styles"
const themekeys = Object.keys(themes)
const ThemeChange = () => {
  useEffect(() => {
    // themeChange(false)
  }, [])
  return (
    <div
      title="Change Theme"
      className="dropdown dropdown-top hidden [@supports(color:oklch(0_0_0))]:block "
    >
      <AllTheme />
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost  btn-sm rounded-full"
      >
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-5 w-5 stroke-current md:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>{" "}
        <span className="hidden font-normal md:inline">Theme</span>{" "}
        <svg
          width="12px"
          height="12px"
          className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content top-px mt-16 h-[28.6rem] max-h-[calc(100vh-10rem)] w-56 overflow-y-auto rounded-box border border-white/5 bg-base-200 text-base-content shadow-2xl outline outline-1 outline-black/5"
      >
        <div className="grid grid-cols-1 gap-3 p-3">
          {themekeys.map((theme) => (
            <button
              key={theme}
              onClick={() => {
                themeChange(theme)
              }}
              className="text-start outline-offset-4 outline-base-content"
              data-set-theme={theme}
              data-act-class="[&_svg]:visible"
            >
              <span
                data-theme={theme}
                className="block w-full cursor-pointer rounded-btn bg-base-100 font-sans text-base-content"
              >
                <span className="grid grid-cols-5 grid-rows-3">
                  <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="invisible h-3 w-3 shrink-0"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                    </svg>{" "}
                    <span className="flex-grow text-sm">{theme}</span>{" "}
                    <span className="flex h-full shrink-0 flex-wrap gap-1">
                      <span className="w-2 rounded-badge bg-primary" />{" "}
                      <span className="w-2 rounded-badge bg-secondary" />{" "}
                      <span className="w-2 rounded-badge bg-accent" />{" "}
                      <span className="w-2 rounded-badge bg-neutral" />
                    </span>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
const Adminbar = () => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])
  if (!ready) return null
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex items-end justify-center p-6">
      <div className="pointer-events-auto flex min-w-[50vw] items-center gap-2 rounded-full border p-1 backdrop-blur-lg">
        <div className="px-6 text-lg font-bold">Preview</div>
        <div className="flex-1"></div>
        {/* <ThemeChange /> */}
        <a
          href="/admin/dashboard/revalidate/path"
          className=" btn btn-primary btn-sm pointer-events-auto rounded-full"
        >
          Publish
        </a>
        <a
          href="/admin/api/draft/disable"
          className="btn btn-sm pointer-events-auto rounded-full bg-white"
        >
          Cancel Preview
        </a>
      </div>
    </div>
  )
}
export default Adminbar
