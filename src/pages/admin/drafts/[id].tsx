import { useRouter } from "next/router"
import { useEffect } from "react"

import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import Loading from "@/components/common/loading"
import BlogCommon from "@/components/common/blog"
import Meta from "@/components/common/meta"
import BlogModal from "@/components/common/blog-modal"

const DraftBlog = () => {
  const router = useRouter()
  const { user } = useStore()

  const id = router.query.id as string

  const { data, isError, isLoading } = trpc.useQuery([
    "blog.getDraftBlog",
    { id },
  ])
  const { data: blogComments } = trpc.useQuery([
    "comment.getCommentsByBlogId",
    { blogId: id },
  ])

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
        )}
        <BlogCommon blog={data} blogComments={blogComments} />
      </div>
    </div>
  )
}

export default DraftBlog
