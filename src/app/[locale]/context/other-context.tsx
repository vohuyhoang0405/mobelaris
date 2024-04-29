"use client"
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react"
declare global {
  interface Window {
    translations: { [key: string]: string }
  }
}
const otherContext = createContext<{
  ready: boolean
}>({
  ready: false,
})
otherContext.displayName = "otherContext"
const { Consumer, Provider } = otherContext
export const OtherProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const load3PartyAble = localStorage.getItem("load3PartyAble")
    localStorage.setItem("load3PartyAble", "true")
    if (load3PartyAble) {
      setReady(true)
    }
  }, [])
  useEffect(() => {
    let lastKnownScrollPosition = 0
    let ticking = false
    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastKnownScrollPosition > 100) {
            setReady(true)
            document.removeEventListener("scroll", handleScroll)
          }
          ticking = false
        })

        ticking = true
      }
    }
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <Provider
      value={useDeferredValue({
        ready,
      })}
    >
      {children}
    </Provider>
  )
}
export const OtherConsumer = Consumer
export const useReady = () => useContext(otherContext).ready
export const Ready: FC<PropsWithChildren<{ children: JSX.Element }>> = ({
  children,
}) => {
  const { ready } = useContext(otherContext)
  if (!ready) {
    return null
  }
  return children
}
