import { useRouter } from "next/router"

import { trpc } from "@/utils/trpc"
import HtmlParser from "@/components/common/html-parser"

const PublishedBlog = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { data, isError, isLoading } = trpc.useQuery([
    "blog.getPublishedBlog",
    { id },
  ])

  return (
    <div>
      <h2 className="text-center">Blog Published</h2>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
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
