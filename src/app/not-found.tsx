import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
        <h1 className="text-2xl-semi text-gry-900">Page not found</h1>
        <p className="text-small-regular text-gray-700">
          The page you tried to access does not exist.
        </p>
        <Link
          href="/"
          className="text-base-regular mt-4 text-gray-900 underline"
        >
          Go to frontpage
        </Link>
      </div>
    </>
  )
}
