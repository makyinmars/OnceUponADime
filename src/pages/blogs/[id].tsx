import { useEffect } from "react"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import superjson from "superjson"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"

import { trpc } from "src/utils/trpc"
import { prisma } from "src/server/db/client"
import { appRouter } from "src/server/trpc/router/_app"
import { createContextInner } from "src/server/trpc/context"
import BlogCommon from "src/components/common/blog"
import Loading from "src/components/common/loading"

const Blog = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const utils = trpc.useContext()
  const { data, isLoading } = trpc.blog.getPublishedBlog.useQuery({ id })
  const { data: blogComments } = trpc.comment.getCommentsByBlogId.useQuery({
    blogId: id,
  })

  useEffect(() => {
    if (data) {
      utils.blog.getPublishedBlog.invalidate()
    }
  }, [data, utils, id])

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
  const id = context.params?.id as string

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  })

  await ssg.blog.getPublishedBlog.prefetch({ id })

  await ssg.comment.getCommentsByBlogId.prefetch({
    blogId: id,
  })

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
