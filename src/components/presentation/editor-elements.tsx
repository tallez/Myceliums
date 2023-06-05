import React, { useRef } from "react"
import { Dispatch, SetStateAction } from "react"
import { projectElementTypes, projectProps } from "../../interface/global"

export const availableElements = [
  {
    title: "Heading",
    type: projectElementTypes.heading,
  },
  { title: "Subheading", type: projectElementTypes.subheading },
  { title: "Paragraph", type: projectElementTypes.paragraph },
]

export const HeadingEditor = ({
  index,
  project,
  setProject,
}: {
  index: number
  project: projectProps
  setProject: Dispatch<SetStateAction<projectProps>>
}) => {
  const textareaRef = useRef(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    textarea.style.height = "auto" // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px` // Set the height to the scroll height
  }

  const handleChange = (e) => {
    const updatedContent = [...project.content]
    updatedContent[index].content = e.target.value
    setProject({ ...project, content: updatedContent })
    adjustTextareaHeight()
  }

  return (
    <textarea
      ref={textareaRef}
      onChange={(e) => handleChange(e)}
      defaultValue={project.content[index].content || "Title ..."}
      className="h-10 resize-none border-none font-raleway text-2xl font-bold text-primary-500 focus:ring-transparent "
    />
  )
}

export const SubHeadingEditor = ({
  index,
  project,
  setProject,
}: {
  index: number
  project: projectProps
  setProject: Dispatch<SetStateAction<projectProps>>
}) => {
  const textareaRef = useRef(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    textarea.style.height = "auto" // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px` // Set the height to the scroll height
  }

  const handleChange = (e) => {
    const updatedContent = [...project.content]
    updatedContent[index].content = e.target.value
    setProject({ ...project, content: updatedContent })
    adjustTextareaHeight()
  }

  return (
    <textarea
      ref={textareaRef}
      onChange={(e) => handleChange(e)}
      defaultValue={project.content[index].content || "Subheading ..."}
      className="h-10 resize-none border-none font-raleway text-xl focus:ring-transparent"
    />
  )
}

export const ParagraphEditor = ({
  index,
  project,
  setProject,
}: {
  index: number
  project: projectProps
  setProject: Dispatch<SetStateAction<projectProps>>
}) => {
  const textareaRef = useRef(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    textarea.style.height = "auto" // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px` // Set the height to the scroll height
  }

  const handleChange = (e) => {
    const updatedContent = [...project.content]
    updatedContent[index].content = e.target.value
    setProject({ ...project, content: updatedContent })
    adjustTextareaHeight()
  }

  return (
    <textarea
      ref={textareaRef}
      onChange={(e) => handleChange(e)}
      defaultValue={project.content[index].content || "Paragraph ..."}
      className="h-10 resize-none border-none font-playfair text-lg font-bold focus:ring-transparent"
    />
  )
}
