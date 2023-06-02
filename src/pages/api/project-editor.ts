import fs from "fs"
import path from "path"

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = req.body
  console.log("were here")
  try {
    const filePath = path.join("/Users/thomas/Desktop/MyceliumsResearch/Projects/test-project/presentation", "project.json")
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err)
        res.status(400).json({ message: "Error writing file" })
      } else {
        res.status(200).json({ message: "File saved successfully" })
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal server error" })
  }
}
