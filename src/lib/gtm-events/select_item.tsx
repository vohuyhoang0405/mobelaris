"use client"

import { useStore } from "app/[locale]/context/store-context"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { HitItem } from "types/global"
import { GTMEvent, getEventId, pushGTMEvent, transformHitToGTMItem } from "."

const GTMVSelectItemEvent = ({
  items,
  children,
  listId,
}: {
  items: HitItem[]
  children: ReactNode
  listId?: string
}) => {
  const pathName = usePathname()
  const { region } = useStore()
  const handleClick = () => {
    const event_id = getEventId()
    let itemListId = listId || pathName || "undefined"
    const data: GTMEvent = {
      event: "select_item",
      event_id: event_id,
      ecommerce: {
        item_list_id: itemListId,
        items: items.map((item) =>
          transformHitToGTMItem({
            item,
            item_list_name: itemListId,
            region,
          })
        ),
      },
    }
    pushGTMEvent({ event: data })
    return data
  }
  return (
    <div className="w-full" onClick={handleClick}>
      {children}
    </div>
  )
}

export default GTMVSelectItemEvent
