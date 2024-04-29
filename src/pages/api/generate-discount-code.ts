import { MEDUSA_BACKEND_URL } from "@lib/config"
import type { NextApiRequest, NextApiResponse } from "next"

const generateDiscountCode = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    email: string
    result: any
  }>
) => {
  const body = req.body
  const email = body.email
  const reg = body.reg
  const countryCode = body.countryCode
  try {
    let url =
      MEDUSA_BACKEND_URL +
      "/generate-discount-code?email=" +
      email +
      "&&reg=" +
      reg +
      "&&countryCode=" +
      countryCode

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reg,
        countryCode,
      }),
    }).then((res) => {
      return res.json()
    })
    res.status(200).json({ email, result })
  } catch (error) {
    res.status(500).json({ error: "1" })
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  generateDiscountCode(req, res)
}
