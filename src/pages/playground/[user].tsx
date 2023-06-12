import React from "react"

import Layout from "@components/layout"
import { withAuth } from "@utils/nextauthwrapper"

function UserProjectPage() {
  return <Layout>Your projects</Layout>
}

export default withAuth(UserProjectPage)
