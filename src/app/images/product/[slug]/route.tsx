import { medusaServerClient } from "@lib/config.server"
import handles from "@shop/handles.json"
import { ImageResponse } from "next/og"
export const size = {
  width: 800,
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
  const trimSlug = params.slug.split(".")[0]

  const dataString = handles.find((item) => item.slug === trimSlug)?.data
  try {
    const data = JSON.parse(dataString)
    const pId = data.id
    const { product } = await medusaServerClient.products.retrieve(pId)
    const imageUrl = product.variants[0]?.metadata?.images[0]
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            fontFamily: "heading, sans-serif",
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              opacity: 0.05,
              bottom: 0,
              left: 0,
              backgroundPosition: "center",
              background: "url(https://play.tailwindcss.com/img/grid.svg)",
            }}
          />
          <img
            src={imageUrl}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              opacity: 1,
              height: 630,
              width: 800,
              padding: "30px",
              objectFit: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
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
          {params.slug}
        </div>
      )
    )
  }
}
