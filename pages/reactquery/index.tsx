import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import axios from "axios"

export default function ReactQuary() {
  const { isLoading, error, data } = useQuery(["read"], () =>
    axios("/api/board/read")
  )
  return (
    <div>
      <h1> React Query 예제</h1>
      {error && <div>뭔가 잘못됐군요 ...</div>}

      {isLoading ? (
        <div>루크 스카이워커의 데이터를 불러옵니다 ...</div>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}
