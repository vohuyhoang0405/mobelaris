"use client"

import { useEffect, useState } from "react"
import { useTina } from "tinacms/dist/react"
import client from "../../../tina/__generated__/client"
import { Custom_PageQuery } from "../../../tina/__generated__/types"
function UseTinaPage({
  query,
  variables,
  data,
}: {
  data: Custom_PageQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const res = useTina({
    query,
    variables,
    data,
  })
  return null
}
function PageTina({ relativePath }: { relativePath: string }) {
  const [page, setpage] = useState<{
    data?: Custom_PageQuery
    variables: {
      relativePath: string
    }
    query?: string
  }>({
    variables: {
      relativePath,
    },
  })
  useEffect(() => {
    const handle = async () => {
      if (relativePath) {
        const res = await client.queries.custom_page({
          relativePath,
        })
        if (res?.data) {
          setpage(res)
        }
      }
    }
    handle()
    return () => {
      setpage({
        variables: {
          relativePath,
        },
      })
    }
  }, [relativePath])
  return page.data ? <UseTinaPage {...page}></UseTinaPage> : null
}

export default function CustomPageTina({ relativePath }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    function inIframe() {
      try {
        return window.self !== window.top
      } catch (e) {
        return true
      }
    }
    if (inIframe()) {
      setShow(true)
    }
  }, [])
  if (!show) {
    return null
  }
  return <PageTina relativePath={relativePath}></PageTina>
}
