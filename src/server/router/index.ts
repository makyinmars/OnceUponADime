// src/server/router/index.ts
import { createRouter } from "./context"
import superjson from "superjson"

import { authRouter } from "./auth"
import { userRouter } from "./routers/user"
import { blogRouter } from "./routers/blog"
import { commentRouter } from "./routers/comment"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("auth.", authRouter)
  .merge("blog.", blogRouter)
  .merge("comment.", commentRouter)

// export type definition of API
export type AppRouter = typeof appRouter
