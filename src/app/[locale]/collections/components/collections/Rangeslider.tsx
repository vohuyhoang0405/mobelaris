// Prerequisite: install rheostat@4
import { useT } from "app/[locale]/context/sources"
import { useFormatPrice } from "app/[locale]/hooks/use-format-price"
import { useEffect, useState } from "react"
import { connectRange } from "react-instantsearch-dom"
import Rheostat from "rheostat"
import "rheostat/initialize"
const style = `
.DefaultProgressBar__vertical {
  width: 24px;
  height: 100%;
}
.DefaultProgressBar_progressBar {
  background-color: #abc4e8;
  position: absolute;
}
.DefaultProgressBar_progressBar__vertical {
  height: 100%;
  width: 24px;
}
.DefaultProgressBar_background__vertical {
  height: 100%;
  top: 0px;
  width: 15px;
}
.DefaultProgressBar_background__horizontal {
  height: 2px;
  top: 6px;
  background:#343434
}
.DefaultHandle_handle {
  width: 24px;
  height: 24px;
  border-width: 1px;
  border-style: solid;
  border-color: #d8d8d8;
  background-color: #fcfcfc;
  border-radius: 20%;
  outline: none;
  z-index: 2;
  box-shadow: 0 2px 2px #dbdbdb;
}
.DefaultHandle_handle:focus {
  box-shadow: #abc4e8 0 0 1px 1px;
}
.DefaultHandle_handle:after {
  content: "";
  display: block;
  position: absolute;
  background-color: #dadfe8;
}
.DefaultHandle_handle:before {
  content: "";
  display: block;
  position: absolute;
  background-color: #dadfe8;
}
.DefaultHandle_handle__horizontal {
  margin-left: -16px;
  top: -5px;
  background: #fff!important;
    position: absolute;
    top: 50%;
    cursor: -webkit-grab;
    cursor: grab;
    height: 20px;
    width: 20px;
    transform: translateY(-50%) translateX(10px);
    border: 2px solid rgb(19, 20, 19);
    touch-action: none;
    background: white;
    border-radius: 99em;
}

.DefaultHandle_handle__vertical {
  margin-top: -12px;
  left: -10px;
}
.DefaultHandle_handle__vertical:before {
  top: 10px;
}
.DefaultHandle_handle__vertical:after {
  top: 13px;
  left: 8px;
  height: 1px;
  width: 10px;
}
.DefaultHandle_handle__disabled {
  border-color: #dbdbdb;
}
.DefaultBackground {
  background-color: #fcfcfc;
  height: 15px;
  width: 100%;
  border: 1px solid #d8d8d8;
  position: relative;
}
.DefaultBackground_background__horizontal {
  top: 6px;
  left: 0;
  width: 100%;
  height: 2px;
    background: transparent;
    position: absolute;
    overflow: hidden;
}
.DefaultBackground_background__vertical {
  width: 15px;
  top: 0px;
  height: 100%;
}
.rheostat {
  position: relative;
  overflow: visible;
}
@media (min-width: 1128px) {
  .autoAdjustVerticalPosition {
    top: 12px;
  }
}
.rheostat__vertical {
  height: 100%;
}
.handleContainer {
  height: 2px;
  top: 6px;
  left: -2px;
  bottom: 4px;
  width: 100%;
  position: absolute;
}
.rheostat_background {
  background-color: #fcfcfc;
  border: 1px solid #d8d8d8;
  position: relative;
}
.rheostat_background__horizontal {
  height: 15px;
  top: -2px;
  left: -2px;
  bottom: 4px;
  width: 100%;
}
.rheostat_background__vertical {
  width: 15px;
  top: 0px;
  height: 100%;
}

`
const RangeSlider = ({
  min,
  currentRefinement,
  canRefine,
  refine,
  count = [],
}) => {
  const formatAmount = useFormatPrice()
  const t = useT()
  let _max = Math.max(1, ...count.map(({ value }) => value))
  const [max, setMax] = useState(_max)
  useEffect(() => {
    setMax((max) => Math.max(max, _max, 1))
  }, [_max])
  const onChange = ({ values: [min, max] }) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max })
    }
  }

  const onValuesUpdated = ({ values: [min, max] }) => {
    refine({ min, max })
  }
  return (
    <>
      <style jsx global>
        {style}
      </style>
      <div style={{ paddingRight: 12 }} className="flex space-x-3 py-3">
        <div className="filter-group-display__price-range-from flex flex-1 items-baseline space-x-3">
          <label className="text-xs" htmlFor="Filter-filter.v.price.gte">
            From
          </label>
          <input
            className="input input-sm input-bordered w-0 flex-1 pr-0 placeholder:block"
            value={Math.floor(currentRefinement.min / 100)}
            placeholder={formatAmount(currentRefinement.min)}
            type="number"
            onChange={(e) =>
              refine({ min: Math.min(0, Number(e.target.value) * 100), max })
            }
          />
        </div>
        <div className="filter-group-display__price-range-to flex flex-1 items-baseline space-x-3 capitalize">
          <label className="text-xs" htmlFor="Filter-filter.v.price.lte">
            To
          </label>
          <input
            className="input input-sm input-bordered w-0 flex-1 pr-0"
            value={Math.floor((currentRefinement.max || max) / 100)}
            placeholder={formatAmount(currentRefinement.max || max)}
            type="number"
            onChange={(e) =>
              refine({ max: Math.max(max, Number(e.target.value) * 100), min })
            }
          />
        </div>
      </div>
      <div className="pl-4 pr-8">
        <Rheostat
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max || max]}
          onChange={onChange}
          onValuesUpdated={onValuesUpdated}
        ></Rheostat>
      </div>
      <div className="mt-6">
        {t("Max")}: {formatAmount(max)}
      </div>
    </>
  )
}

export const CustomRangeSlider = connectRange(RangeSlider)
