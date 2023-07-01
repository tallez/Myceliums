import { useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"

import { MyceliumsAvatar } from "@components/icons"
import Layout from "@components/layout"
import { withAuth } from "@utils/nextauthwrapper"
import prisma from "lib/prisma"

function UserPage(props) {
  const { projects } = props
  return (
    <Layout>
      <Head>
        <title>Projects</title>
      </Head>
      <UserSpace projects={projects} />
    </Layout>
  )
}

const UserSpace = ({ projects }) => {
  const session = useSession()
  return (
    <div className="grid h-full w-full grid-cols-5">
      <div>
        <div className="flex flex-row items-center">
          <h2 className="p-4 font-playfair text-3xl">
            {session.data && session.data.user.name}
          </h2>
          <MyceliumsAvatar />
        </div>
      </div>
      <div className="col-span-4 p-4 ">
        <div className="flex justify-between font-playfair text-xl">
          <p className="underline">Projects</p>
          <Link
            passHref
            href={{
              pathname: "/playground/[user]/create",
              /* @ts-ignore no idea where to update the session type */
              query: { user: session.data && session.data.user.id },
            }}
          >
            <div className="m-1 flex cursor-pointer flex-row items-center space-x-2 rounded-lg text-secondary-300 hover:text-secondary-400">
              <p className="font-playfair">New Project</p>
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
          </Link>
        </div>{" "}
        <hr></hr>
        {projects.map((project, i) => {
          return (
            <Link
              passHref
              key={i}
              href={{
                pathname: "/playground/project/[id]",
                /* @ts-ignore no idea where to update the session type */
                query: { id: project.id },
              }}
            >
              <div className="my-2 w-full cursor-pointer rounded border p-2 font-playfair font-bold shadow-inner hover:bg-gray-50">
                {project.name}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default withAuth(UserPage)

export async function getServerSideProps(ctx) {
  const { user } = ctx.query
  const projects = await prisma.project.findMany({
    where: {
      userId: user,
    },
  })
  return {
    props: {
      projects,
    },
  }
}
