import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"

import { trpc } from "src/utils/trpc"
import Loading from "src/components/common/loading"
import BlogCommon from "src/components/common/blog"
import Meta from "src/components/common/meta"
import BlogModal from "src/components/common/blog-modal"
import PublishOrDraftBlog from "src/components/common/publish-draft-blog"
import { ssrInit } from "src/utils/ssg"

const PublishedBlog = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isError, isLoading } = trpc.blog.getAdminPublishedBlog.useQuery(
    { id }
  )
  const { data: blogComments } = trpc.comment.getCommentsByBlogId.useQuery({
    blogId: id,
  })

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Meta title="Published Blog" description="" keywords="" />
      <h2 className="title mb-4">Blog Published</h2>
      {isLoading && <Loading />}
      {data && (
        <div className="flex flex-col gap-4">
          <PublishOrDraftBlog
            id={data.id}
            draft={data.draft}
            published={data.published}
          />
          <BlogModal
            id={data.id}
            title={data.title}
            author={data.author}
            summary={data.summary}
            content={data.content}
            imageUrl={data.imageUrl}
            draft={data.draft}
            published={data.published}
          />
        </div>
      )}
      <BlogCommon blog={data} blogComments={blogComments} />
    </div>
  )
}

export default PublishedBlog

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { ssg, session } = await ssrInit(context)

  const email = session?.user?.email as string

  if (email) {
    const user = await ssg.user.getAdminByEmail.fetch({ email })

    if (user) {
      const id = context.params?.id as string
      await ssg.blog.getAdminPublishedBlog.prefetch({ id })
      await ssg.comment.getCommentsByBlogId.prefetch({
        blogId: id,
      })
      return {
        props: {
          trpcState: ssg.dehydrate(),
          id,
        },
      }
    } else {
      return {
        props: {
          trpcState: ssg.dehydrate(),
          id: null,
        },
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  } else {
    return {
      props: {
        trpcState: ssg.dehydrate(),
        id: null,
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}
