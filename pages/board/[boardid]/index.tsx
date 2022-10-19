import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)
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

export const getServerSideProps: GetServerSideProps = async function (ctx) {
  let props: { parameter?: any } = {}
  let parameter = ctx.params?.boardid
  // console.log("ctx.params :", ctx.params?.boardid)
  if (parameter) {
    props.parameter = parameter
  }
  return { props }
}

export default function BoardDetail() {
  const router = useRouter()
  // console.log("props :", props)
  const { boardid } = router.query

  const { isLoading, error, data } = useQuery(
    ["readItem"],
    () => axios.post("/api/board/read/item", { data: { boardId: boardid } }),
    {
      onError: () => {
        console.error("error check")
      },
    }
  )

  const result = data?.data[0]
  // console.log(result)

  const onClickHome = () => {
    router.push("/board")
  }

  return (
    <div className={classname("board")}>
      {error && <div>뭔가 잘못됐군요 ...</div>}
      {isLoading ? (
        <div> 데이터를 불러옵니다 ...</div>
      ) : (
        <>
          <div className={classname("board-header")}>
            <div className={classname("board-header-title")}>자료실</div>
          </div>
          <div className={classname("board-subtitle")}>
            <div>조회수 {result.count}</div>
            <div>작성일 {result.date}</div>
          </div>
          <div className={classname("board-title-wrapper")}>
            <div className={classname("board-title")}>{result.title}</div>
          </div>
          <div>{result.contents}</div>
          <div className={classname("board-file-wrapper")}>
            <div className={classname("board-file-title")}>파일</div>
            <div className={classname("board-file-contents")}>파일 내용</div>
          </div>
          <div className={classname("board-button-wrapper")}>
            <div className={classname("board-button")} onClick={onClickHome}>
              목록
            </div>
          </div>
          <div className={classname("board-next-wrapper")}>
            <div className={classname("board-next")}>
              <div className={classname("board-next-title")}>이전글</div>
              <div className={classname("board-next-contents")}>
                다음 자료 제목
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
