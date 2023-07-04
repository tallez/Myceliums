import { Dispatch, SetStateAction, useEffect, useRef } from "react"

import { projectElementProps } from "@interface/global"

export const ParagraphEditor = ({
  index,
  project,
  setProject,
}: {
  index: number
  project: projectElementProps[]
  setProject: Dispatch<SetStateAction<projectElementProps[]>>
}) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    adjustTextareaHeight()
  }, [])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    textarea.style.height = "auto" // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px` // Set the height to the scroll height
  }

  const handleChange = (e) => {
    const updatedContent = project
    updatedContent[index].content = e.target.value
    console.log(updatedContent)
    setProject(updatedContent)
    adjustTextareaHeight()
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete ?")) {
      const updatedContent = [...project]
      updatedContent.splice(index, 1)
      setProject(updatedContent)
    }
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        onChange={(e) => handleChange(e)}
        defaultValue={project[index].content || "Paragraph ..."}
        className="h-10 w-full resize-none overflow-hidden border-none font-playfair text-lg focus:ring-transparent"
      />
      <svg
        onClick={() => handleDelete()}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`absolute top-0 right-0 h-4 w-4 rotate-45 cursor-pointer text-gray-400 text-error-700 transition-all duration-150 hover:text-error-200`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  )
}
