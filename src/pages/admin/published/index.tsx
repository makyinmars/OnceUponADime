import Link from "next/link"
import { useRouter } from "next/router"

import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import { useEffect } from "react"

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
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-center">Published</h2>
      {data && (
        <div>
          {data.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <h3>{blog.author}</h3>
              <p>{blog.summary}</p>
              <img src={blog.imageUrl} alt={blog.title} />
              <p>{blog.content}</p>
              <Link href={`/admin/published/${blog.id}`}>
                <p>View Published Bog</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Published
