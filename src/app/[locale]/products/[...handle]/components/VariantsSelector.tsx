"use client"
import { useT } from "app/[locale]/context/sources"
import clsx from "clsx"
import { kebabCase } from "lodash-es"
import { useContext } from "react"
import { prodcutContext } from "."

export const VariantsSelector = () => {
  const {
    availableOptions,
    product,
    variant: selectedVariant,
    handleOptionSelect,
    handleVariantSelect,
    showExpress,
    setShowExpress,
    hideshowExpressToogle,
  } = useContext(prodcutContext)
  const t = useT()

  return (
    <>
      {!hideshowExpressToogle && (
        <label className="cursor-pointer rounded-none text-primary hover:underline">
          <div className="flex w-full flex-1">
            <div className="flex-1 leading-[20px]">
              <div>
                {showExpress
                  ? t("Show All Options")
                  : t("Show Express Delivery Options")}
              </div>
            </div>
            <input
              checked={showExpress}
              onChange={(e) => {
                setShowExpress(e.target.checked)
              }}
              id="showExpress"
              type="checkbox"
              hidden
              className="toggle toggle-sm hidden md:toggle-md"
            />
          </div>
        </label>
      )}
      {availableOptions.map((option, i) => {
        let isColor = option.type === "color"
        const name = t(option.name.replace("-", ""))
        if (!isColor) {
          return (
            <div key={option.id} className="clearfix swatch">
              <div className="text-lg">{name}</div>
              <div className="grid grid-cols-2 gap-3">
                {option.values.map((value) => {
                  let active =
                    selectedVariant[`option${option.position}`] == value
                  return (
                    <div
                      key={value}
                      className="!m-0 flex h-[3.4em] w-full  items-center justify-center p-[3px] text-center text-xs font-extrabold  uppercase leading-none transition-spacing hover:p-0"
                    >
                      <label
                        onClick={() => {
                          handleOptionSelect(option, value)
                        }}
                        className={clsx(
                          "flex h-full w-full items-center justify-center border bg-gray-50 px-2 text-center ring-[3px] ring-gray-500 ring-opacity-20 ring-offset-2 hover:ring-[1px] hover:ring-opacity-50",
                          active
                            ? "!ring-[3px] !ring-primary !ring-opacity-100"
                            : ""
                        )}
                        htmlFor={`product-template-swatch-1-${value}`}
                      >
                        {t(value)}
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
        return (
          <div key={option.id} className="clearfix swatch">
            <div className="text-lg font-extrabold">{name}</div>
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start ">
              {option.values.map((value) => {
                let active =
                  selectedVariant[`option${option.position}`] === value
                return (
                  <div
                    key={value}
                    className="swatch-element color group tooltip flex w-[12%] min-w-[50px] max-w-[60px] flex-shrink-0 p-[3px] capitalize leading-none transition-spacing animatecss animatecss-fadeIn hover:p-0"
                    data-tip={t(`${value}`)}
                  >
                    <label
                      tabIndex={-1}
                      onClick={() => {
                        handleOptionSelect(option, value)
                      }}
                      className={clsx(
                        "group relative w-full touch-manipulation pt-[100%]"
                      )}
                      htmlFor={`product-template-swatch-${option.position}-${value}`}
                    >
                      <div
                        style={{ backgroundColor: value }}
                        className={clsx(
                          "pointer-events-none absolute inset-0 overflow-hidden  rounded-full border border-gray-300 text-gray-300 shadow-md ring-[3px] ring-current ring-opacity-50 ring-offset-[3px] hover:ring-[1px] hover:ring-opacity-100 group-active:ring-[3px] ",
                          active && "!ring-[3px] ring-primary ring-opacity-80"
                        )}
                      >
                        <img
                          className="absolute inset-0 h-full w-full rounded-full object-cover shadow-md"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                          loading="lazy"
                          src={`https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/swatchs/${
                            product.handle
                          }/${kebabCase(value)}.png`}
                        ></img>
                      </div>
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}
