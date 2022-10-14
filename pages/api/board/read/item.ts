import excuteQuery from "../../../../lib/db"

export default async (req: any, res: any) => {
  // console.log("req :", req.body)
  const { id } = req.body
  try {
    const result = await excuteQuery({
      query: `SELECT * FROM file_board.board_item where id = ${id};`,
    })
    if (result) {
      res.status(200).json(result)
    }
  } catch (error) {
    console.log(error)
  }
}
