import { PlaygroundNavBar } from "./navbars"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <PlaygroundNavBar />
      <main className="p-4">{children}</main>
    </div>
  )
}
