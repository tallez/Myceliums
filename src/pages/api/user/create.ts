import { NextApiRequest, NextApiResponse } from "next"

import prisma from "lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { name, email, password } = req.body
      try {
        await prisma.user.create({
          data: {
            name: name,
            email: email,
            password: password,
          },
        })
        res.status(200).json({ success: true })
      } catch (e) {
        res.status(400).json({ success: false, error: e })
      }
  }
}
