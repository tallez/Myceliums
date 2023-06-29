import { Dispatch, SetStateAction, useState } from "react"
import {
  projectElementProps,
  projectElementTypes,
  projectProps,
} from "@interface/global"
import { HeadingEditor } from "./elements/title"
import { SubHeadingEditor } from "./elements/subtitle"
import { ParagraphEditor } from "./elements/paragraph"
import { AddElement } from "./elements/add"
import { SaveButton } from "./elements/save"

const emptyProject = {
  title: "",
  elements: [],
  author: "",
}

export default function Editor({
  project = emptyProject,
}: {
  project?: projectProps
}) {
  const [currProject, setCurrProject] = useState<projectProps>(project)

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 p-4">
      <div className="flex flex-col px-4 font-playfair italic">
        <p>{currProject.title}</p>
        <p>Tag(s)</p>
        <p>{currProject.author}</p>
      </div>
      <hr className="my-4"></hr>
      {currProject.elements.map((projectElement, i) => {
        return (
          <ProjectElement
            key={i}
            setProject={setCurrProject}
            project={currProject}
            projectElement={projectElement}
            index={i}
          />
        )
      })}
      <AddElement setProject={setCurrProject} project={currProject} />
      <div className="flex w-full justify-end">
        <SaveButton project={project} />
      </div>
    </div>
  )
}

const ProjectElement = ({
  projectElement,
  index,
  project,
  setProject,
}: {
  projectElement: projectElementProps
  index: number
  project: projectProps
  setProject: Dispatch<SetStateAction<projectProps>>
}) => {
  if (projectElement.type === projectElementTypes.heading) {
    return (
      <HeadingEditor setProject={setProject} project={project} index={index} />
    )
  } else if (projectElement.type === projectElementTypes.subheading) {
    return (
      <SubHeadingEditor
        setProject={setProject}
        project={project}
        index={index}
      />
    )
  } else if (projectElement.type === projectElementTypes.paragraph) {
    return (
      <ParagraphEditor
        setProject={setProject}
        project={project}
        index={index}
      />
    )
  }
}
