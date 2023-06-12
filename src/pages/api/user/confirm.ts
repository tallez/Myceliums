import { NextApiRequest, NextApiResponse } from "next"

import { sendEmail } from "@utils/send-mail"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { to, subject, text, html } = req.body
      try {
        await sendEmail(to, subject, text, html)
        res.status(200).json("Email sent")
      } catch (e) {
        res.status(500).json(e)
      }
  }
}
