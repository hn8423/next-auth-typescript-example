import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { useState, useRef } from "react"
import dynamic from "next/dynamic"
import parse from "html-react-parser"
import AWS from "aws-sdk"
import { useS3Upload } from "next-s3-upload"

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

export default function BoardWrite() {
  // const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")
  // const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const inputRef = useRef<any>(null)
  let [imageUrl, setImageUrl] = useState("")
  // const [urls, setUrls] = useState([]);
  let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload()
  const router = useRouter()

  let handleFileChange = async (file: any) => {
    let { url } = await uploadToS3(file)
    let customUrl = url.replace("boardimageshyun.", "")
    setImageUrl(customUrl)
  }

  const onClickHome = () => {
    router.push("/board")
  }

  const mutation: any = useMutation(
    (newTodo) => {
      return axios.post("/api/board/create", newTodo)
    },
    {
      onSuccess: () => {
        var formData = new FormData()
        // formData.append("file", selectedFile)
        // s3upload.mutate({})
        router.push("/board")
      },
    }
  )

  type state = React.Dispatch<React.SetStateAction<string>>

  function setTargetValue(setState: state) {
    return (e: any) => {
      setState(e.target.value)
    }
  }

  function onSubmit() {
    if (imageUrl === "") {
      alert("파일 업로드를 해주세요")
      return
    }
    mutation.mutate({
      userId: 1,
      title,
      count: 0,
      file: imageUrl,
      contents: value,
    })
  }

  return (
    <div className={classname("board")}>
      {mutation.isLoading ? (
        "Adding todo.."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}
        </>
      )}
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
        <FileInput onChange={handleFileChange} />
        <div className={classname("board-file-title")} onClick={openFileDialog}>
          파일 첨부
        </div>
        <div className={classname("board-file-contents")}>
          {files.map((file, index) => (
            <div key={index}>
              {index + 1}st File progress: {file.progress}%
            </div>
          ))}
        </div>
      </div>
      <div className={classname("board-button-wrapper")}>
        <button className={classname("board-button")} onClick={onSubmit}>
          Send post
        </button>
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
    </div>
  )
}
