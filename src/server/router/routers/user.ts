import { z } from "zod"

import { createRouter } from "../context"

export const userRouter = createRouter().query("getUserByEmail", {
  input: z.object({
    email: z.string(),
  }),
  resolve: async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    })
    return user
  },
})
