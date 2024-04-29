import { T, TValues } from "app/[locale]/context/sources"
import Image from "next/image"
import trustpilotImg from "./images/trustpilot-logo-black.svg"
function Trustpilot() {
  return (
    <a
      href="https://uk.trustpilot.com/review/www.mobelaris.com"
      target="_blank"
      className="flex items-center gap-1 whitespace-nowrap font-sans text-[0.7rem] lg:text-xs"
    >
      <div className="inline whitespace-nowrap leading-[24px]">
        <span className="hidden  lg:inline">
          <T>Check out our</T>
        </span>
        <p className="font-bold">
          {" "}
          <TValues id="trustpilot.reviews_number">{"966"}</TValues>{" "}
          <T>reviews</T>
        </p>{" "}
      </div>
      <Image
        src={trustpilotImg}
        height={18}
        width={73}
        className="mt-[-1%] inline h-[16.8px] object-left lg:h-[18px]"
        alt="Trustpilot logo"
      ></Image>
    </a>
  )
}
// function TrustpilotOld() {
//   const [ready, setReady] = useState(false)
//   useEffect(() => {
//     setReady(true)
//   }, [])
//   if (!ready) return null
//   return (
//     <div
//       style={{ width: "200px" }}
//       className="relative -left-4 flex w-[230px] justify-start"
//     >
//       <div
//         className="trustpilot-widget w-[260px] flex-shrink-0"
//         data-locale="en-GB"
//         data-template-id="5419b6a8b0d04a076446a9ad"
//         data-businessunit-id="5bf29d0330ff6e00011c5336"
//         data-style-height="24px"
//         data-style-width="100%"
//         data-theme="light"
//         data-style-alignment="left"
//       >
//         <a
//           href="https://uk.trustpilot.com/review/www.mobelaris.com"
//           target="_blank"
//           rel="noopener"
//         ></a>
//       </div>
//     </div>
//   )
// }
export function ProductTrustpilot() {
  return (
    <div className="flex justify-center lg:ml-[-8px] lg:w-[230px] lg:justify-start">
      <div
        className="trustpilot-widget w-[260px] flex-shrink-0"
        data-locale="en-GB"
        data-template-id="5419b6a8b0d04a076446a9ad"
        data-businessunit-id="5bf29d0330ff6e00011c5336"
        data-style-height="24px"
        data-style-width="100%"
        data-theme="light"
        data-style-alignment="center"
      >
        <a
          href="https://uk.trustpilot.com/review/www.mobelaris.com"
          target="_blank"
          rel="noopener"
        ></a>
      </div>
    </div>
  )
}
export default Trustpilot
