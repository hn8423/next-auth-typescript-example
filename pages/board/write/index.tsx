import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { useState } from "react"
import dynamic from "next/dynamic"
import parse from "html-react-parser"

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
]

function onSubmit(value: any) {
  console.log(value)
  let data = { content: value }
  axios
    .post("/api/sendpost", data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    })
}

export default function BoardWrite() {
  // const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")
  const router = useRouter()

  const onClickHome = () => {
    router.push("/board")
  }

  type state = React.Dispatch<React.SetStateAction<string>>

  function setTargetValue(setState: state) {
    return (e: any) => {
      setState(e.target.value)
    }
  }

  return (
    <div className={classname("board")}>
      <div className={classname("board-header")}>
        <div className={classname("board-header-title")}>글쓰기</div>
      </div>
      <div className={classname("board-subtitle")}></div>
      <div className={classname("board-title-wrapper")}>
        <div className={classname("board-title-intro")}>제목 :</div>
        <input
          className={classname("board-title")}
          type="text"
          name="title"
          value={title}
          placeholder="write title"
          onChange={setTargetValue(setTitle)}
        />
      </div>
      <div className={classname("board-quill-wrapper")}>
        <QuillNoSSRWrapper
          className={classname("board-quill")}
          modules={modules}
          placeholder="write here"
          value={value}
          onChange={setValue}
          formats={formats}
          theme="snow"
        />
      </div>
      <div className={classname("board-file-wrapper")}>
        <div className={classname("board-file-title")}>파일 첨부 </div>
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
          <div className={classname("board-next-contents")}>다음 자료 제목</div>
        </div>
      </div>
      <button onClick={(e) => onSubmit(value)}> Send post</button>
      <p>{value}</p>
      {parse(value)}
    </div>
  )
}
