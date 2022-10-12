import Layout from "../components/layout"
import { useSession, signIn, signOut } from "next-auth/react"
import { session } from "../type"
import { useRouter } from "next/router"

export default function Page() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => router.push("/test")}>Go to test page</button>
        <button onClick={() => router.push("/pay")}>Go to pay page</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => router.push("/test")}>Go to test page</button>
      <button onClick={() => router.push("/pay")}>Go to pay page</button>
    </>
  )
}
