import { cache } from "react"

type ReturnData = {
  data: {
    cmsPage: {
      title: string
      content: string
    }
  }
}
const url = "https://old.mobelaris.com/graphql"

const querySingle = (id: string) => `query {
  cmsPage(identifier: "${id}") {
    title
    content
  }
}`

export const getPage: (id: string) => Promise<ReturnData> = cache(
  async (id: string) => {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: querySingle(id),
      }),
      cache: "force-cache",
    }).then((res) => res.json())
  }
)
