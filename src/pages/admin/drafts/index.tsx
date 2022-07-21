import { trpc } from "@/utils/trpc"
import Link from "next/link"

const Drafts = () => {
  const { data, isError, isLoading } = trpc.useQuery(["blog.getDraftBlogs"])
  return (
    <div>
      <h2>Drafts</h2>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <div>
          {data.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <h3>{blog.author}</h3>
              <p>{blog.summary}</p>
              <img src={blog.imageUrl} alt={blog.title} />
              <p>{blog.content}</p>
              <Link href={`/admin/drafts/${blog.id}`}>
                <p>View Draft</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Drafts
