import React from "react"
import Head from "next/head"
import Heading from "@components/Heading"

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

      <main className="flex justify-center min-h-screen py-10 bg-mycelium-100">
        <Heading />
      </main>
    </>
  )
}
