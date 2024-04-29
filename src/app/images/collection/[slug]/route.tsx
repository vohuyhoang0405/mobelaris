import { LangCodeType } from "@lib/TranslateAndSaveType"
import { searchServer } from "@lib/config.server"
import { SEARCH_CONFIG } from "@lib/constants"
import { ImageResponse } from "next/og"
export const alt = "About Acme"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
const search = async (langCode: LangCodeType, textSearch: string) => {
  let hits = (
    await searchServer
      .index("products_" + langCode)
      .search("", {
        filter: [`tags_value="${textSearch}"`],
        ...SEARCH_CONFIG,
        limit: 8,
      })
      .catch((e) => {
        console.error("error found when searching " + textSearch)
        return {
          hits: [],
        }
      })
  ).hits
  if (!hits || !hits.length) {
    hits = (
      await searchServer
        .index("products_" + langCode)
        .search(textSearch, {
          ...SEARCH_CONFIG,
          limit: 8,
        })
        .catch((e) => {
          console.error("error found when searching " + textSearch)
          return {
            hits: [],
          }
        })
    ).hits
  }
  return hits
}
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string }
  }
) {
  const collection = params.slug.split(".")[0].toUpperCase()
  const hits = await search("en", collection)

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
            opacity: 0.5,
            bottom: 0,
            left: 0,
            backgroundPosition: "center",
            background: "url(https://play.tailwindcss.com/img/beams.jpg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {hits.map(
            (hit, i) =>
              i >= 4 && (
                <img
                  src={hit.thumbnail}
                  style={{
                    opacity: 1,
                    height: 210,
                    width: 300,
                    padding: "30px",
                    objectFit: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )
          )}
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            left: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {hits.map(
            (hit, i) =>
              i < 4 && (
                <img
                  src={hit.thumbnail}
                  style={{
                    opacity: 1,
                    height: 210,
                    width: 300,
                    padding: "30px",
                    objectFit: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )
          )}
        </div>
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
        {collection}
      </div>
    ),
    {
      ...size,
    }
  )
}
