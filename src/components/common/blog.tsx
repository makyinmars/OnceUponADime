import HTMLParser from "./htmlParser"
import { Blog } from "@/types/blog"
import { formatDate } from "@/utils/date"
import Image from "next/image"

interface BlogProps {
  blog: Blog
}

const Blog = ({ blog }: BlogProps) => {
  return (
    <div className="max-w-lg px-3 py-1 mx-auto rounded sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl bg-violet-200">
      <div className="flex flex-col">
        <h1 className="title place-self-center">{blog.title}</h1>
        <time className="pb-1 italic">{formatDate(blog.createdAt)}</time>
        <h3 className="py-1 text-lg">{blog.summary}</h3>
        <div className="flex self-center">
          <Image
            src={blog.image}
            alt={blog.title}
            height={300}
            width={300}
            className="rounded"
          />
        </div>
        <HTMLParser content={blog.content} />
      </div>
    </div>
  )
}

export default Blog
