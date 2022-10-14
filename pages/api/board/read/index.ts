import excuteQuery from "../../../../lib/db"

export default async (req: any, res: any) => {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM file_board.board_item;",
    })
    if (result) {
      res.status(200).json(result)
    }
  } catch (error) {
    console.log(error)
  }
}
