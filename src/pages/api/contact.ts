import { verifyCaptcha } from "@lib/recapcha/verifyCaptcha"
import type { NextApiRequest, NextApiResponse } from "next"
import Mailjet from "node-mailjet"
let SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
let SENDGRID_EMAIL = process.env.SENDGRID_EMAIL
type ResponseData = {
  error?: string
  email?: string
  result?: any
}
const sendMailjetContact = async (req: NextApiRequest) => {
  const { body = {} } = req
  let text = ""

  for (const property in body) {
    text += `${property}: ${body[property]} ` + "\n"
  }
  if (text.toLowerCase().includes("per month")) return
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE,
  })
  const emailFrom = process.env.MJ_EMAIL_FROM
  const emailTo = process.env.MJ_EMAIL_TO
  const messages = [
    {
      From: {
        Email: emailFrom,
        Name: emailFrom,
      },
      To: [
        {
          Email: emailTo,
          Name: emailTo,
        },
      ],
      Subject: "Contact From",
      TextPart: text,
    },
  ]
  mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: messages,
    })
    .then((result) => {
      console.log("mailjet", messages, result.body)
    })
    .catch((err) => {
      console.error("mailjet", err.statusCode)
    })
}
const sendgridContact = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const body = req.body
  const name = body.name
  const email = body.email
  const subject = body.subject || "Contact Form Submission"
  const { to, form_type, utf8, ...rest } = body
  let text = ""
  // if (body.toLowerCase().includes('per month')) return;
  const requiredField = ["name", "email", "phone", "body"]
  if (requiredField.some((field) => !body[field])) {
    return res.status(400).json({ error: "Missing required fields" })
  }
  for (const property in rest) {
    text += `<li>${property.toUpperCase()}: ${body[property]}</li>`
  }
  console.log("/contact", { body, name, email, subject, to, SENDGRID_EMAIL })
  try {
    const sendgridbody = {
      personalizations: [
        {
          to: [
            {
              email: email,
              name: name,
            },
          ],
          subject: subject,
          bcc: [
            {
              email: SENDGRID_EMAIL,
              name: "Mobelaris Customer Support",
            },
          ],
        },
      ],
      content: [
        {
          type: "text/html",
          value:
            "<p>Thank you for contacting us. We will get back to you as soon as possible.</p>" +
            "<ul>" +
            text +
            "</ul>",
        },
      ],
      from: {
        email: "no-reply@mobelaris.com",
        name: "MOBELARIS",
      },
      replyTo: {
        email: SENDGRID_EMAIL,
        name: "MOBELARIS",
      },
      reply_to: {
        email: SENDGRID_EMAIL,
        name: "MOBELARIS",
      },
    }
    const result = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendgridbody),
    }).then((res) => {
      return res.text()
    })
    console.log("sendgrid", JSON.stringify({ sendgridbody, result }, null, 2))
    if (to) {
      res.redirect(302, to)
    } else {
      res.status(200).json({ email, result })
    }
  } catch (error) {
    console.error("sendgrid", error)
    if (to) {
      res.redirect(302, to)
    } else {
      res.status(200).json({ email, result, error })
    }
  }
}
const sendgridContactToSale = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const body = req.body
  const name = body.name
  const email = body.email
  const subject = body.subject || "Contact Form Submission"
  // if (body.toLowerCase().includes('per month')) return;
  const { to, form_type, utf8, ...rest } = body
  let text = ""
  for (const property in rest) {
    text += `<li>${property.toUpperCase()}: ${body[property]}</li>`
  }
  console.log("/contact", { body, name, email, subject, to, SENDGRID_EMAIL })
  try {
    const sendgridbody = {
      personalizations: [
        {
          to: [
            {
              email: SENDGRID_EMAIL,
              name: "MOBELARIS",
            },
          ],
          subject: subject,
        },
      ],
      content: [
        {
          type: "text/html",
          value: "<p>Contact Form Submission</p>" + "<ul>" + text + "</ul>",
        },
      ],
      from: {
        email: "no-reply@mobelaris.com",
        name: "MOBELARIS",
      },
      replyTo: {
        email: SENDGRID_EMAIL,
        name: "MOBELARIS",
      },
      reply_to: {
        email: SENDGRID_EMAIL,
        name: "MOBELARIS",
      },
    }
    const result = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendgridbody),
    }).then((res) => {
      return res.text()
    })
    console.log(
      "sendgridContactToSale",
      JSON.stringify({ sendgridbody, result }, null, 2)
    )
  } catch (error) {
    console.error("sendgridContactToSale", error)
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const verifyCaptchaObject = await verifyCaptcha(
    req.body["g-recaptcha-response"]
  )
  if (!verifyCaptchaObject.success) {
    return res.status(400).json({ error: "Failed Captcha" })
  }
  const body = req.body
  const requiredField = ["name", "email", "phone", "body"]
  if (requiredField.some((field) => !body[field])) {
    return res.status(400).json({ error: "Missing required fields" })
  }
  sendMailjetContact(req)
  sendgridContactToSale(req, res)
  return sendgridContact(req, res)
}
