import Head from "next/head"

import { CommentIcon, LikeIcon, ShareIcon } from "@components/icons"
import Layout from "@components/layout"
import { ProjectActionNavbar, ProjectFileNavBar } from "@components/navbars"
import Editor from "@components/presentation/editor/editor"
import { getProject } from "@utils/shiitake-client"

export const ProjectPage = (props) => {
  const { metaData, projectData, id } = props
  return (
    <>
      <Head>
        <title>{metaData.title}</title>
      </Head>
      <Layout>
        <div className="my-4 p-2">
          <h2 className="font-raleway text-3xl">{metaData.title}</h2>
          <p className="font-playfair text-primary-400">By {metaData.author}</p>
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
        <div className="my-2 grid grid-cols-3">
          <ProjectFileNavBar />
        </div>
        <hr></hr>
        <ProjectActionNavbar />
        <div className="my-6 flex w-full justify-center">
          <div className="w-1/2">
            <Editor project={projectData.folders[0].files[0].content} id={id} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProjectPage

export async function getServerSideProps(ctx) {
  const { id } = ctx.query
  const project = await getProject(id)
  if (project.project) {
    const {
      project: { metaData, projectData },
    } = project

    return {
      props: {
        metaData,
        projectData,
        id,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}
