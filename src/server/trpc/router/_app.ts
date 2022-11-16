import { t } from "../trpc"

import { authRouter } from "./auth"
import { blogRouter } from "./blog"
import { userRouter } from "./user"
import { commentRouter } from "./comment"

export const appRouter = t.router({
  auth: authRouter,
  blog: blogRouter,
  comment: commentRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
