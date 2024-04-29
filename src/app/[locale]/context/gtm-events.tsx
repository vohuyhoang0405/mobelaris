"use client"
import { GTMEvent } from "@lib/gtm-events"
import { createContext, useContext } from "react"

const sourcesContext = createContext<{
  events: GTMEvent[]
}>({
  events: [],
})

sourcesContext.displayName = "sourcesContext"
export const { Consumer: GTMEventConsumer, Provider: GTMEventProvider } =
  sourcesContext
export const useGTMEvent = () => {
  const { events } = useContext(sourcesContext)
  return events
}
