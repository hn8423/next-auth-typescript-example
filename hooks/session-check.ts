import { useSession, UseSessionOptions } from "next-auth/react"
import { useCallback, useMemo } from "react"
import { signIn } from "next-auth/react"

export default function useSessionCheck() {
  const { data: session } = useSession()
  const check = useCallback(() => {
    if (!session) {
      alert("로그인 하세요")
      signIn()
      return false
    }
    return true
  }, [session])

  return check
}
