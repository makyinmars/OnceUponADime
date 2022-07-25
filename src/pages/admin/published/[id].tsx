import { useRouter } from "next/router"
import { useEffect } from "react"

import { trpc } from "@/utils/trpc"
import HtmlParser from "@/components/common/html-parser"
import { useStore } from "@/utils/zustand"
import Loading from "@/components/common/loading"

const PublishedBlog = () => {
  const router = useRouter()
  const { user } = useStore()
  const id = router.query.id as string

  const { data, isError, isLoading } = trpc.useQuery([
    "blog.getAdminPublishedBlog",
    { id },
  ])

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
    }
  }, [router, user?.isAdmin])

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div>
      <h2 className="title">Blog Published</h2>
      {isLoading && <Loading />}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <h3>{data.author}</h3>
          <p>{data.summary}</p>
          <img src={data.imageUrl} alt={data.title} />
          <HtmlParser content={data.content} />
        </div>
      )}
    </div>
  )
}

export default PublishedBlog
