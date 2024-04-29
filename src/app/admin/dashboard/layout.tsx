import { cookies } from "next/headers"
let text = `
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
╱╱┏╮╱╱╱╱╱╱╱╱╱╱╱
╱╱┃┃╱╱╱┳╱┓┳╭┫┳┓
▉━╯┗━╮╱┃╱┃┣┻╮┣╱
▉┈┈┈┈┃╱┻┛┛┻╱┻┻┛
▉╮┈┈┈┃╱╱╱╱╱╱╱╱╱
╱╰━━━╯╱╱╱╱╱╱╱╱╱

`

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let theToken = cookies().get("theToken")?.value
  if ("showmethemoney" !== theToken) {
    return (
      <html>
        <body className="flex min-h-screen w-full items-center justify-center whitespace-pre font-serif">
          <form action={"/admin/dashboard/tool/login"} method="POST">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Type here"
                name="value"
                className="input join-item input-bordered block w-full "
              />
            </div>
          </form>
        </body>
      </html>
    )
  }
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
