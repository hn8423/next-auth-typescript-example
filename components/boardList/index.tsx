import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)

import { useMemo } from "react"

import BoardItem from "components/boardItem"

export default function BoardList({ items }: any) {
  console.log(items)
  const boadItemList = useMemo(() => {
    if (!items) {
      return []
    }

    let result = items.map(() => {
      return <BoardItem />
    })

    return result
  }, [items])

  return (
    <div className={classname("list")}>
      <div className={classname("list-state")}>총 9개 [1/2페이지]</div>
      <div className={classname("list-main-wrapper")}>
        <div className={classname("list-main-title")}>
          <div className={classname("list-main-title-number")}>번호</div>
          <div className={classname("list-main-title-title")}>제목</div>
          <div className={classname("list-main-title-date")}>작성일</div>
          <div className={classname("list-main-title-count")}>조회수</div>
          <div className={classname("list-main-title-file")}>파일</div>
        </div>
        <div className={classname("list-item")}>
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
          <BoardItem />
        </div>
      </div>
    </div>
  )
}
