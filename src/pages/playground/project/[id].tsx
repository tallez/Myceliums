import { CommentIcon, LikeIcon, ShareIcon } from "@components/icons"
import Layout from "@components/layout"
import { ProjectActionNavbar, ProjectFileNavBar } from "@components/navbars"
import Viewer from "@components/presentation/viewer"

export const ProjectPage = () => {
  return (
    <>
      <Layout>
        <div className="my-4 p-2">
          <h2 className="font-raleway text-3xl">Project Title</h2>
          <p className="font-playfair text-primary-400">By Champi 122</p>
          <div className="my-2 flex flex-row items-center space-x-4 text-gray-600">
            <div className="flex cursor-pointer flex-row items-center hover:text-secondary-400">
              <LikeIcon />
              <p className="pl-2 font-playfair">1201</p>
            </div>
            <div className="flex cursor-pointer flex-row items-center hover:text-secondary-400">
              <CommentIcon />
              <p className="pl-2 font-playfair">60</p>
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
            <Viewer />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProjectPage
