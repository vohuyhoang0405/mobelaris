//requiring path and fs modules
import fs from "fs"
//joining path of directory

export default async function listAllProductHanles() {
  const path = "content/product/en/"
  //passsing directoryPath and callback function
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (err, files) {
      //handling error
      if (err) {
        reject("Unable to scan directory: " + err)
      }
      //listing all files using forEach
      resolve(files.map((file) => file.replace("_", "").replace(".json", "")))
    })
  })
}
export async function listAllHandles() {
  const path = "content/page/en/"
  //passsing directoryPath and callback function
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (err, files) {
      //handling error
      if (err) {
        reject("Unable to scan directory: " + err)
      }
      //listing all files using forEach
      resolve(files.map((file) => file.replace("_", "").replace(".json", "")))
    })
  })
}
