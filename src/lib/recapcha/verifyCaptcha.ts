import axios from "axios"
type CaptchaResponseData = {
  success: boolean
  challenge_ts: string // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string // the hostname of the site where the reCAPTCHA was solved
  "error-codes": any[] // optional
}
type CaptchaResponse = {
  data: CaptchaResponseData
}
export async function verifyCaptcha(
  token: string | null
): Promise<CaptchaResponseData> {
  let verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  const res = (await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  )) as CaptchaResponse
  return res.data
}
