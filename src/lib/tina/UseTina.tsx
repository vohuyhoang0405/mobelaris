"use client"

import { get } from "lodash-es"
import React, { ReactNode } from "react"
import { useTina } from "tinacms/dist/react"
import { HomepageBlocks } from "../../../tina/__generated__/types"

function UseTina({
  query,
  variables,
  data: defaultData,
  children = null,
  datakey,
}: {
  query: string
  variables: {}
  data: HomepageBlocks
  datakey: string
  children: ReactNode
}) {
  const res = useTina({
    query,
    variables,
    data: defaultData,
  })
  const props = get(res, datakey)
  if (props) return React.cloneElement(children, props)
  return children
}

export default UseTina
