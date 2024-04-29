"use client"
import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
    setTimeout(() => {
      fetch("/api/_next_api/logError", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          href: location.href,
          error: {
            message: error.message,
            stack: error.stack,
          },
          errorInfo,
        }),
      }).then((res) => {
        console.error(res)
      })
    })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="fixed inset-0 flex h-full w-full flex-col items-center justify-center">
          <h1>Oops, there is an error!</h1>
          <a type="button" href="/">
            Home
          </a>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
