import { DefaultActiveButton } from "@components/buttons"
import { projectElementProps, projectUpdateActions } from "@interface/global"
import { updateProject } from "@utils/shiitake-client"

export const SaveButton = ({
  projectId,
  project,
}: {
  projectId: string
  project: projectElementProps[]
}) => {
  const handleClick = async () => {
    await fetch("/api/project", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        project,
      }),
    })
  }

  return (
    <div onClick={handleClick}>
      <DefaultActiveButton label="Save" />
    </div>
  )
}
