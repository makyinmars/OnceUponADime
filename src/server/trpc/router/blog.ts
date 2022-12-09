import { Prisma } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { t, authedProcedure } from "../trpc"

const defaultBlogSelect = Prisma.validator<Prisma.BlogSelect>()({
  id: true,
  title: true,
  author: true,
  draft: true,
  published: true,
  summary: true,
  content: true,
  imageUrl: true,
  Comments: true,
  createdAt: true,
  updatedAt: true,
})

export const blogRouter = t.router({
  getPublishedBlog: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.blog.findFirstOrThrow({
        where: {
          id,
          published: true,
        },
        select: defaultBlogSelect,
      })
    }),

  getPublishedBlogs: t.procedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany({
      where: {
        published: {
          equals: true,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: defaultBlogSelect,
    })
  }),

  getLatestPublishedBlogs: t.procedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany({
      where: {
        published: {
          equals: true,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 3,
      select: defaultBlogSelect,
    })
  }),

  searchPublishedBlogs: t.procedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(({ ctx, input: { search } }) => {
      return ctx.prisma.blog.findMany({
        where: {
          published: {
            equals: true,
          },
          title: {
            contains: search,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        select: defaultBlogSelect,
      })
    }),

  getAdminPublishedBlog: authedProcedure
    .input(
      z.object({
        id: z.string().nullable(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      if (id) {
        return ctx.prisma.blog.findFirstOrThrow({
          where: {
            id,
            published: {
              equals: true,
            },
          },
          select: defaultBlogSelect,
        })
      } else {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to edit this blog",
        })
      }
    }),

  getAdminPublishedBlogs: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany({
      where: {
        published: {
          equals: true,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: defaultBlogSelect,
    })
  }),

  createBlog: authedProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        summary: z.string(),
        content: z.string(),
        imageUrl: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.blog.create({
        data: input,
      })
    }),

  updateBlog: authedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        summary: z.string(),
        content: z.string(),
        imageUrl: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.blog.update({
        where: {
          id: input.id,
        },
        data: input,
      })
    }),

  deleteBlog: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.blog.delete({
        where: {
          id,
        },
      })
    }),

  publishBlog: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.blog.update({
        where: { id },
        data: { published: true, draft: false },
      })
    }),

  draftBlog: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.blog.update({
        where: { id },
        data: { draft: true, published: false },
      })
    }),

  getDraftBlog: authedProcedure
    .input(
      z.object({
        id: z.string().nullable(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      if (id) {
        return ctx.prisma.blog.findFirstOrThrow({
          where: { id, draft: true },
          select: defaultBlogSelect,
        })
      } else {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are forbidden",
        })
      }
    }),

  getDraftBlogs: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany({
      where: {
        draft: {
          equals: true,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: defaultBlogSelect,
    })
  }),
})
