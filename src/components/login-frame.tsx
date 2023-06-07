import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { signIn } from "next-auth/react"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const connectUser = async () => {
      if (isSubmitting) {
        setIsLoading(true)
        await signIn("credentials", { email, password })
        setIsLoading(false)
      }
    }
    connectUser()
  }, [isSubmitting])

  const SignInWithGoogle = () => {
    return (
      <button className="col-span-2 my-4 flex w-full flex-row items-center justify-center space-x-2 rounded border p-2 hover:bg-gray-100">
        <Image src="/google.png" width={20} height={20} alt={""} />
        <p>Sign in with Google</p>
      </button>
    )
  }

  const SignInWithCredentials = ({
    setEmail,
    setPassword,
  }: {
    setEmail: Dispatch<SetStateAction<string>>
    setPassword: Dispatch<SetStateAction<string>>
    setIsSubmitting: Dispatch<SetStateAction<boolean>>
  }) => {
    const [localEmail, setLocalEmail] = useState("")
    const [localPassword, setLocalPassword] = useState("")

    const handleEmail = (username: string) => {
      setLocalEmail(username)
    }

    const handlePassword = (password: string) => {
      setLocalPassword(password)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      setEmail(localEmail)
      setPassword(localPassword)
      setIsSubmitting(true)
    }

    return (
      <form className="mt-10 w-full space-y-4">
        <label className="col-span-1 flex w-full items-center font-bold">
          Email
        </label>
        <input
          onChange={(e) => {
            handleEmail(e.target.value)
          }}
          placeholder="please provide your email"
          className="w-full rounded border shadow-inner "
          type="email"
        />

        <label className="col-span-1 flex w-full items-center font-bold ">
          Password
        </label>
        <input
          autoComplete="off"
          onChange={(e) => {
            handlePassword(e.target.value)
          }}
          placeholder="please enter your password"
          className="w-full rounded border shadow-inner"
          type="password"
        />

        <button
          onClick={handleSubmit}
          className="col-span-2 my-10 w-full rounded bg-primary-500 p-2 text-white hover:bg-primary-300"
        >
          Submit
        </button>
        <div className="flex flex-row space-x-2 text-sm">
          <p className="cursor-pointer font-extrabold hover:text-gray-500">
            Forgot password ?
          </p>
        </div>
      </form>
    )
  }

  return (
    <div className="relative my-12 w-96 rounded-xl border bg-white px-4 py-8 shadow-lg">
      <div className="flex flex-row items-end">
        <h1 className="pb-2 font-raleway text-2xl ">Myceliums</h1>
        <Image src="/myceliums-logo.svg" width={60} height={60} alt={"Logo"} />
      </div>
      <h1 className="text-kanit-200 my-4 text-4xl font-extrabold"></h1>
      <h2 className="text-xl">Please sign in to continue</h2>
      <SignInWithCredentials
        setEmail={setEmail}
        setPassword={setPassword}
        setIsSubmitting={setIsSubmitting}
      ></SignInWithCredentials>
      <div className="my-4 flex items-center justify-center">
        <hr className="mx-2 w-1/3" />
        <p className="mx-2">Or</p>
        <hr className="mx-2 w-1/3" />
      </div>
      <SignInWithGoogle />
      <div className="flex flex-row space-x-2 text-sm">
        <p>Don't have an account yet ?</p>
        <p className="cursor-pointer font-extrabold hover:text-gray-500">
          Sign up
        </p>
      </div>
    </div>
  )
}
