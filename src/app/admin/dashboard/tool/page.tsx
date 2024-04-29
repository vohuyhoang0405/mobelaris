export default async function Page({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    return (
      <ul className="menu whitespace-pre  rounded-box">
        <li>
          <a href={"/admin/index.html"}>Cusomize Store</a>
        </li>
        <li>
          <a href={process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + "/app"}>
            Backend Admin
          </a>
        </li>
      </ul>
    )
  } catch (e) {
    console.error(e)
    return null
  }
}
