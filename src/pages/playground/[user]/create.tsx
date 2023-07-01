import React, { useEffect, useState } from "react"

import { useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { HomeIcon } from "@components/icons"
import Layout from "@components/layout"
import { withAuth } from "@utils/nextauthwrapper"

function CreateProjectPage() {
  return (
    <Layout>
      <Head>
        <title>Projects</title>
      </Head>
      <CreateProjectFrame />
    </Layout>
  )
}

const CreateProjectFrame = () => {
  const session = useSession()
  const router = useRouter()
  const [error, setError] = useState<boolean | string>()
  const [metaData, setMetaData] = useState({})

  const handleChange = (e) => {
    setError(false)
    const { name, value } = e.target
    setMetaData({ ...metaData, [name]: value })
  }

  useEffect(() => {
    setMetaData({
      ...metaData,
      author: session && session.data.user.name,
      //@ts-ignore
      authorId: session && session.data.user.id,
    })
  }, [session])

  const createProject = async () => {
    if (!metaData["title"]) {
      setError("Project needs a title")
    } else if (!metaData["description"]) {
      setError("Project needs a description")
    } else {
      try {
        const projectCreation = await fetch("/api/project/create", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            //@ts-ignore
            title: metaData.title,
            //@ts-ignore
            description: metaData.description,
            //@ts-ignore
            author: metaData.author,
            //@ts-ignore
            authorId: metaData.authorId,
          }),
        }).then((res) => res.json())

        if (projectCreation.success) {
          router.push({
            pathname: "/playground/project/[id]",
            /* @ts-ignore no idea where to update the session type */
            query: { id: projectCreation.projectId },
          })
        } else {
          setError("There was an error creating the project")
        }
      } catch (err) {
        setError("There was an error creating the project")
      }
    }
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-1/2">
        <Link
          passHref
          href={{
            pathname: "/playground/[user]",
            /* @ts-ignore no idea where to update the session type */
            query: { user: session.data && session.data.user.id },
          }}
        >
          <div className="flex flex-row items-center space-x-2">
            <HomeIcon />
            <p className="my-4 cursor-pointer hover:underline">
              Return to projects
            </p>
          </div>
        </Link>
        <h2 className="font-raleway text-2xl">Create a new project</h2>
        <p className="mt-4">
          A projects contains all project files, including the revision history.
          Already have a project repository elsewhere? Import a repository.
        </p>
        <hr className="my-2"></hr>
        <p className="italic">
          Required fields are marked with an asterisk (*).
        </p>
        <p className="mt-6 mb-2">Project Name *</p>
        <div className="flex flex-row items-center space-x-2 bg-primary-900 p-2">
          <p className="rounded border border-black px-1 py-1 font-raleway text-sm">
            {session.data && session.data.user.name}
          </p>
          <p>/</p>
          <input
            name="title"
            onChange={(e) => handleChange(e)}
            className="rounded border border-black px-1 py-1 font-raleway text-sm"
          />
        </div>
        <p className="mt-6 mb-2">Description *</p>
        <div className="flex flex-row items-center space-x-2 bg-primary-900 p-2">
          <textarea
            onChange={(e) => handleChange(e)}
            name="description"
            className="w-full rounded border border-black px-1 py-1 font-raleway text-sm"
          />
        </div>
        {error && (
          <div className="my-4 rounded border border-error-400 p-2 text-error-400">
            {error}
          </div>
        )}
        <div className="my-8">
          <button
            onClick={() => createProject()}
            className="w-32 rounded-lg bg-primary-500 p-2 font-raleway text-primary-100 hover:bg-primary-400 hover:text-primary-900 active:bg-primary-0"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default withAuth(CreateProjectPage)
