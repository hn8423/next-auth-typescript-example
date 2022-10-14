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
  return <div>default</div>
}
