import type { Session } from "next-auth"

type customToken = { user: { id: string; email: string } }
type __session = Session & customToken

export interface session extends __session {
  user: { id: string; email: string }
}
