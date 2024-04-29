"use client"
import { useT } from "app/[locale]/context/sources"
import checkimg from "./checkout_cart_info_ok.png"

export const CartFeatures = () => {
  const t = useT()
  return (
    <div className="accordion-block space-y-3">
      <div className="cart-shipping-block-info">
        <ul>
          <li
            style={{ background: `url(${checkimg.src}) no-repeat center left` }}
            className="pl-[30px] text-lg"
          >
            {t("7 days a week support")}
          </li>
          <li
            style={{ background: `url(${checkimg.src}) no-repeat center left` }}
            className="pl-[30px] text-lg"
          >
            {t("5 Years warranty")}
          </li>
          <li
            style={{ background: `url(${checkimg.src}) no-repeat center left` }}
            className="pl-[30px] text-lg"
          >
            {t("Secure checkout")}
          </li>
          <li
            style={{ background: `url(${checkimg.src}) no-repeat center left` }}
            className="pl-[30px] text-lg"
          >
            <span style={{ color: "#000000" }}>
              <a
                target="_blank"
                href="https://www.trustpilot.com/review/www.mobelaris.com"
              >
                <span style={{ color: "#000000" }}>
                  <b>TRUST</b>PILOT{" "}
                  <img
                    className="inline object-contain align-text-top"
                    src="https://www.mobelaris.com/static/version1680161260/frontend/Mobelaris/Theme/en_GB/images/checkout_cart_info_rating.png"
                  />
                </span>
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
