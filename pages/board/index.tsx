import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)

import BoardList from "components/boardList"
import Search from "components/ search"

export async function getServerSideProps() {
  try {
    const boadItemList = [
      {
        number: 1,
        title: `성동구 공공조형물 설치 현황('21년 9월 기준)`,
        date: new Date(),
        count: 34,
        file: "s3/ss/ss.pdf",
      },
      {
        number: 2,
        title: `성동구 공공조형물 설치 현황('21년 9월 기준)`,
        date: new Date(),
        count: 34,
        file: "s3/ss/ss.pdf",
      },
      {
        number: 3,
        title: `성동구 공공조형물 설치 현황('21년 9월 기준)`,
        date: new Date(),
        count: 34,
        file: "s3/ss/ss.pdf",
      },
    ]

    return {
      props: {
        items: JSON.parse(JSON.stringify(boadItemList)),
      },
    }
  } catch (err) {
    return {
      props: {
        items: [],
      },
    }
  }
}

export default function Board({ items }: any) {
  return (
    <div className={classname("board")}>
      <div className={classname("board-header")}>
        <div className={classname("board-header-title")}>자료실</div>
      </div>
      <Search />
      <BoardList items={items} />
    </div>
  )
}
