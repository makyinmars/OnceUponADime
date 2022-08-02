import { useRouter } from "next/router"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { createSSGHelpers } from "@trpc/react/ssg"
import superjson from "superjson"

import { trpc } from "@/utils/trpc"
import { prisma } from "@/server/db/client"
import { appRouter } from "@/server/router/"
import { createContext } from "@/server/router/context"

import BlogCommon from "@/components/common/blog"
import Loading from "@/components/common/loading"

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { id } = props
  const { data, isLoading } = trpc.useQuery(["blog.getPublishedBlog", { id }])
  const { data: blogComments } = trpc.useQuery([
    "comment.getCommentsByBlogId",
    { blogId: id },
  ])

  return (
    <div className="container p-4 mx-auto">
      {isLoading && <Loading />}
      <BlogCommon blog={data} blogComments={blogComments} />
    </div>
  )
}

export default Blog

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const { req, res, session, prisma } = await createContext()

  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: { req, res, session, prisma },
    transformer: superjson,
  })

  const id = context.params?.id as string

  await ssg.fetchQuery("blog.getPublishedBlog", { id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
    },
  })

  return {
    paths: blogs.map((blog) => ({ params: { id: blog.id } })),
    fallback: false,
  }
}
