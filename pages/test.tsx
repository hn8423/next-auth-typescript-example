import { useRouter } from "next/router"

export default function Text() {
  const router = useRouter()
  return (
    <div>
      text page
      <button onClick={() => router.push("/")}>Go to test page</button>
    </div>
  )
}
