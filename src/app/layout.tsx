import { config } from "@shop/index"
import "styles/globals.css"
import ErrorBoundary from "./components/ErrorBoundary"

export default function Root({ children }: { children: JSX.Element }) {
  return (
    <>
      <ErrorBoundary>{children}</ErrorBoundary>
    </>
  )
}
export const metadata = config.metadata
