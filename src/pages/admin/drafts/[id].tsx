import { useRouter } from "next/router"

import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import { useEffect } from "react"

const DraftBlog = () => {
  const router = useRouter()
  const { user } = useStore()

  const id = router.query.id as string

  const { data, isError, isLoading } = trpc.useQuery([
    "blog.getDraftBlog",
    { id },
  ])

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
      <h2 className="text-center">Draft Blog</h2>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <h3>{data.author}</h3>
          <p>{data.summary}</p>
          <img src={data.imageUrl} alt={data.title} />
          <p>{data.content}</p>
        </div>
      )}
    </div>
  )
}

export default DraftBlog
