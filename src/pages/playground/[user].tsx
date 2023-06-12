import Layout from "@components/layout"
import { withAuth } from "@utils/nextauthwrapper"
import React from "react"

function UserProjectPage() {
  return <Layout>Your projects</Layout>
}

export default withAuth(UserProjectPage)
