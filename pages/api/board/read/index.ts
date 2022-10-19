import type { NextApiRequest, NextApiResponse } from "next"
const db = require("../../../../lib/db")

export default function read(req: NextApiRequest, res: NextApiResponse) {
  db.query("SELECT * FROM board_item", function (err: any, result: any) {
    if (err) {
      console.log(err)
    } else {
      // console.log(result)
      res.status(200).json(result)
    }
  })
}
