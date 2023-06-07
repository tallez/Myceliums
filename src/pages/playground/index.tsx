import Layout from "@components/layout"
import { SessionProvider, useSession } from "next-auth/react"

export const Playground = () => {
  const session = useSession()
  return (
    <>
      <Layout>Welcome to the Playground</Layout>
    </>
  )
}

export default Playground
