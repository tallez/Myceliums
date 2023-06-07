import Login from "@components/login-frame"
import Head from "next/head"
import Image from "next/image"

export default function LoginPage(props) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="grid h-screen w-screen grid-cols-2">
        <div className="flex h-full w-full items-center justify-center">
          <Login />
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
        error: error,
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
