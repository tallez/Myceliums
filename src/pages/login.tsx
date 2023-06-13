import Head from "next/head"
import Image from "next/legacy/image"

import Login from "@components/login-frame"

export default function LoginPage(props) {
  const { error } = props

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative grid w-screen h-screen grid-cols-2 overflow-hidden">
        <div className="flex items-center justify-center w-full h-full">
          <Login error={error} />
        </div>
        <div className="relative flex items-center justify-center w-full h-full bg-primary-500">
          <Image
            src="/myceliums-texture2.png"
            layout="fill"
            objectFit="cover"
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
