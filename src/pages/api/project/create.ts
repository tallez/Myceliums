import prisma from "lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const newProject = await prisma.project.create({
          data: {
            name: req.body.title,
            userId: req.body.authorId,
          },
        })
        try {
          await fetch(
            `${process.env.FILEMANAGER_PUBLIC_EXTERNAL}:${process.env.FILEMANAGER_PORT}/folder`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                action: "createBase",
                folderName: newProject.id,
                projecIdt: newProject.id,
              }),
            }
          )
        } catch (err) {
          console.log(err)
        }
        try {
          await fetch(
            `${process.env.FILEMANAGER_PUBLIC_EXTERNAL}:${process.env.FILEMANAGER_PORT}/file`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                action: "createMetaData",
                folderName: newProject.id,
                fileName: "metaData.json",
                projectId: newProject.id,
                content: req.body,
              }),
            }
          )
        } catch (err) {
          console.log(err)
        }
        await fetch(
          `${process.env.FILEMANAGER_PUBLIC_EXTERNAL}:${process.env.FILEMANAGER_PORT}/folder`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              action: "create",
              folderName: "presentation",
              projectId: newProject.id,
            }),
          }
        )

        await fetch(
          `${process.env.FILEMANAGER_PUBLIC_EXTERNAL}:${process.env.FILEMANAGER_PORT}/file`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              action: "create",
              folderName: "presentation",
              fileName: "project.json",
              projectId: newProject.id,
              content: newEmptyProject(
                req.body.title,
                req.body.description,
                req.body.author
              ),
            }),
          }
        )

        res
          .status(200)
          .json({
            success: true,
            projectId: newProject.id,
            message: `Project ${newProject.id} created`,
          })

        break // Add break statement here
      } catch (e) {
        console.log(e)
        res.status(500).json(e)
        break // Add break statement here
      }
    default:
      res.status(400).json("Invalid action")
  }
}

const newEmptyProject = (title, description, author) => {
  return {
    title: title,
    description: description,
    author,
    likes: [],
    comments: [],
    elements: [
      { id: "1", type: "heading", content: title },
      {
        id: "2",
        type: "paragraph",
        content: description,
      },
    ],
  }
}
