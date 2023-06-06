import { Dispatch, SetStateAction, useState } from "react"
import {
  HeadingEditor,
  ParagraphEditor,
  SubHeadingEditor,
  availableElements,
} from "./editor-elements"
import {
  projectElementProps,
  projectElementTypes,
  projectProps,
} from "../../interface/global"
import { DefaultActiveButton } from "@components/buttons"

const emptyProject = {
  title: "",
  content: [],
}

export default function Editor({
  initProject = emptyProject,
}: {
  initProject?: projectProps
}) {
  const [project, setProject] = useState<projectProps>(initProject)

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 p-4">
      <div className="flex flex-col px-4 font-playfair italic">
        <p>Title</p>
        <p>Description</p>
        <p>Tag(s)</p>
        <p>Author(s)</p>
      </div>
      <hr className="my-4"></hr>
      {project.content.map((projectElement, i) => {
        return (
          <ProjectElement
            setProject={setProject}
            project={project}
            projectElement={projectElement}
            index={i}
          />
        )
      })}
      <AddElement setProject={setProject} project={project} />
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

const SaveButton = ({ project }: { project: projectProps }) => {
  return (
    <div onClick={() => console.log(project)}>
      <DefaultActiveButton label="Save" />
    </div>
  )
}

const AddElement = ({
  project,
  setProject,
}: {
  project: projectProps
  setProject: Dispatch<SetStateAction<projectProps>>
}) => {
  const [isActive, setIsActive] = useState(false)
  const handleChoice = (type: projectElementTypes) => {
    const newElement = {
      type: type,
      content: "",
    }
    const newContent = [...project.content, newElement]
    setProject({ ...project, content: newContent })
    setIsActive(false)
  }
  return (
    <div className="my-6 flex flex-row items-center justify-start space-x-2 px-2">
      <svg
        onClick={() => setIsActive(!isActive)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`h-6 w-6 cursor-pointer text-gray-400 transition-all duration-150 hover:text-primary-500 ${
          isActive ? "rotate-45 text-error-700" : null
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="flex flex-row">
        <div
          className={`flex flex-row space-x-2 transition-all duration-150 ${
            isActive ? "top-0 opacity-100" : "top-30 opacity-0"
          } `}
        >
          {availableElements.map((el, i) => {
            return (
              <p
                key={i}
                onClick={() => handleChoice(el.type)}
                className={`cursor-pointer text-gray-400 transition-all duration-150 hover:text-primary-100`}
              >
                {el.title}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
