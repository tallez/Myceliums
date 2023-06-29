import Image from "next/image"

import { WarnIcon } from "@components/icons"
import {
  projectElementProps,
  projectElementTypes,
  projectProps,
} from "@interface/global"

export default function Viewer({ project }: { project: projectProps }) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
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
