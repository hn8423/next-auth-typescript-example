import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps = async function (ctx) {
  let props: { boardItemList?: any } = {}
  let boardItemList
  axios
    .get("/api/board/read")
    .then((response) => {
      boardItemList = response
      // console.log(response)
    })
    .catch((e) => {
      console.log
    })

  if (boardItemList) {
    props.boardItemList = boardItemList
  }

  return { props }
}

type props = {
  boardItemList?: any[]
}

export default function BoardItem({ item }: any, { props }: any) {
  const router = useRouter()
  console.log("props :", props)
  const [icon, setIcon] = useState("")
  const [date, setDate] = useState("")
  useEffect(() => {
    switch (item.file) {
      case "excel":
        setIcon("/images/icon/file/folder.png")
        break
      case "pdf":
        setIcon("/images/icon/file/hangle.png")
        break
      case "hwp":
        setIcon("/images/icon/file/pdf.png")
        break
    }
    let dateFormat = dayjs(item.date).format("YYYY.MM.DD")
    setDate(dateFormat)
  }, [item])

  function onClickDetail() {
    router.push({
      pathname: `/board/[boardid]`,
      query: { boardid: item.id },
    })
  }

  return (
    <div className={classname("board-item")}>
      <div className={classname("board-item-number")}>{item.id}</div>
      <div className={classname("board-item-title")} onClick={onClickDetail}>
        {item.title}
      </div>
      <div className={classname("board-item-date")}>{date}</div>
      <div className={classname("board-item-count")}>{item.count}</div>
      <div className={classname("board-item-file")}>
        <img
          className={classname("board-item-file-icon")}
          src={icon}
          alt="icon"
        />
      </div>
    </div>
  )
}
