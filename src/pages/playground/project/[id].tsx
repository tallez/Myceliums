import Link from "next/link"

import jsonData from "/Users/thomas/Desktop/MyceliumsResearch/Projects/test-project/presentation/project.json"

import ProjectEditorTool from "@components/ProjectEditor"

const addFolder = async () => {
  await fetch("/api/filemanagement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      folderName: "patate",
    }),
  })
  window.location.reload()
}

export const ProjectPage = (props) => {
  const { id, data, folders } = props
  return (
    <div className="h-screen w-screen p-4">
      <div className="h-full w-full border p-2">
        <Link href={"/project"}>
          <p className="text-gray-400 hover:underline">Return to projects</p>
        </Link>
        <h1 className="text-3xl font-bold">{id}</h1>
        <div className="mt-10 flex w-full flex-row items-center justify-between ">
          <div className="flex flex-row items-center justify-center">
            {folders.map((folder) => {
              return <h2 className="p-2">{folder.name}</h2>
            })}
            <div className="my-4 cursor-pointer" onClick={addFolder}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="p-2">Download</h2>
          </div>
        </div>
        <hr></hr>
        <div className="mt-10 flex w-full flex-row items-center justify-between ">
          <div className="flex flex-row">
            <p>{"  "}</p>
            <h2 className="p-2">Current</h2>
            <h2 className="p-2">Issues</h2>
            <h2 className="relative p-2">
              PR
              <p className="absolute right-0 top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-xs">
                1
              </p>
            </h2>
          </div>
          <div>
            <h2 className="p-2">Make Proposal</h2>
          </div>
        </div>
        <hr></hr>
        <div className="p-2">
          <ProjectEditorTool {...data} />
        </div>
      </div>
    </div>
  )
}

export default ProjectPage

export async function getServerSideProps(ctx) {
  const { folders } = await fetch(
    "http://localhost:3000/api/filemanagement"
  ).then((res) => res.json())
  const { id } = ctx.query
  return {
    props: {
      id: id,
      data: jsonData,
      folders: folders,
    },
  }
}
