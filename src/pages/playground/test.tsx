export default function Diff(props) {
  const { diffOneWay, diffOtherWay } = props
  console.log(diffOneWay)
  return (
    <div className="grid grid-cols-2 bg-slate-600 p-4 text-white">
      <FileDiffViewer diffOneWay={diffOneWay} />
      <FileDiffViewer diffOneWay={diffOtherWay} />
    </div>
  )
}

function FileDiffViewer(props) {
  const diffLines = props.diffOneWay.split("\n")

  return (
    <div className="rounded bg-slate-700 p-2">
      {diffLines.map((line, index) => {
        let lineClass = ""
        if (line.includes("new")) {
          line = ""
        } else if (line.includes("new")) {
          line = ""
        } else if (line.includes("Binary")) {
          line = ""
        } else if (line.includes("index")) {
          line = ""
        } else if (line.includes("deleted")) {
          line = ""
        } else if (line.startsWith("diff --git")) {
          line = line.split(" ")[2]
          lineClass = "bg-slate-600 p-2"
        } else if (line.startsWith("---") || line.startsWith("+++")) {
          line = ""
          lineClass = ""
        } else if (line.startsWith("@@")) {
          lineClass = "bg-slate-800"
        } else if (line.startsWith("+")) {
          lineClass = "bg-gradient-to-r from-emerald-600 to-blue-600 px-1 h-6"
        } else if (line.startsWith("-")) {
          line = ""
          lineClass = "bg-gradient-to-r from-pink-800 to-orange-600 px-1 h-6"
        } else {
          lineClass = "text-white bg-slate-900"
        }

        return (
          <pre key={index} className={lineClass}>
            {line}
          </pre>
        )
      })}
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/test")
  return {
    props: {
      diffOneWay: diffOneWay || null,
      diffOtherWay: diffOtherWay || null,
    },
  }
}
