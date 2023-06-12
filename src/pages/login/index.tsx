import Head from "next/head"
import Image from "next/image"

import Login from "@components/login-frame"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { WarnIcon } from "@components/icons"
import { useRouter } from "next/router"
import { sendEmail } from "@utils/send-mail"
import { confirmEmail } from "@utils/mail-templates"

export default function LoginPage(props) {
  const { error } = props
  const [signUpActive, setSignUpActive] = useState(false)

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative grid h-screen w-screen grid-cols-2 overflow-hidden">
        <SignUp setSignUpActive={setSignUpActive} signUpActive={signUpActive} />
        <div className="flex h-full w-full items-center justify-center">
          <Login error={error} setSignUpActive={setSignUpActive} />
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

const SignUp = ({
  signUpActive,
  setSignUpActive,
}: {
  signUpActive: boolean
  setSignUpActive: Dispatch<SetStateAction<boolean>>
}) => {
  const [formData, setFormData] = useState({})
  const [clearUserName, setClearUserName] = useState(true)
  const [clearEmail, setClearEmail] = useState(true)
  const [error, setError] = useState<string | null>()
  const router = useRouter()

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!clearEmail) {
      setError("Email already exists")
      return
    }
    if (!clearUserName) {
      setError("Username already taken")
      return
    }

    if (formData["password"] !== formData["confirmpassword"]) {
      setError("Passwords don't match")
    } else {
      const createUser = await fetch("/api/user/create", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      }).then((res) => res.json())
      if (createUser.success) {
        try {
          await fetch("/api/user/confirm", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              to: formData["email"],
              subject: "Confirm your account",
              text: "Please confirm your account to join Myceliums. Thanks and welcome !",
              html: confirmEmail(
                `http://localhost:3000/login/${createUser.id}?origin=mail-confirm`
              ),
            }),
          })
        } catch (e) {
          console.log("error sending confirmation mail", e)
        }
        router.push(`/login/${createUser.id}`)
      } else setError("There was an error proceeding your inscription")
    }
  }

  useEffect(() => {
    const checkCredentials = async () => {
      try {
        const response = await fetch("/api/user/create", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        })

        const data = await response.json()
        return data
      } catch (error) {
        console.log(error)
      }
    }

    const credentialsCheck = checkCredentials()
    setError(null)

    credentialsCheck
      .then((check) => {
        if (check) {
          if (check.result === "email") {
            setClearEmail(false)
          } else if (check.result === "username") {
            setClearUserName(false)
          } else if (check.result === "clear") {
            setClearUserName(true)
            setClearEmail(true)
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [formData])

  return (
    <div
      className={`absolute ${
        signUpActive ? "top-0 -bottom-0" : "top-[100%] -bottom-[100%]"
      }  left-0 right-0 z-10 flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 text-gray-700 transition-all duration-500`}
    >
      <div className="my-12 w-96 rounded-xl border bg-white p-4 opacity-100 shadow-lg">
        <div className="flex w-full justify-end">
          <svg
            onClick={() => setSignUpActive(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer hover:text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="mb-10 flex flex-row items-end">
          <h1 className="pb-2 font-raleway text-2xl font-bold">Sign Up</h1>
          <Image src="/myceliums-logo.svg" width={60} height={60} alt="Logo" />
        </div>
        {error && (
          <div className="my-4 flex w-full items-center justify-center rounded-lg bg-error-400 p-2 font-bold text-white shadow-lg">
            {error}
          </div>
        )}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mt-2 w-full rounded-lg border p-2 shadow-lg"
        >
          <label className="col-span-1 flex w-full items-center font-raleway">
            <p className="pr-2">Username</p>
            {clearUserName ? null : (
              <WarnIcon toolTip={"Username already taken"} />
            )}
          </label>

          <input
            onChange={(e) => handleInputChange(e)}
            placeholder="Username"
            className="mb-4 w-full rounded border-none bg-gray-50 placeholder-gray-400 shadow-inner"
            type="text"
            name="username"
            required
          />
          <label className="col-span-1 flex w-full items-center font-raleway">
            <p className="pr-2">Email</p>
            {clearEmail ? null : <WarnIcon toolTip={"Email already exists"} />}
          </label>
          <input
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
            className="mb-4 w-full rounded border-none bg-gray-50 placeholder-gray-400 shadow-inner"
            type="email"
            name="email"
            required
          />

          <label className="col-span-1 flex w-full items-center font-raleway">
            Password
          </label>
          <input
            onChange={(e) => handleInputChange(e)}
            autoComplete="off"
            placeholder="Password"
            className="mb-4 w-full rounded border-none bg-gray-50 placeholder-gray-400 shadow-inner"
            type="password"
            name="password"
            required
          />

          <label className="col-span-1 flex w-full items-center font-raleway">
            Confirm Password
          </label>
          <input
            onChange={(e) => handleInputChange(e)}
            autoComplete="off"
            placeholder="Password again"
            className="mb-4 w-full rounded border-none bg-gray-50 placeholder-gray-400 shadow-inner"
            type="password"
            name="confirmpassword"
            required
          />

          <button
            type="submit"
            className="col-span-2 w-full rounded bg-primary-500 p-2 text-white hover:bg-primary-300"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}
