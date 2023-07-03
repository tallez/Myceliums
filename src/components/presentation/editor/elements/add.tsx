import { Dispatch, SetStateAction, useState } from "react"

import {
  projectElementProps,
  projectElementTypes,
  projectProps,
} from "@interface/global"

const availableElements = [
  {
    title: "Heading",
    type: projectElementTypes.heading,
  },
  { title: "Subheading", type: projectElementTypes.subheading },
  { title: "Paragraph", type: projectElementTypes.paragraph },
]

export const AddElement = ({
  project,
  setProject,
}: {
  project: projectElementProps[]
  setProject: Dispatch<SetStateAction<projectElementProps[]>>
}) => {
  const [isActive, setIsActive] = useState(false)

  const handleChoice = (type: projectElementTypes) => {
    const newElement = {
      id: project.length.toString(),
      type: type,
      content: "",
    }
    const newContent = [...project, newElement]
    setProject(newContent)
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
