import { useRouter } from "next/router"
import useSessionCheck from "../hooks/session-check"

export default function Pay() {
  const check = useSessionCheck()
  const router = useRouter()
  function onClickPay() {
    if (!check()) {
      // 로ㄱ인 안되었을 떄
      return
    }

    // console.log(check)
  }
  return (
    <div>
      pay page
      <button onClick={onClickPay}>Pay here</button>
      <button onClick={() => router.push("/")}>go to home</button>
    </div>
  )
}
