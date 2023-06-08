import Layout from "@components/layout"
import { SessionProvider, useSession } from "next-auth/react"
import Head from "next/head"

export const Playground = () => {
  const session = useSession()
  return (
    <>
      <Head>
        <title>Playground</title>
      </Head>
      <Layout>Welcome to the Playground</Layout>
    </>
  )
}

export default Playground
