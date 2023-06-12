import { useEffect } from "react"

import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

interface ProtectedPageProps {
  session: {
    user: { name: string; email: string; id: string }
    expires: string
    accessToken: string
  }
}

export const withAuth = (WrappedComponent: React.FC<ProtectedPageProps>) => {
  const Wrapper = (props: any) => {
    const router = useRouter()
    useEffect(() => {
      const checkUser = async () => {
        const session = await getSession()
        if (!session) {
          router.push("/login")
        }
      }
      checkUser()
    })
    return <WrappedComponent {...props} />
  }
  return Wrapper
}
