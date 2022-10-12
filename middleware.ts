import { NextResponse } from "next/server"
import type { NextMiddleware } from "next/server"
import withAuth, { NextRequestWithAuth } from "next-auth/middleware"

export const middleware: NextMiddleware = async function (req, event) {
  const path = req.nextUrl.pathname
  const callback = req.nextUrl.search

  if (path === "/test") {
    return withAuth(req as NextRequestWithAuth, event) as Promise<any>
  }
  return
}
