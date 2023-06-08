import React from "react"

import Head from "next/head"

export default function Home({ connected }) {
  return (
    <>
      <Head>
        <title>Myceliums</title>

        <meta
          name="description"
          content="The website of Myceliums, an Association dedicated to the collaboration around ecology and technology."
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen justify-center space-x-4 py-10"></main>
    </>
  )
}
