import mysql from "serverless-mysql"
import { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from "utill/dotenv"
const db = mysql({
  config: {
    host: DB_HOST,
    port: 3306,
    database: DB,
    user: DB_USER,
    password: DB_PASSWORD,
  },
})

export default async function excuteQuery({ query, values }: any) {
  try {
    const results = await db.query(query, values)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}
