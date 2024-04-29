import fs from "fs"
import https from "https"
import data from "./settings_data.json" assert { type: "json" }
import schema from "./settings_schema.json" assert { type: "json" }
let assetspath = "./assets/images"
let shopifyFilepath = "https://cdn.shopify.com/s/files/1/0648/7883/8019/files/"

async function getImages({ assetspath, assetUrls = [] }) {
  console.log(assetspath, assetUrls)
  if (!fs.existsSync(assetspath)) {
    fs.mkdirSync(assetspath, { recursive: true })
  }
  // Define an array of image URLs
  const imageUrls = assetUrls

  // Loop through the image URLs and download each image
  imageUrls.forEach((url, index) => {
    https.get(url.replace("http:", "https:"), (response) => {
      const filename = url.split("/").reverse()[0].split("?")[0]
      console.log({ filename })
      response.pipe(fs.createWriteStream(`${assetspath}/${filename}`))
    })
  })
}

function flattenObject(ob) {
  var toReturn = {}

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue

    if (typeof ob[i] == "object" && ob[i] !== null) {
      if (ob[i].length) {
        ob[i].arr_length = ob[i].length
      }
      var flatObject = flattenObject(ob[i])
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        toReturn[i + "." + x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}
let entites = flattenObject({ data, schema })
let assets = Object.values(entites)
  .filter((text) => typeof text === "string" && text?.includes("/images/"))
  .map((text) => text.replace("/images/", shopifyFilepath))
getImages({
  assetspath,
  assetUrls: assets,
})
