import React, { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import prisma from "lib/prisma"

export default function ConfirmPage(props) {
  const { confirmed, confirmId } = props
  const [isConfirmed, setIsConfirmed] = useState(confirmed)

  useEffect(() => {
    const checkEmailConfirmation = async () => {
      // Implement your database check logic here
      const userIsConfirmed = await fetch(`/api/user/${confirmId}`).then(
        (res) => res.json()
      )
      // Update the confirmed state based on the email confirmation status
      setIsConfirmed(userIsConfirmed)
    }
    // Execute the checkEmailConfirmation function every 3 seconds
    const interval = setInterval(checkEmailConfirmation, 3000)

    // Clean up the interval when the component unmounts or when confirmed changes
    return () => {
      clearInterval(interval)
    }
  }, [confirmId])

  if (isConfirmed) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 text-gray-700">
        <Link passHref href={"/login"}>
          <p className="">Great ! Please login into your account</p>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 text-gray-700">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 font-raleway text-3xl font-bold">
            Check your email
          </h1>
          <p className="font-raleway text-lg">
            We've sent you a confirmation link. Please check your email and
            click the link to confirm your account.
          </p>
          <Image
            src="/myceliums-avatar.png"
            width={200}
            height={200}
            alt={"Logo"}
          />
        </div>
      </div>
    )
  }
}

export const getServerSideProps = async (req) => {
  const { origin, confirmId } = req.query
  if (origin && origin === "mail-confirm") {
    await prisma.user.update({
      where: {
        id: confirmId,
      },
      data: {
        emailConfirmed: true,
      },
    })
    return {
      props: {
        confirmed: true,
        confirmId: confirmId,
      },
    }
  } else {
    return {
      props: {
        confirmed: false,
        confirmId: confirmId,
      },
    }
  }
}
