import axios from "axios"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)

type parameter = { id?: string }

export const getServerSideProps: GetServerSideProps = async function (ctx) {
  const { id } = ctx.params as parameter
  let props: { id?: string } = {}
  if (id) {
    props.id = id
  }

  return { props }
}

type props = {
  id: string
}

export default function Detail({ id }: props) {
  const router = useRouter()
  router.pathname

  const { isLoading, error, data } = useQuery(["read"], () =>
    axios.post("/api/board/read/item", { id })
  )

  console.log(data)
  return (
    <div className={classname("board")}>
      <div className={classname("board-header")}>
        <div className={classname("board-header-title")}>자료실</div>
      </div>
    </div>
  )
}
