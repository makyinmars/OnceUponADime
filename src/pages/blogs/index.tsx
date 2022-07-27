import { trpc } from "@/utils/trpc"
import HtmlParser from "@/components/common/html-parser"
import Link from "next/link"
import Loading from "@/components/common/loading"

const Blogs = () => {
  const { data, isLoading } = trpc.useQuery(["blog.getPublishedBlogs"])
  return (
    <div>
      <h2 className="title">Blogs</h2>
      {isLoading && <Loading />}
      <div className="grid grid-cols-3 gap-4 bg-transparent">
        {data &&
          data.map((blog) => (
            <div
              key={blog.id}
              className="text-center border-2 rounded border-slate-700"
            >
              <h3>{blog.title}</h3>
              <h3>{blog.author}</h3>
              <p>{blog.summary}</p>
              <img src={blog.imageUrl} alt={blog.title} className="h-72 w-72" />
              <HtmlParser content={blog.content} />
              <Link href={`/blogs/${blog.id}`}>
                <p>View this blog</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Blogs
