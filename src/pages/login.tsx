import Head from "next/head"
import Image from "next/image"

import Login from "@components/login-frame"

export default function LoginPage(props) {
  const { error } = props

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative grid h-screen w-screen grid-cols-2 overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <Login error={error} />
        </div>
        <div className="flex h-full w-full items-center justify-center bg-primary-500">
          <Image
            src="/myceliums-avatar.png"
            width={600}
            height={600}
            alt={"Logo"}
          />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { error } = ctx.query
  if (error) {
    return {
      props: {
        error: true,
      },
    }
  } else {
    return {
      props: {
        error: false,
      },
    }
  }
}
