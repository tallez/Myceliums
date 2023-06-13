import Image from "next/legacy/image"

import { WarnIcon } from "@components/icons"

interface projectProps {
  title: string
  description: string
  content: projectElementProps[]
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
  content: [
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
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      {project.content.map((projectElement, i) => {
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
      <p className="mb-4 font-raleway text-xl font-bold text-primary-500">
        {projectElement.content}
      </p>
    )
  } else if (projectElement.type === projectElementTypes.subheading) {
    return <p className="mb-2 font-raleway text-lg">{projectElement.content}</p>
  } else if (projectElement.type === projectElementTypes.paragraph) {
    return <p className="font-playfair">{projectElement.content}</p>
  } else if (projectElement.type === projectElementTypes.image) {
    if (projectElement.alt && projectElement.source) {
      return (
        <div className="relative my-4 h-56 w-full">
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
        <div className="relative my-4 flex h-12 w-full items-center justify-center space-x-2 rounded-lg bg-error-950 font-playfair text-error-400">
          <WarnIcon /> <p>Image display error : There is no alt or no source</p>
        </div>
      )
    }
  } else if (projectElement.type === projectElementTypes.tip) {
    return (
      <p className="rounded-lg bg-primary-900 p-2 font-playfair italic">
        <strong>Tips : </strong>
        {projectElement.content}
      </p>
    )
  }
}
