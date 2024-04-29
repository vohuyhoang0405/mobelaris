"use client"
import { useEffect, useState } from "react"
import { useTina } from "tinacms/dist/react"
import { HomepageQuery } from "../../../../../tina/__generated__/types"
import AdvancedBanner from "./AdvancedBanner"
import Banner from "./Banner"

function IsEditting({
  query,
  variables,
  data,
}: {
  query: string
  variables: {
    relativePath: string
  }
  data: HomepageQuery
}) {
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
  return <Blocks query={query} variables={variables} data={data}></Blocks>
}

const Blocks = ({
  query,
  variables,
  data,
}: {
  query: string
  variables: {
    relativePath: string
  }
  data: HomepageQuery
}) => {
  const res = useTina({
    query,
    variables,
    data: data,
  })
  let bannerData = res?.data?.homepage.blocks?.[0]

  return (
    <>
      {res?.data?.homepage.blocks
        ?.filter((item, i) => i === 0)
        .map((block, index) => {
          if (!block) return null
          if (block.__typename === "HomepageBlocksHero") {
            bannerData = block
            return <Banner key={index} {...block} />
          }
          if (block.__typename === "HomepageBlocksHeroCustomBlock") {
            bannerData = block
            return <AdvancedBanner key={index} {...block} />
          }
          return null
        })}
    </>
  )
}
export default Blocks
