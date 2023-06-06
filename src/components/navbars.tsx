import { useEffect, useState } from "react"
import { MyceliumsAvatar, MyceliumsLogo } from "./icons"

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
  const menuItems = ["Presentation", "Issue", "Propositions"]
  return (
    <div className="my-2 flex flex-row items-center justify-between bg-gray-50 px-2">
      <div className="flex flex-row space-x-8">
        {menuItems.map((el) => {
          return (
            <p className="cursor-pointer font-playfair font-[200] hover:text-primary-500">
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
  const menuItems = ["Home", "Playground"]
  return (
    <div className="shadow-lg">
      <div className="flex flex-row items-center justify-between space-x-2 p-2 px-4">
        <div className="flex flex-row space-x-2 p-2 ">
          <MyceliumsLogo />
          <div className="flex flex-row items-end justify-center space-x-4 p-2">
            {menuItems.map((el) => {
              return (
                <p className="cursor-pointer font-raleway text-lg hover:text-primary-500">
                  {el}
                </p>
              )
            })}
          </div>
        </div>
        <div>
          <MyceliumsAvatar />
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-primary-500 to-primary-800"></div>
    </div>
  )
}
