import type { NextApiRequest, NextApiResponse } from "next"
const db = require("../../../../lib/db")

export default function read(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body)
  const { userId, title, date, count, file, contents } = req.body

  db.query(
    `INSERT INTO board_item 
  (userId, title, count, file, contents)
  VALUES
  (${userId},'${title}',${count},'${file}','${contents}')`,
    function (err: any, result: any) {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json("complete")
      }
    }
  )
}
