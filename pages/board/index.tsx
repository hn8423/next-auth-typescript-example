import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)

import BoardList from "components/boardList"
import Search from "components/ search"

export default function Board() {
  // console.log("env : ", process.env.DB)
  return (
    <div className={classname("board")}>
      <div className={classname("board-header")}>
        <div className={classname("board-header-title")}>자료실</div>
      </div>
      <Search />
      <BoardList />
    </div>
  )
}
