import ProjectEditorTool from "@components/ProjectEditor"

import jsonData from "/Users/thomas/Desktop/Myceliums/public/project.json"

export const Playground = (props) => {
  const { data } = props
  return (
    <>
      <h1>Welcome to the playground</h1>
      <ProjectEditorTool {...data} />
    </>
  )
}

export default Playground

export async function getServerSideProps() {
  return {
    props: { data: jsonData },
  } // Access and work with the jsonData here
}
