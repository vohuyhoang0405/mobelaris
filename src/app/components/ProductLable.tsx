"use client"

const ProductLable = ({ type }: { type: string }) => {
  let lowerType = type.toLowerCase()
  let url = null
  if ("ash / solid ash / ash wood".includes(lowerType)) {
    url = "https://www.mobelaris.com/media/amasty/amlabel/SolidAsh-Wood.png"
  }
  if ("oak / oak veneer / solid oak".includes(lowerType)) {
    url = "https://www.mobelaris.com/media/amasty/amlabel/11Solid-Oak-Wood.png"
  }
  if ("rosewood".includes(lowerType)) {
    url =
      "https://www.mobelaris.com/media/amasty/amlabel/Solid-Rosewood-Veneer.png"
  }
  if ("beech".includes(lowerType)) {
    url = "https://www.mobelaris.com/media/amasty/amlabel/Solid-Beech-Wood.png"
  }
  if ("walnut / walnut veneer".includes(lowerType)) {
    url = "https://www.mobelaris.com/media/amasty/amlabel/Solid-Walnut-Wood.png"
  }
  if ("as per original dining chair" === lowerType) {
    url =
      "https://www.mobelaris.com/media/amasty/amlabel/21ORIGINAL-DESIGN-LABEL-DINING-CHAIR.png"
  }
  if ("as per original eames office" === lowerType) {
    url =
      "https://www.mobelaris.com/media/amasty/amlabel/1ORIGINAL-DESIGN-LABEL-Office.png"
  }
  if ("as per original noguchi coffee" === lowerType) {
    url =
      "https://www.mobelaris.com/media/amasty/amlabel/1ORIGINAL-DESIGN-LABEL-COFFEE-TABLE.png"
  }
  if ("as per original swan chai" === lowerType) {
    url =
      "https://www.mobelaris.com/media/amasty/amlabel/1ORIGINAL-DESIGN-LABEL-SWAN.png"
  }
  if ("as per original sofa" === lowerType) {
    url =
      "https://www.mobelaris.com/media/amasty/amlabel/1ORIGINAL-DESIGN-LABEL-SOFA.png"
  }

  if ("besseller" === lowerType) {
    url = "https://www.mobelaris.com/media/amasty/amlabel/Best-Seller.png"
  }

  if ("new" === lowerType) {
    url = "https://www.mobelaris.com/media/amasty/amlabel/NEW-LABEL.png"
  }

  if (url) {
    return (
      <img
        className="animatecss animatecss-fadeIn"
        src={url}
        width={115}
        height={115}
      />
    )
  }
  return null
}
export default ProductLable
