import { protectedRouter } from "@/server/utils/protected"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { createRouter } from "../context"

export const userRouter = createRouter()
  .query("getUserByEmail", {
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
  .query("getUserById", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      })
      return user
    },
  })
  .merge(
    protectedRouter.query("getAdminByEmail", {
      input: z.object({
        email: z.string(),
      }),
      resolve: async ({ input, ctx }) => {
        const admin = await ctx.prisma.user.findFirst({
          where: {
            email: {
              contains: input.email,
            },
            isAdmin: {
              equals: true,
            },
          },
        })
        if (!admin) {
          throw new TRPCError({ code: "UNAUTHORIZED" })
        }
        return admin
      },
    })
  )
