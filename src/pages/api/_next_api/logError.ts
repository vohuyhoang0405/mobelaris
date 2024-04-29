import fs, { existsSync } from "fs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const body = req.body
  console.log({
    body,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
  })

  new Promise((res, rej) => {
    const rootpath = "log/"
    if (!existsSync(rootpath)) {
      fs.mkdirSync(rootpath)
    }
    const path = rootpath + Date.now() + ".txt"
    fs.stat(path, async function (err, stat) {
      if (err == null) {
        // console.log("File exists: " + path)
      } else if (err.code === "ENOENT") {
        // file does not exist

        var stream = fs.createWriteStream(path)
        stream.once("open", function (fd) {
          stream.write(JSON.stringify(body, null, 2))
          stream.end()
        })
        console.log("New file: " + path)
      } else {
        console.log("Some other error: ", err.code)
      }
    })
  })
  return res.status(20).json({})
}
