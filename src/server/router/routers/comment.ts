import { Prisma } from "@prisma/client"
import { z } from "zod"

import { createRouter } from "../context"

const defaultCommentSelect = Prisma.validator<Prisma.CommentSelect>()({
  id: true,
  content: true,
  firstName: true,
  lastName: true,
  blogId: true,
  createdAt: true,
  updatedAt: true,
})

export const commentRouter = createRouter().mutation("createComment", {
  input: z.object({
    content: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    blogId: z.string(),
  }),
  async resolve({ input, ctx }) {
    return await ctx.prisma.comment.create({
      data: input,
    })
  },
})
