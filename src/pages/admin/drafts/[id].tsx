import { useRouter } from "next/router"
import { useEffect } from "react"

import { trpc } from "src/utils/trpc"
import { useStore } from "src/utils/zustand"
import Loading from "src/components/common/loading"
import BlogCommon from "src/components/common/blog"
import Meta from "src/components/common/meta"
import BlogModal from "src/components/common/blog-modal"
import PublishOrDraftBlog from "src/components/common/publish-draft-blog"

const DraftBlog = () => {
  const router = useRouter()
  const { user } = useStore()

  const id = router.query.id as string

  const { data, isError, isLoading } = trpc.blog.getDraftBlog.useQuery({ id })
  const { data: blogComments } = trpc.comment.getCommentsByBlogId.useQuery({
    blogId: id,
  })

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
    }
  }, [router, user?.isAdmin])

  if (isError) {
    return <div>Error!</div>
  }
  return (
    <div>
      <div className="container mx-auto p-4">
        <Meta title="Drafted Blog" description="" keywords="" />
        <h2 className="title mb-4">Blog Drafted</h2>
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
    </div>
  )
}

export default DraftBlog
