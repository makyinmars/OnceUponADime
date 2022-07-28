import BlogsCommon from "@/components/common/blogs"
import { trpc } from "@/utils/trpc"
import Loading from "@/components/common/loading"

const Blogs = () => {
  const { data, isLoading } = trpc.useQuery(["blog.getPublishedBlogs"])
  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 title">Blogs</h2>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-4">
        {data && <BlogsCommon blogs={data} />}
      </div>
    </div>
  )
}

export default Blogs
