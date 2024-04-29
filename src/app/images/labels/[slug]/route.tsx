import { ImageResponse } from "next/og"

export const alt = "About Acme"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string }
  }
) {
  const data = { data: "hello" }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* {params.slug.split(".")[0].toUpperCase()} */}
      </div>
    )
  )
}
