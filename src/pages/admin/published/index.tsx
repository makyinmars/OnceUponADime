import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import Loading from "@/components/common/loading"
import { formatDate } from "@/utils/date"
import EditBlog from "@/components/common/edit-blog"

const Published = () => {
  const { user } = useStore()
  const { data, isError, isLoading } = trpc.useQuery([
    "blog.getAdminPublishedBlogs",
  ])

  const router = useRouter()
  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
    }
  }, [router, user?.isAdmin])

  if (isError) {
    return <div>Error!</div>
  }

  return (
    <div className="container mx-auto p-2">
      <h2 className="title">Published</h2>
      {isLoading && <Loading />}
      {data && (
        <div>
          {data.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <h3>{blog.author}</h3>
              <time>{formatDate(blog.createdAt)}</time>
              <p>{blog.summary}</p>
              <img src={blog.imageUrl} alt={blog.title} />
              <p>{blog.content}</p>
              <Link href={`/admin/published/${blog.id}`}>
                <p>View Published Bog</p>
              </Link>
              <div>
                <EditBlog />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Published
