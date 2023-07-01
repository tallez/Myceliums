import Head from "next/head"

import { CommentIcon, LikeIcon, ShareIcon } from "@components/icons"
import Layout from "@components/layout"
import { ProjectActionNavbar, ProjectFileNavBar } from "@components/navbars"
import Editor from "@components/presentation/editor/editor"

export const ProjectPage = (props) => {
  const { metaData, projectData } = props
  return (
    <>
      <Head>
        <title>{projectData.title}</title>
      </Head>
      <Layout>
        <div className="my-4 p-2">
          <h2 className="font-raleway text-3xl">{projectData.title}</h2>
          <p className="font-playfair text-primary-400">By {metaData.author}</p>
          <div className="my-2 flex flex-row items-center space-x-4 text-gray-600">
            <div className="flex cursor-pointer flex-row items-center hover:text-secondary-400">
              <LikeIcon />
              <p className="pl-2 font-playfair">{projectData.likes.length}</p>
            </div>
            <div className="flex cursor-pointer flex-row items-center hover:text-secondary-400">
              <CommentIcon />
              <p className="pl-2 font-playfair">
                {projectData.comments.length}
              </p>
            </div>
            <div className="flex cursor-pointer flex-row items-center hover:text-secondary-400">
              <ShareIcon />
            </div>
          </div>
        </div>
        <div className="my-2 grid grid-cols-3">
          <ProjectFileNavBar />
        </div>
        <hr></hr>
        <ProjectActionNavbar />
        <div className="my-6 flex w-full justify-center">
          <div className="w-1/2">
            <Editor project={projectData} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProjectPage

export async function getServerSideProps(ctx) {
  const { id } = ctx.query
  const project = await fetch(
    `${process.env.FILEMANAGER_PUBLIC_EXTERNAL}:${process.env.FILEMANAGER_PORT}/project/${id}`
  ).then((res) => res.json())

  if (project.project) {
    const {
      project: { metaData, projectData },
    } = project

    return {
      props: {
        metaData,
        projectData,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}
