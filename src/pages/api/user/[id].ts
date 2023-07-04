import { NextApiRequest, NextApiResponse } from "next"

import prisma from "lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { id } = req.query
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: id as string, // Assuming confirmId is accessible here
          },
        })
        res.status(200).json(user?.emailVerified || false)
      } catch (e) {
        res.status(500).json(e)
      }
  }
}
