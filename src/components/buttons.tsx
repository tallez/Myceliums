export function DefaultActiveButton({ label }: { label: string }) {
  return (
    <button className="w-32 rounded-lg border border-black bg-primary-500 p-2 font-raleway text-primary-100 hover:bg-primary-400 hover:text-primary-900 active:bg-primary-0">
      {label}
    </button>
  )
}

export function DefaultDisabledButton() {
  return (
    <button className="w-32 cursor-not-allowed rounded-lg border border-2 border-gray-500 p-2 font-raleway text-gray-500">
      Disabled
    </button>
  )
}
