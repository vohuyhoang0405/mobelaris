import type { NextApiRequest, NextApiResponse } from "next"
import { translateAndSave } from "../translation"

type ResponseData = {
  resources?: any
  error?: string
}
export default async function transhandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Check for secret to confirm this is a valid request
  try {
    const resources = req.body.resources
    const langCode = req.body.langCode
    const result = await translateAndSave({ langCode, resources })
    res.status(200).json(result)
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ error: "Error revalidating" })
  }
}
