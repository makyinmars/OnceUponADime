import { trpc } from "@/utils/trpc"
import HtmlParser from "@/components/common/html-parser"
import Link from "next/link"

const Blogs = () => {
  const { data, isError, isLoading } = trpc.useQuery(["blog.getPublishedBlogs"])
  return (
    <div>
      <h2 className="text-center">Blogs</h2>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data &&
        data.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <h3>{blog.author}</h3>
            <p>{blog.summary}</p>
            <img src={blog.imageUrl} alt={blog.title} />
            <HtmlParser content={blog.content} />
            <Link href={`/blogs/${blog.id}`}>
              <p>View this blog</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Blogs
