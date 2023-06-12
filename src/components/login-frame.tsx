import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { signIn } from "next-auth/react"
import Image from "next/image"

import { LoadingIcon } from "./icons"

export default function Login({
  error,
  setSignUpActive,
}: {
  error: boolean
  setSignUpActive: Dispatch<SetStateAction<boolean>>
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitType, setSubmitType] = useState("")

  useEffect(() => {
    const connectUser = async () => {
      if (isSubmitting) {
        setIsLoading(true)
        await signIn(submitType, { email, password })
        setIsLoading(false)
      }
    }
    connectUser()
  }, [isSubmitting])

  const SignInWithGoogle = () => {
    const handleClick = () => {
      setSubmitType("google")
      setIsSubmitting(true)
    }

    return (
      <button
        onClick={handleClick}
        className="col-span-2 my-4 flex w-full flex-row items-center justify-center space-x-2 rounded border p-2 hover:bg-gray-100"
      >
        <Image src="/google.png" width={20} height={20} alt="" />
        <p>Sign in with Google</p>
      </button>
    )
  }

  const SignInWithCredentials = () => {
    const [localEmail, setLocalEmail] = useState("")
    const [localPassword, setLocalPassword] = useState("")
    const [inputError, setInputError] = useState(false)

    const handleEmail = (username) => {
      setLocalEmail(username)
      setInputError(false) // Reset input error when email is changed
    }

    const handlePassword = (password) => {
      setLocalPassword(password)
      setInputError(false) // Reset input error when password is changed
    }

    const handleSubmit = () => {
      if (!localEmail.includes("@") || localPassword.length < 6) {
        setInputError(true) // Set input error if email is invalid or password is too short
      } else {
        setSubmitType("credentials")
        setEmail(localEmail)
        setPassword(localPassword)
        setIsSubmitting(true)
      }
    }

    return (
      <form className="mt-2 w-full space-y-4">
        <label className="col-span-1 flex w-full items-center font-bold">
          Email
        </label>
        <input
          onChange={(e) => handleEmail(e.target.value)}
          placeholder="please provide your email"
          className="w-full rounded border shadow-inner"
          type="email"
        />

        <label className="col-span-1 flex w-full items-center font-bold">
          Password
        </label>
        <input
          autoComplete="off"
          onChange={(e) => handlePassword(e.target.value)}
          placeholder="please enter your password"
          className="w-full rounded border shadow-inner"
          type="password"
        />

        {inputError && (
          <p className="text-sm text-red-500">
            Invalid email or password. Please try again.
          </p>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          className="col-span-2 my-10 w-full rounded bg-primary-500 p-2 text-white hover:bg-primary-300"
        >
          Submit
        </button>
        <div className="flex flex-row space-x-2 text-sm">
          <p className="cursor-pointer font-extrabold hover:text-gray-500">
            Forgot password?
          </p>
        </div>
      </form>
    )
  }

  return (
    <>
      <div
        className={`relative my-12 w-96 rounded-xl border bg-white ${
          error ? "border-error-500" : "border-gray-300"
        } px-4 py-8 shadow-lg`}
      >
        {isLoading ? (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center rounded-xl border border-black bg-gray-500 p-1 opacity-60">
            <div className="absolute top-2 right-2 z-40">
              <LoadingIcon />
            </div>
          </div>
        ) : null}
        <div className="flex flex-row items-end">
          <h1 className="pb-2 font-raleway text-2xl">Myceliums</h1>
          <Image src="/myceliums-logo.svg" width={60} height={60} alt="Logo" />
        </div>
        <h1 className="text-kanit-200 my-4 text-4xl font-extrabold"></h1>
        <h2 className="text-xl">Please sign in to continue</h2>

        {error && (
          <div className="my-4 flex w-full items-center justify-center rounded-lg bg-error-500 p-2 font-bold text-white">
            Wrong Credentials
          </div>
        )}

        <SignInWithCredentials />

        <div className="my-4 flex items-center justify-center">
          <hr className="mx-2 w-1/3" />
          <p className="mx-2">Or</p>
          <hr className="mx-2 w-1/3" />
        </div>
        <SignInWithGoogle />
        <div className="flex flex-row space-x-2 text-sm">
          <p>Don't have an account yet ?</p>
          <p
            onClick={() => setSignUpActive(true)}
            className="cursor-pointer font-extrabold hover:text-gray-500"
          >
            Sign up
          </p>
        </div>
      </div>
    </>
  )
}
