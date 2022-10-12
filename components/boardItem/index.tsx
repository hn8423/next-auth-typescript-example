import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)

export default function BoardItem() {
  return (
    <div className={classname("board-item")}>
      <div className={classname("board-item-number")}>1</div>
      <div className={classname("board-item-title")}>
        성동구 공공조형물 설치 현황('21년 9월 기준)
      </div>
      <div className={classname("board-item-date")}>2022.09.13</div>
      <div className={classname("board-item-count")}>23</div>
      <div className={classname("board-item-file")}>이</div>
    </div>
  )
}
