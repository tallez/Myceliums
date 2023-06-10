import { useState } from "react"

import { signOut, useSession } from "next-auth/react"

import { MyceliumsAvatar, MyceliumsLogo } from "./icons"
import Link from "next/link"

interface MenuItemProps {
  title: string
  link?: string
  active: boolean
}

const exampleItems = [
  {
    title: "Presentation",
    active: true,
  },
]

export function ProjectFileNavBar({
  menuItems = exampleItems,
}: {
  menuItems?: MenuItemProps[]
}) {
  const [menuItemsState, setMenuItemsState] = useState(menuItems)

  const handleClick = (active: string) => {
    const transitionState = menuItemsState.map((item) => {
      if (item.title === active) {
        return { ...item, active: true }
      } else {
        return { ...item, active: false }
      }
    })
    setMenuItemsState(transitionState)
  }

  return (
    <div className="flex flex-row items-center space-x-2 rounded-full border bg-gray-50 px-1 py-1 text-sm shadow-inner">
      {menuItemsState.map((item, i) => {
        let currClass
        if (item.active) {
          currClass =
            "cursor-pointer px-2 py-1 flex items-center font-bold text-primary-950 font-raleway bg-primary-500 rounded-full transition-full duration-300"
        } else {
          currClass =
            "cursor-pointer px-2 font-raleway transition-full duration-300 flex items-center"
        }
        return (
          <p
            key={i}
            onClick={() => handleClick(item.title)}
            className={currClass}
          >
            {item.title}
          </p>
        )
      })}
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  )
}

export function ProjectActionNavbar() {
  const menuItems = ["Presentation", "Issues", "Propositions"]
  return (
    <div className="my-2 flex flex-row items-center justify-between bg-gray-50 px-2 opacity-80">
      <div className="flex flex-row space-x-8">
        {menuItems.map((el, i) => {
          return (
            <p
              key={i}
              className="cursor-pointer font-playfair font-[200] hover:text-primary-500"
            >
              {el}
            </p>
          )
        })}
      </div>
      <div className="m-1 flex cursor-pointer flex-row items-center space-x-2 rounded-lg text-secondary-300 hover:text-secondary-400">
        <p className="font-playfair">Make Proposal</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  )
}

export function PlaygroundNavBar() {
  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Playground", link: "/playground" },
  ]
  const [isActive, setIsActive] = useState(false)
  const { status } = useSession()
  return (
    <div className="shadow-lg">
      <div className="flex flex-row items-center justify-between space-x-2 p-2 px-4">
        <div className="flex flex-row space-x-2 p-2 ">
          <MyceliumsLogo />
          <div className="flex flex-row items-end justify-center space-x-4 p-2">
            {menuItems.map((el, i) => {
              return (
                <Link key={i} href={el.link}>
                  <p className="cursor-pointer font-raleway text-lg hover:text-primary-500">
                    {el.title}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
        {status === "authenticated" && (
          <div
            onClick={() => setIsActive(!isActive)}
            className="relative flex flex-row items-center"
          >
            <MyceliumsAvatar />
            {isActive ? <ProfileMenu /> : null}
          </div>
        )}
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-primary-500 to-primary-800"></div>
    </div>
  )
}

const ProfileMenu = () => {
  const session = useSession()
  const disconnectUser = async () => {
    await signOut()
  }

  return (
    <div className="absolute top-0 right-0">
      <div className="h-12 w-12"></div>
      <div className="flex flex-col whitespace-nowrap rounded border bg-white p-2 font-raleway text-sm">
        <p className="cursor-pointer">
          Signed in as <strong>{session.data.user.name}</strong>
        </p>
        <hr className="my-2"></hr>
        <div>
          {/* @ts-ignore no idea where to update the session type */}
          <Link href={`/playground/${session.data.user.id}`}>
            <p className="my-2 cursor-pointer">Your projects</p>
          </Link>
        </div>
        <hr className="my-2"></hr>
        <p onClick={() => disconnectUser()} className="cursor-pointer">
          Sign out
        </p>
      </div>
    </div>
  )
}
