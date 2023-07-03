import { projectUpdateActions } from "@interface/global"
import { createProject, updateProject } from "@utils/shiitake-client"
import prisma from "lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // Create a project with POST Method
    case "POST":
      const { title, description, authorId, author } = req.body
      try {
        const project = await prisma.project.create({
          data: {
            name: title,
            userId: authorId,
          },
        })
        const projectId = await createProject(project.id, title, description, author, authorId)
        res.status(200).json({ success: true, projectId })
      } catch (e) {
        res.status(400).json({ Error: e })
      }
      break
    case "PUT":
      const { projectId, project, folder, action } = req.body
      try {
        await updateProject(
          projectId,
          action || projectUpdateActions.writeFile,
          "index",
          folder || "presentation",
          project
        )
        res.status(200).json({ success: true, projectId })
      } catch (e) {
        res.status(400).json({ Error: e })
      }

  }
}
