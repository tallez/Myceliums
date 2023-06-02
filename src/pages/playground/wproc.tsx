import { useState } from "react"
import { useMemo } from "react"

import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

export default function wordProcessor() {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )
  const [value, setValue] = useState("")

  return (
    <div className="w-1/4">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  )
}
