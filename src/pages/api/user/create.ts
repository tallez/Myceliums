import { NextApiRequest, NextApiResponse } from "next"

import prisma from "lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      var { username, email, password } = req.body
      try {
        let existingUser = await prisma.user.findUnique({
          where: {
            email: email
          }
        })
        if (existingUser) {
          res.status(200).json({ message: "User email found", result: "email" })
        } else {
          existingUser = await prisma.user.findUnique({
            where: {
              name: username
            }
          })
          if (existingUser) {
            res.status(200).json({ message: "User name found", result: "username" })
          } else {
            res.status(200).json({ message: "No user", result: "clear" })
          }
        }
      } catch (e) {
        res.status(200).json({ message: "Credentials incomplete", result: "clear" })
      }
      break;
    case "PUT":
      var { username, email, password } = req.body
      try {
        const newUser = await prisma.user.create({
          data: {
            name: username,
            email: email,
            password: password,
          },
        })
        res.status(200).json({ success: true, id: newUser.id })
      } catch (e) {
        res.status(400).json({ success: false, error: e })
      }
  }
}
