import { useEffect, useState } from "react"

interface MenuItemProps {
  title: string
  link?: string
  active: boolean
}

const exampleItems = [
  {
    title: "Home",
    active: false,
  },
  {
    title: "Service",
    active: false,
  },
  {
    title: "Pricing",
    active: false,
  },
  {
    title: "Join",
    active: true,
  },
  {
    title: "Other",
    active: false,
  },
]

export function NavBar({
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
    <div className="flex flex-row justify-between rounded-full border border-black">
      {menuItemsState.map((item, i) => {
        let currClass
        if (item.active && i === 0) {
          currClass =
            "cursor-pointer p-2 font-raleway font-bold text-primary-950 bg-primary-500 rounded-l-full pl-4 transition-full duration-300"
        } else if (item.active && i === menuItems.length - 1) {
          currClass =
            "cursor-pointer p-2 font-raleway font-bold text-primary-950 bg-primary-500 rounded-r-full pr-4 transition-full duration-300"
        } else if (item.active && i !== menuItems.length - 1) {
          currClass =
            "cursor-pointer p-2 font-bold text-primary-950 font-raleway bg-primary-500 transition-full px-4 duration-300"
        } else {
          currClass =
            "cursor-pointer p-2 font-raleway transition-full duration-300"
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
    </div>
  )
}
