import Login from "@components/login-frame"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"

export default function LoginPage(props) {
  const { error } = props
  const [signUpActive, setSignUpActive] = useState(false)

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative grid h-screen w-screen grid-cols-2 overflow-hidden">
        <SignUp active={signUpActive} />
        <div className="flex h-full w-full items-center justify-center">
          <Login error={error} setSignUp={setSignUpActive} />
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

const SignUp = ({ active }: { active?: boolean }) => {
  return (
    <div
      className={`absolute ${
        active ? "left-0" : "-left-72"
      } z-30 h-full w-72 bg-white bg-gray-600 p-4 opacity-70 backdrop-blur transition-all duration-300`}
    >
      Hello
    </div>
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
