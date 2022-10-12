import style from "./index.module.scss"
import { classOption } from "utill"
const classname = classOption(style)

export default function Search() {
  return (
    <div className={classname("search")}>
      <div className={classname("search-hr")}></div>
      <div className={classname("search-input-wrapper")}>
        <div className={classname("search-input-drop")}>drop</div>
        <div className={classname("search-input")}></div>
        <div className={classname("search-input-button")}>검색</div>
      </div>
    </div>
  )
}
