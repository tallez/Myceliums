import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      fs.readdir(
        "/Users/thomas/Desktop/MyceliumsResearch/Projects/test-project",
        { withFileTypes: true },
        (error, files) => {
          if (error) {
            res.status(400).json({ success: false, data: error })
          } else {
            let folders = files.filter((file) => file.isDirectory())
            folders = folders.filter((file) => file.name !== ".git")
            res.status(200).json({ success: true, folders: folders })
          }
        }
      )
      break
    case "POST":
      const { folderName } = req.body
      try {
        fs.mkdir(
          `/Users/thomas/Desktop/MyceliumsResearch/Projects/test-project/${folderName}`,
          (err) => {
            console.log(err)
          }
        )
        res.status(200).json({ success: true })
      } catch (e) {
        res.status(400).json({ success: false })
      }
      break
  }
}
