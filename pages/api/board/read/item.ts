import type { NextApiRequest, NextApiResponse } from "next"
const db = require("../../../../lib/db")

export default function readItem(req: NextApiRequest, res: NextApiResponse) {
  let id = req.body.data.boardId
  console.log("req.body :", req.body)
  db.query(
    `SELECT * FROM board_item where id = ${id}`,
    function (err: any, result: any) {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.status(200).json(result)
      }
    }
  )
}
