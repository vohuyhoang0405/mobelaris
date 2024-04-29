"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTina } from "tinacms/dist/react"
import client from "../../../tina/__generated__/client"
import { PageQuery } from "../../../tina/__generated__/types"
function UseTinaPage({
  query,
  variables,
  data,
}: {
  data: PageQuery
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
function PageTina({}) {
  const [page, setpage] = useState<{
    data: PageQuery
    variables: {
      relativePath: string
    }
    query: string
  }>({})
  const pathname = usePathname()
  useEffect(() => {
    const handle = async () => {
      if (pathname) {
        const [handle, locale = "en"] = pathname?.split("/").reverse()
        const relativePath = `${locale}/_${handle}.json`
        console.log({ relativePath })
        const res = await client.queries.page({
          relativePath,
        })
        if (res?.data) {
          setpage(res)
        }
      }
    }
    handle()
    return () => {
      setpage({})
    }
  }, [pathname])
  return <UseTinaPage {...page}></UseTinaPage>
}

export default function PageTinaWrap({ relativePath }) {
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
