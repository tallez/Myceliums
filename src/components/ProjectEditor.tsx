import { useState } from "react"

enum ProjectElementTypes {
  plainText = "plainText",
  mainHeading = "headingMain",
  code = "code",
}

interface ProjectData {
  title: string
  element: ProjectElementProps[]
}

interface ProjectElementProps {
  id: string
  type: string
  content: string
}

export default function ProjectEditor(data: ProjectData) {
  const [projectData, setProjectData] = useState(data)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    const { value } = event.target
    setProjectData((prevData) => ({
      ...prevData,
      element: prevData.element.map((el) =>
        el.id === id ? { ...el, content: value } : el
      ),
    }))
  }

  const handleSubmit = async () => {
    await fetch("/api/project-editor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: projectData,
      }),
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <p>Presentation</p>
      {data.element.map((el) => (
        <ElementDisplay
          key={el.id}
          id={el.id}
          type={el.type}
          content={el.content}
          handleInputChange={handleInputChange}
        />
      ))}
      <div className="flex w-full flex-row justify-start">
        <div className="my-4 cursor-pointer" onClick={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

interface ElementDisplayProps {
  id: string
  type: string
  content: string
  handleInputChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void
}

const ElementDisplay = ({
  id,
  type,
  content,
  handleInputChange,
}: ElementDisplayProps) => {
  const handlechangeTextArea = (event) => {
    handleInputChange(event, id)
    event.target.style.height = "auto"
    event.target.style.height = event.target.scrollHeight + "px"
  }
  if (type === ProjectElementTypes.plainText) {
    return (
      <textarea
        className="overflow-none resize-none border border-none p-0 focus:border-none focus:outline-none"
        placeholder="Start typing..."
        defaultValue={content}
        onChange={(e) => handlechangeTextArea(e)}
      />
    )
  } else if (type === ProjectElementTypes.code) {
    return (
      <textarea
        className="overflow-none resize-none border border-none bg-black p-2 text-white focus:border-none focus:outline-none"
        placeholder="Start typing..."
        defaultValue={content}
        onChange={(e) => handlechangeTextArea(e)}
      />
    )
  } else if (type === ProjectElementTypes.mainHeading) {
    return (
      <input
        className="border border-none text-xl font-bold focus:border-none focus:outline-none"
        placeholder="Title ..."
        defaultValue={content}
        onChange={(e) => handleInputChange(e, id)}
      />
    )
  }
}
