import { cache } from "react"

interface Post {
  authorDatabaseId: number
  authorId: string
  commentCount: number | null
  commentStatus: string
  content: string | null
  contentTypeName: string
  databaseId: number
  date: string
  dateGmt: string
  desiredSlug: string | null
  enclosure: string | null
  excerpt: string | null
  featuredImageDatabaseId: number
  featuredImageId: string
  guid: string
  id: string
  isContentNode: boolean
  isPreview: boolean
  isRestricted: boolean
  isRevision: boolean
  isSticky: boolean
  isTermNode: boolean
  link: string
  modified: string
  modifiedGmt: string
  pingStatus: string
  pinged: string | null
  previewRevisionDatabaseId: number | null
  previewRevisionId: string | null
  slug: string
  status: string
  title: string | null
  toPing: string | null
  uri: string
  featuredImage: {
    node: {
      sourceUrl: string
    }
  }
}

type ReturnData = {
  data: {
    posts: {
      edges: {
        cursor: string
        node: Post
      }[]
      pageInfo: {
        endCursor: string
        hasNextPage: boolean
        hasPreviousPage: boolean
        startCursor: string
      }
    }
  }
}
const url = "https://blog.mobelaris.com/graphql"
const queryAllFirst = `{
  posts(first: 10) {
    edges {
      cursor
      node {
        contentTypeName
        excerpt
        link
        slug
        title
        featuredImage {
          node {
             sourceUrl
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  } 
}`
const queryAllMore = (after: string) => `{
  posts(first: 10, after:"${after}") {
    edges {
      cursor
      node {
        contentTypeName
        excerpt
        link
        slug
        title
        featuredImage {
          node {
             sourceUrl
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  } 
}`
const querySingle = (id: string) => `{ 
  post(idType: SLUG, id: "${id}") {
    title
    content
    excerpt
    featuredImage {
      node {
         sourceUrl
      }
    }
    featuredImage {
      node {
         sourceUrl
      }
    }
  }
}`
export const getAllPosts: () => Promise<Post[]> = cache(async () => {
  let posts: Post[] = []
  let endCursor = null
  let hasNextPage = null

  try {
    let res: ReturnData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: queryAllFirst,
      }),
    }).then((res) => res.json())
    posts = res.data.posts.edges.map((edge: any) => edge.node)
    endCursor = res.data.posts.pageInfo?.endCursor
    hasNextPage = res.data.posts.pageInfo?.hasNextPage
    while (hasNextPage) {
      let res: ReturnData = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: queryAllMore(endCursor),
        }),
      }).then((res) => res.json())

      res.data?.posts.edges.forEach((edge: any) => posts.push(edge.node))
      endCursor = res.data?.posts.pageInfo?.endCursor
      hasNextPage = res.data?.posts.pageInfo?.hasNextPage
    }
  } catch (error) {
    console.error(error)
    return posts
  }
  return posts
})
export const getPost: (id: string) => Promise<{
  data: {
    post: Post
  }
}> = cache(async (id: string) => {
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
})
