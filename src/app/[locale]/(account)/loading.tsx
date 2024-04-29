import Spinner from "app/components/Icon/spinner"

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center p-12 text-3xl">
      <Spinner />
    </div>
  )
}
