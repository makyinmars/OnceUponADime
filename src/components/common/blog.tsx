import HTMLParser from "./htmlParser"
import { Blog } from "@/types/blog"
import { formatDate } from "@/utils/date"

interface BlogProps {
  data: Blog
}

const Blog = ({ data }: BlogProps) => {
  return (
    <div className="grid max-w-md grid-cols-1 p-1 m-1 rounded bg-violet-200">
      <time>{formatDate(data.createdAt)}</time>
      <div className="grid grid-cols-1">
        <h1 className="title place-self-center">{data.title}</h1>
        <HTMLParser content={data.content} />
      </div>
    </div>
  )
}

export default Blog
