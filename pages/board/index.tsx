import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)

import BoardList from "components/boardList"
import Search from "components/ search"
import { useRouter } from "next/router"

export default function Board() {
  const router = useRouter()

  const onClickWrite = () => {
    router.push("/board/write")
  }
  return (
    <div className={classname("board")}>
      <div className={classname("board-header")}>
        <div className={classname("board-header-title")}>자료실</div>
      </div>
      <Search />
      <BoardList />
      <div className={classname("board-write-wrapper")}>
        <div className={classname("board-write")} onClick={onClickWrite}>
          글쓰기
        </div>
      </div>
    </div>
  )
}
