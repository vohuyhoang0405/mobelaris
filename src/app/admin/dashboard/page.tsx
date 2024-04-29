import { medusaServerClient } from "@lib/config.server"

const Dashboard = async () => {
  const { regions } = await medusaServerClient.regions.list()
  return (
    <div className="scrollbar:!w-1.5 scrollbar:!h-1.5  scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded  scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 lg:supports-scrollbars:pr-2 mx-auto max-h-96 w-full px-4 sm:px-6 md:px-0 lg:max-h-96">
      <div className="grid  w-full gap-6 p-6 lg:grid-cols-2 ">
        <div className="h-full w-full border  p-6 shadow-inner">
          <div className="text-lg font-bold">Tools</div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 text-sm font-semibold leading-6 ">
                  <div className="border-b border-slate-200 py-2 pr-2 dark:border-slate-400/20">
                    Name
                  </div>
                </th>
                <th className="sticky top-0 z-10 text-sm font-semibold leading-6 ">
                  <div className="border-b border-slate-200 py-2 pl-2 dark:border-slate-400/20">
                    url
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="align-baseline">
              {[
                {
                  name: "Update homepage",
                  url: "/api/revalidate",
                },
                {
                  name: "Update feed",
                  url: "/feed/revalidate",
                },
                {
                  name: "Update google feed",
                  url: "/feed/google/revalidate",
                },
              ].map((item) => {
                return (
                  <tr>
                    <td
                      translate="no"
                      className="whitespace-nowrap py-2 pr-2 font-mono text-xs font-medium leading-6 text-sky-500 dark:text-sky-400"
                    >
                      {item.name}
                    </td>
                    <td
                      translate="no"
                      className="whitespace-pre py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 "
                    >
                      <a target="_blank" href={item.url}>
                        {item.url}
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="h-full w-full border  p-6 shadow-inner">
          <div className="text-lg font-bold">Others</div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 text-sm font-semibold leading-6 ">
                  <div className="border-b border-slate-200 py-2 pr-2 dark:border-slate-400/20">
                    Name
                  </div>
                </th>
                <th className="sticky top-0 z-10 text-sm font-semibold leading-6 ">
                  <div className="border-b border-slate-200 py-2 pl-2 dark:border-slate-400/20">
                    url
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="align-baseline">
              {[
                {
                  name: "Foto Medusa admin",
                  url: "/medusa-admin",
                },
                {
                  name: "Edit CMS Content",
                  url: "/admin",
                },
              ].map((item) => {
                return (
                  <tr>
                    <td
                      translate="no"
                      className="whitespace-nowrap py-2 pr-2 font-mono text-xs font-medium leading-6 text-sky-500 dark:text-sky-400"
                    >
                      {item.name}
                    </td>
                    <td
                      translate="no"
                      className="whitespace-pre py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 "
                    >
                      <a target="_blank" href={item.url}>
                        {item.url}
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="h-full w-full border  p-6 shadow-inner">
          <div className="text-lg font-bold">Feed list</div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 text-sm font-semibold leading-6 ">
                  <div className="border-b border-slate-200 py-2 pr-2 dark:border-slate-400/20">
                    Region
                  </div>
                </th>
                <th className="sticky top-0 z-10 text-sm font-semibold leading-6 ">
                  <div className="border-b border-slate-200 py-2 pl-2 dark:border-slate-400/20">
                    Feed url
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="align-baseline">
              {regions.map((region) => {
                return (
                  <tr>
                    <td
                      translate="no"
                      className="whitespace-nowrap py-2 pr-2 font-mono text-xs font-medium leading-6 text-sky-500 dark:text-sky-400"
                    >
                      {region.name}
                    </td>
                    <td
                      translate="no"
                      className="whitespace-pre py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 "
                    >
                      <a target="_blank" href={`/feed/` + region.id}>
                        {`/feed/google/` + region.id}
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="h-full w-full border  p-6 shadow-inner">
          <div className="text-lg font-bold">Google Feed list</div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 text-sm font-semibold leading-6 ">
                  <div className="border-b border-slate-200 py-2 pr-2 dark:border-slate-400/20">
                    Region
                  </div>
                </th>
                <th className="sticky top-0 z-10 text-sm font-semibold leading-6 ">
                  <div className="border-b border-slate-200 py-2 pl-2 dark:border-slate-400/20">
                    Feed url
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="align-baseline">
              {regions.map((region) => {
                return (
                  <tr>
                    <td
                      translate="no"
                      className="whitespace-nowrap py-2 pr-2 font-mono text-xs font-medium leading-6 text-sky-500 dark:text-sky-400"
                    >
                      {region.name}
                    </td>
                    <td
                      translate="no"
                      className="whitespace-pre py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 "
                    >
                      <a target="_blank" href={`/feed/google/` + region.id}>
                        {`/feed/google/` + region.id}
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
