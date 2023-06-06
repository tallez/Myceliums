import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"

const makeFile = async (filePath: string) => {
  try {
    await fs.promises.writeFile(filePath, '')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const deleteFile = async (filePath: string) => {
  try {
    await fs.promises.unlink(filePath)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const deleteFolder = async (folderPath: string) => {
  try {
    await fs.promises.rm(folderPath, { recursive: true })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      fs.readdir(
        `${process.env.FILE_SYSTEM_PATH}/test-project`,
        { withFileTypes: true },
        (error, files) => {
          if (error) {
            res.status(400).json({ success: false, data: error })
          } else {
            let folders = files.filter((file) => file.isDirectory())
            folders = folders.filter((folder) => folder.name !== ".git")
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
    case "PUT":
      const { fileName, fileContent } = req.body
      try {
        const filePath = `/Users/thomas/Desktop/MyceliumsResearch/Projects/test-project/${fileName}`
        const success = await makeFile(filePath)
        if (success) {
          await fs.promises.writeFile(filePath, fileContent)
          res.status(200).json({ success: true })
        } else {
          res.status(400).json({ success: false })
        }
      } catch (error) {
        console.error(error)
        res.status(400).json({ success: false })
      }
      break
    case "DELETE":
      const { filePath } = req.body
      try {
        const isDirectory = (await fs.promises.lstat(filePath)).isDirectory()
        if (isDirectory) {
          const success = await deleteFolder(filePath)
          if (success) {
            res.status(200).json({ success: true })
          } else {
            res.status(400).json({ success: false })
          }
        } else {
          const success = await deleteFile(filePath)
          if (success) {
            res.status(200).json({ success: true })
          } else {
            res.status(400).json({ success: false })
          }
        }
      } catch (error) {
        console.error(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false, data: "Invalid method" })
      break
  }
}

