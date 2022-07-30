import { useRouter } from "next/router"

import { trpc } from "@/utils/trpc"
import BlogCommon from "@/components/common/blog"
import Loading from "@/components/common/loading"

const Blog = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { data, isLoading } = trpc.useQuery(["blog.getPublishedBlog", { id }])
  const { data: blogComments } = trpc.useQuery([
    "comment.getCommentsByBlogId",
    { blogId: id },
  ])

  return (
    <div className="container mx-auto p-4">
      {isLoading && <Loading />}
      <BlogCommon blog={data} blogComments={blogComments} />
    </div>
  )
}

export default Blog
