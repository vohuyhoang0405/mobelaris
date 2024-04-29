import { GTagEventEnterPage } from "app/components/googleTag"

export default function Root({ children }: { children: JSX.Element }) {
  return (
    <>
      {children}
      <GTagEventEnterPage type="blog" />
    </>
  )
}
