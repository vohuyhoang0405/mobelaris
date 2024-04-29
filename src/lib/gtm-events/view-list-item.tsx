"use client"

import { useStore } from "app/[locale]/context/store-context"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { HitItem } from "types/global"
import { GTMEvent, getEventId, pushGTMEvent, transformHitToGTMItem } from "."

const GTMViewListItemEvent = ({
  items,
  list_id,
}: {
  items: HitItem[]
  list_id: string
}) => {
  const ref = useRef<HTMLImageElement>(null)
  const pathName = usePathname()
  const { region } = useStore()
  useEffect(() => {
    if (!ref.current) return
    let options = {
      root: document,
      rootMargin: "0px",
      threshold: 1.0,
    }
    let observer = new IntersectionObserver((e) => {
      if (e?.[0]?.isIntersecting) {
        const event_id = getEventId()
        const data: GTMEvent = {
          event: "view_item_list",
          event_id: event_id,
          ecommerce: {
            item_list_id: list_id,
            items: items.map((item) =>
              transformHitToGTMItem({
                item,
                item_list_name: list_id,
                region,
              })
            ),
          },
        }
        pushGTMEvent({ event: data })
        observer.disconnect()
      }
    }, options)
    observer.observe(ref.current)
  }, [])
  return (
    <img
      ref={ref}
      width={2}
      height={2}
      loading="lazy"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
    />
  )
}

export default GTMViewListItemEvent
