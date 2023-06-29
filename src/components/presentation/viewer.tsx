import Image from "next/image"

import { WarnIcon } from "@components/icons"

interface projectProps {
  title: string
  description: string
  elements: projectElementProps[]
}

interface projectElementProps {
  type: projectElementTypes
  content?: string
  alt?: string //if element type is an image, provide an alt props
  source?: string //if element type is image, provide a source
}

enum projectElementTypes {
  heading = "heading",
  subheading = "subheading",
  paragraph = "paragraph",
  image = "image",
  tip = "tips",
}

const exampleProject = {
  title: "Test Project",
  description: "this is a test project",
  elements: [
    {
      type: projectElementTypes.heading,
      content: "The Project",
    },
    {
      type: projectElementTypes.subheading,
      content: "Why this project ?",
    },
    {
      type: projectElementTypes.paragraph,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      type: projectElementTypes.image,
      source: "/logo-myceliums.png",
      alt: "Mushrooms",
    },
    {
      type: projectElementTypes.tip,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ],
}

export default function Viewer({
  project = exampleProject,
}: {
  project?: projectProps
}) {
  return (
    <div className="p-4 space-y-4 border border-gray-200 rounded-lg">
      {project.elements.map((projectElement, i) => {
        return <ProjectElement key={i} projectElement={projectElement} />
      })}
    </div>
  )
}

const ProjectElement = ({
  projectElement,
}: {
  projectElement: projectElementProps
}) => {
  if (projectElement.type === projectElementTypes.heading) {
    return (
      <p className="mb-4 text-xl font-bold font-raleway text-primary-500">
        {projectElement.content}
      </p>
    )
  } else if (projectElement.type === projectElementTypes.subheading) {
    return <p className="mb-2 text-lg font-raleway">{projectElement.content}</p>
  } else if (projectElement.type === projectElementTypes.paragraph) {
    return <p className="font-playfair">{projectElement.content}</p>
  } else if (projectElement.type === projectElementTypes.image) {
    if (projectElement.alt && projectElement.source) {
      return (
        <div className="relative w-full h-56 my-4">
          <Image
            className="rounded-lg"
            src={projectElement.source}
            alt={projectElement.alt}
            fill={true}
            style={{ objectFit: "cover" }}
          />{" "}
        </div>
      )
    } else {
      return (
        <div className="relative flex items-center justify-center w-full h-12 my-4 space-x-2 rounded-lg bg-error-950 font-playfair text-error-400">
          <WarnIcon /> <p>Image display error : There is no alt or no source</p>
        </div>
      )
    }
  } else if (projectElement.type === projectElementTypes.tip) {
    return (
      <p className="p-2 italic rounded-lg bg-primary-900 font-playfair">
        <strong>Tips : </strong>
        {projectElement.content}
      </p>
    )
  }
}
