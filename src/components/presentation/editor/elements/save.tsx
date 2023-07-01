import { DefaultActiveButton } from "@components/buttons"
import { projectProps } from "@interface/global"

export const SaveButton = ({ project }: { project: projectProps }) => {
  return (
    <div>
      <DefaultActiveButton label="Save" />
    </div>
  )
}
