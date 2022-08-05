import { Prisma } from "@prisma/client"
import { z } from "zod"

import { createRouter } from "../context"
import { protectedRouter } from "@/server/utils/protected"

const defaultCommentSelect = Prisma.validator<Prisma.CommentSelect>()({
  id: true,
  content: true,
  firstName: true,
  lastName: true,
  blogId: true,
  createdAt: true,
  updatedAt: true,
})

export const commentRouter = createRouter()
  .mutation("createComment", {
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
  .query("getCommentsByBlogId", {
    input: z.object({
      blogId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          blogId: input.blogId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return comments
    },
  })
  .merge(
    protectedRouter.mutation("deleteCommentById", {
      input: z.object({
        commentId: z.string(),
      }),
      async resolve({ input, ctx }) {
        return await ctx.prisma.comment.delete({
          where: {
            id: input.commentId,
          },
        })
      },
    })
  )
