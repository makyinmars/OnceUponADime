import { TRPCError } from "@trpc/server"

import { createRouter } from "../router/context"

export const protectedRouter = createRouter().middleware(
  async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    if (ctx.session.user) {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: {
            contains: ctx.session.user.email as string,
          },
          isAdmin: {
            equals: true,
          },
        },
        select: {
          id: true,
          email: true,
          isAdmin: true,
          name: true,
        },
      })

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.session.user,
      },
    })
  }
)
