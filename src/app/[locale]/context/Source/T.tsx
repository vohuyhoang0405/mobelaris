import { cacheT } from "app/helper"
import { trim } from "lodash-es"
import { T as ClientT } from "../sources"

export const translation = (text: string) => {
  const trimmedText = trim(text)
  let result = cacheT(trimmedText)
  if (!result) {
    return text
  }
  return result
}
const T = ({ children, ishtml }: { children: string; ishtml?: boolean }) => {
  const trimmedText = trim(children)
  let result = cacheT(trimmedText)
  if (!result) {
    return <ClientT ishtml={ishtml}>{children}</ClientT>
  }
  if (ishtml) {
    return <div dangerouslySetInnerHTML={{ __html: cacheT(trimmedText) }}></div>
  }
  return cacheT(trimmedText)
}
export default T
