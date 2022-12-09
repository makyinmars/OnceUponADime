import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"

import { trpc } from "src/utils/trpc"
import BlogCommon from "src/components/common/blog"
import Loading from "src/components/common/loading"
import { ssrInit } from "src/utils/ssg"

const Blog = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading } = trpc.blog.getPublishedBlog.useQuery({ id })
  const { data: blogComments } = trpc.comment.getCommentsByBlogId.useQuery({
    blogId: id,
  })

  return (
    <div className="container p-4 mx-auto">
      {isLoading && <Loading />}
      <BlogCommon blog={data} blogComments={blogComments} />
    </div>
  )
}

export default Blog

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { ssg } = await ssrInit(context)
  const id = context.params?.id as string

  await ssg.blog.getPublishedBlog.prefetch({ id })

  await ssg.comment.getCommentsByBlogId.prefetch({
    blogId: id,
  })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  }
}
