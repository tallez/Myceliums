import Head from "next/head"
import { CommentIcon, LikeIcon, ShareIcon } from "@components/icons"
import Layout from "@components/layout"
import { ProjectActionNavbar, ProjectFileNavBar } from "@components/navbars"
import Editor from "@components/presentation/editor/editor"
import { getProject } from "@utils/shiitake-client"
import { createContext, useEffect, useState } from "react"
import { projectElementProps } from "@interface/global"

export interface ProjectContextProps {
  id: string
  metaData: any // Replace with the appropriate type
  projectData: any // Replace with the appropriate type
  folderName: string | null
  folders: any[] // Replace with the appropriate type
  currProject: any
  setCurrProject: any
  activeFolder: any
}

export const ProjectContext = createContext<ProjectContextProps>({
  id: "",
  metaData: null,
  projectData: null,
  folderName: null,
  folders: [],
  currProject: null,
  setCurrProject: null,
  activeFolder: null,
})

export const ProjectPage = (props) => {
  const { metaData, projectData, id, folderName } = props
  const [currProject, setCurrProject] =
    useState<projectElementProps[]>(projectData)

  const folders = projectData.folders.map((fol) => {
    if (folderName && fol.name === folderName) {
      return { title: fol.name, active: true }
    } else if (!folderName && fol.name === "presentation") {
      return { title: "presentation", active: true }
    } else {
      return { title: fol.name, active: false }
    }
  })

  const activeFolder = projectData.folders.filter((fol) => {
    if (folderName && fol.name === folderName) {
      return fol
    } else if (!folderName && fol.name === "presentation") {
      return fol
    }
  })

  return (
    <>
      <Head>
        <title>{metaData.title}</title>
      </Head>
      <Layout>
        <ProjectContext.Provider
          value={{
            id,
            metaData,
            projectData,
            folderName,
            folders,
            currProject,
            setCurrProject,
            activeFolder,
          }}
        >
          <div className="my-4 p-2">
            <h2 className="font-raleway text-3xl">{metaData.title}</h2>
            <p className="font-playfair text-primary-400">
              By {metaData.author}
            </p>
            <div className="my-2 flex flex-row items-center space-x-4 text-gray-600">
              <div className="flex cursor-pointer flex-row items-center hover:text-secondary-400">
                <LikeIcon />
                <p className="pl-2 font-playfair">{metaData.likes.length}</p>
              </div>
              <div className="flex cursor-pointer flex-row items-center hover:text-secondary-400">
                <CommentIcon />
                <p className="pl-2 font-playfair">{metaData.comments.length}</p>
              </div>
              <div className="flex cursor-pointer flex-row items-center hover:text-secondary-400">
                <ShareIcon />
              </div>
            </div>
          </div>
          <h2 className="px-2 font-playfair text-2xl">Sections</h2>
          <div className="mb-4 grid grid-cols-3">
            <ProjectFileNavBar menuItems={folders} />
          </div>
          <hr></hr>
          <ProjectActionNavbar />
          <div className="my-6 flex w-full justify-center">
            <div className="w-1/2">
              <Editor project={activeFolder[0].files[0].content} id={id} />
            </div>
          </div>
        </ProjectContext.Provider>
      </Layout>
    </>
  )
}

export default ProjectPage

export async function getServerSideProps(ctx) {
  const { id, folder } = ctx.query

  const folderName = folder ? folder : null

  const project = await getProject(id)
  if (project.project) {
    const {
      project: { metaData, projectData },
    } = project

    return {
      props: {
        metaData,
        projectData,
        folderName,
        id,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}
