import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { projectElementProps, projectElementTypes } from "@interface/global"

import { AddElement } from "./elements/add"
import { ParagraphEditor } from "./elements/paragraph"
import { SaveButton } from "./elements/save"
import { SubHeadingEditor } from "./elements/subtitle"
import { HeadingEditor } from "./elements/title"

export default function Editor({
  project,
  id,
}: {
  project?: projectElementProps[]
  id: string
}) {
  const [currProject, setCurrProject] = useState<projectElementProps[]>(project)

  useEffect(() => {
    setCurrProject(project)
  }, [project])

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 p-4">
      <hr className="my-4"></hr>
      {currProject.map((projectElement, i) => {
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
        {" "}
        <SaveButton project={currProject} projectId={id} />
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
  project: projectElementProps[]
  setProject: Dispatch<SetStateAction<projectElementProps[]>>
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
