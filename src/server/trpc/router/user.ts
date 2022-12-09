import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { t, authedProcedure } from "../trpc"

export const userRouter = t.router({
  getUserByEmail: t.procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(({ ctx, input: { email } }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email,
        },
      })
    }),

  getUserById: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id,
        },
      })
    }),

  getAdminByEmail: authedProcedure
    .input(
      z.object({
        email: z.string().nullable(),
      })
    )
    .query(({ ctx, input: { email } }) => {
      if (email) {
        return ctx.prisma.user.findFirst({
          where: {
            email,
            isAdmin: {
              equals: true,
            },
          },
        })
      } else {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Not allowed",
        })
      }
    }),
})
