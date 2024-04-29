import { useT } from "app/[locale]/context/sources"
import { useStore } from "app/[locale]/context/store-context"
import { get } from "lodash-es"
import { useEffect } from "react"

export function CountDown() {
  const t = useT()
  const { pageProps } = useStore()
  const datetime = get(pageProps, "countdown")
  const strings = {
    day: t("day"),
    days: t("days"),
  }
  useEffect(() => {
    if (!datetime) {
      return
    }
    function addHours(date, h) {
      date.setTime(date.getTime() + h * 60 * 60 * 1000)
      return date
    }
    // Set the date we're counting down to
    var date = new Date(datetime)
    var countDownDate = addHours(date, 7).getTime()
    var now = new Date().getTime()
    // Find the distance between now and the count down date
    var distance = countDownDate - now
    if (distance <= 0) {
      return
    }
    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime()
      // Find the distance between now and the count down date
      var distance = countDownDate - now
      if (distance > 0) {
        document.querySelector("#countDownDate-wrap").style.display = "block"
      } else {
        document.querySelector("#countDownDate-wrap").style.display = "none"
      }
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24))
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = Math.floor((distance % (1000 * 60)) / 1000)
      // Display the result in the element with id="demo"
      let countdownstring = " "
      if (days === 0) {
      } else if (days === 1) {
        countdownstring = countdownstring + days + " " + strings.day + ", "
      } else {
        countdownstring = countdownstring + days + " " + strings.days + ", "
      }
      document
        .getElementById("countDownDate")
        .style.setProperty("--days", `'${countdownstring}'`)
      document
        .getElementById("countDownDate")
        .style.setProperty("--hours", hours + "")
      document
        .getElementById("countDownDate")
        .style.setProperty("--minutes", minutes + "")
      document
        .getElementById("countDownDate")
        .style.setProperty("--seconds", seconds + "")
    }, 1000)
    return () => {
      x && clearInterval(x)
    }
  }, [datetime])
  return (
    <div
      id="countDownDate-wrap"
      style={{ display: "none" }}
      className="left-0  top-0 block w-full bg-black text-center font-mono text-xs  font-semibold uppercase leading-[32px] text-white animatecss animatecss-fadeInDown lg:py-[0.4em] lg:text-sm"
    >
      {t("SPRING SALE")}{" "}
      <div className="inline-block align-sub text-[1.4em]">
        <svg
          fill="currentColor"
          height="1em"
          strokeWidth={0}
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
          <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
        </svg>
      </div>{" "}
      {t("Sale ends in")} :
      <span id="countDownDate" className="inline-block">
        <span
          className="before:content-[var(--content)]"
          style={{ "--content": `var(--days)` }}
        ></span>
        <span className="countdown">
          <span style={{ "--value": `var(--hours)` }}></span>:
        </span>
        <span className="countdown">
          <span style={{ "--value": `var(--minutes)` }}></span>:
        </span>
        <span className="countdown">
          <span style={{ "--value": `var(--seconds)` }}></span>
        </span>
      </span>
    </div>
  )
}
