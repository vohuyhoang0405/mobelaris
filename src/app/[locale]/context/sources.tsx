"use client"
import { fetchTrans } from "@lib/apihandlers/fetchTrans"
import { IS_BROWSER } from "@lib/constants"
import { debounce } from "lodash-es"
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useDeferredValue,
  useRef,
  useState,
} from "react"
import { useStore } from "./store-context"
declare global {
  interface Window {
    translations: { [key: string]: string }
  }
}
const sourcesContext = createContext<{
  value: { [key: string]: any }
  t: (key: string) => string
}>({
  value: {},
  t: (key) => key,
})
sourcesContext.displayName = "sourcesContext"
const { Consumer, Provider } = sourcesContext
export const SourcesProvider: React.FC<
  PropsWithChildren<{
    name: string
    value: {
      [key: string]: string
    }
  }>
> = ({ name, value, children }) => {
  const {
    value: { name: parentName },
  } = useContext(sourcesContext)
  let finalName = name
  if (parentName) {
    finalName = parentName + "." + name
  }
  const transRef = useRef<{ [key: string]: string }>(value)
  const transPromiseRef = useRef<{ [key: string]: any }>({})
  const hadtransPromiseRef = useRef<{ [key: string]: any }>({})
  const { langCode } = useStore()
  const [update, setUpdate] = useState<number>(0)
  const updated = useDeferredValue(update)
  const saveTranslations = useCallback(() => {
    let transKey = "translations_" + langCode
    let trans = {}
    try {
      trans = JSON.parse(
        localStorage.getItem("translations_" + langCode) || "{}"
      )
    } catch (error) {
      trans = {}
    }
    window.translations = window.translations || {}
    window.translations[name] = window.translations[name] || {}
    window.translations[name] = {
      ...window.translations[name],
      ...transRef.current,
    }
    localStorage.setItem(
      "translations_" + langCode,
      JSON.stringify(window.translations)
    )
  }, [finalName, langCode])
  const debounceTrans = useCallback(
    debounce(() => {
      const resources = Object.values(transPromiseRef.current).filter(
        (item) => !hadtransPromiseRef.current[item.key]
      )
      const variables = {
        langCode,
        resources,
      }
      hadtransPromiseRef.current = {
        ...hadtransPromiseRef.current,
        ...transPromiseRef.current,
      }
      if (variables.resources.length) {
        fetchTrans(variables).then((res) => {
          res.forEach((item: { key: string; value: string }) => {
            const { key, value } = item
            if (key) transRef.current[key] = value
          })
          saveTranslations()
          setUpdate((u) => u + 1)
        })
      }
    }, 1000),
    []
  )
  const t = useCallback(
    (key: string) => {
      const getString = (key: string) => {
        return transRef?.current?.[key]
      }
      const getTransPromiss = (key: string) => {
        return transPromiseRef?.current?.[key]
      }
      const string = getString(key)
      if (!IS_BROWSER) {
        return string || key
      }
      if (langCode === "en") {
        transRef.current[key] = string || key
        saveTranslations()
        return string || key
      }
      if (string) {
        return string
      }
      if (IS_BROWSER) {
        const transPromise = getTransPromiss(key)
        if (!transPromise) {
          transPromiseRef.current[key] = {
            key: key,
            value: key,
          }
          debounceTrans()
        }
      }
      return string || key
    },
    [langCode, saveTranslations]
  )
  return (
    <Provider
      value={useDeferredValue({
        name: finalName,
        updated,
        value,
        t,
      })}
    >
      {children}
    </Provider>
  )
}
export const useT = () => {
  const { langCode } = useStore()

  const { t } = useContext(sourcesContext)
  return (text: string) => {
    if (langCode === "en") {
      return text
    }
    let result = t(text)
    if (result === "error") {
      return text
    }
    return result
  }
}

export const TValues: FC<
  PropsWithChildren<{ children: string; id: string; ishtml?: boolean }>
> = ({ ishtml, id }) => {
  const { value, t } = useContext(sourcesContext)
  const res = value[id] || t(id)
  if (ishtml) {
    return <div dangerouslySetInnerHTML={{ __html: res || t(id) }}></div>
  }
  return <>{res || t(id)}</>
}
export const T: FC<
  PropsWithChildren<{ children: string; id?: string; ishtml?: boolean }>
> = ({ children, ishtml, id }) => {
  return <Trans ishtml={ishtml}>{children}</Trans>
}
export const Trans: FC<
  PropsWithChildren<{ children: string; id?: string; ishtml?: boolean }>
> = ({ children, ishtml }) => {
  const t = useT()
  if (ishtml) {
    return <div dangerouslySetInnerHTML={{ __html: t(children) }}></div>
  }
  return <>{t(children)}</>
}
