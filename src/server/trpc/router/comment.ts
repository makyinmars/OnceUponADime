import { Prisma } from "@prisma/client"
import { z } from "zod"

import { t, authedProcedure } from "../trpc"

const defaultCommentSelect = Prisma.validator<Prisma.CommentSelect>()({
  id: true,
  content: true,
  firstName: true,
  lastName: true,
  blogId: true,
  createdAt: true,
  updatedAt: true,
})

export const commentRouter = t.router({
  createComment: t.procedure
    .input(
      z.object({
        content: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        blogId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: input,
      })
    }),

  getCommentsByBlogId: t.procedure
    .input(
      z.object({
        blogId: z.string(),
      })
    )
    .query(({ ctx, input: { blogId } }) => {
      return ctx.prisma.comment.findMany({
        where: {
          blogId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    }),

  deleteComment: authedProcedure
    .input(
      z.object({
        commentId: z.string(),
      })
    )
    .mutation(({ ctx, input: { commentId } }) => {
      return ctx.prisma.comment.delete({
        where: {
          id: commentId,
        },
      })
    }),
})
