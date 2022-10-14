import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)

import { useEffect, useMemo, useState } from "react"

import BoardItem from "components/boardItem"
import axios from "axios"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

export default function BoardList() {
  // console.log(items)

  const { isLoading, error, data } = useQuery(["read"], () =>
    axios("/api/board/read")
  )

  const boadItemList = useMemo(() => {
    if (!data) {
      return []
    }

    type itemType = {
      id: number
      title: string
      date: Date
      count: number
      file: string
    }

    let result = data.data.map((item: itemType) => {
      return <BoardItem item={item} />
    })

    return result
  }, [data])

  return (
    <div className={classname("list")}>
      {error && <div>뭔가 잘못됐군요 ...</div>}
      {isLoading ? (
        <div> 데이터를 불러옵니다 ...</div>
      ) : (
        <>
          <div className={classname("list-state")}>총 9개 [1/2페이지]</div>
          <div className={classname("list-main-wrapper")}>
            <div className={classname("list-main-title")}>
              <div className={classname("list-main-title-number")}>번호</div>
              <div className={classname("list-main-title-title")}>제목</div>
              <div className={classname("list-main-title-date")}>작성일</div>
              <div className={classname("list-main-title-count")}>조회수</div>
              <div className={classname("list-main-title-file")}>파일</div>
            </div>
            <div className={classname("list-item")}>{boadItemList}</div>
          </div>
        </>
      )}
    </div>
  )
}
