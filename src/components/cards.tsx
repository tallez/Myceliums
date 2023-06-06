export const DefaultCard = () => {
  return (
    <div className="w-full cursor-default rounded-lg bg-primary-900 p-4 font-playfair shadow-lg">
      <h2 className="text-2xl text-primary-100">Title</h2>
      <p className="text-md text-primary-200">{loremIpsum}</p>
    </div>
  )
}

export const SecondaryCard = () => {
  return (
    <div className="w-full cursor-default rounded-lg bg-secondary-100 p-4 font-playfair shadow-lg">
      <h2 className="text-2xl text-secondary-800">Title</h2>
      <p className="text-md text-secondary-900">{loremIpsum}</p>
    </div>
  )
}

export const TertiaryCard = () => {
  return (
    <div className="w-full cursor-default rounded-lg bg-tertiary-400 p-4 font-playfair shadow-lg">
      <h2 className="text-2xl text-primary-800">Title</h2>
      <p className="text-md text-primary-950">{loremIpsum}</p>
    </div>
  )
}

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
