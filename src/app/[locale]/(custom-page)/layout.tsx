import { GTagEventEnterPage } from "app/components/googleTag"
import { notFound } from "next/navigation"

export default function Root({ children }: { children: JSX.Element }) {
  try {
    return (
      <>
        {children}
        <GTagEventEnterPage type="undefined" />
      </>
    )
  } catch (error) {
    console.log(error)
    return notFound()
  }
}
