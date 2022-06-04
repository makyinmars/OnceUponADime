import Image from "next/image"

import HTMLParser from "./htmlParser"
import { Blog } from "@/types/blog"
import { formatDate } from "@/utils/date"
import blog from "@/pages/api/blog"

interface BlogProps {
  data: Blog
}

const Blog = ({ data }: BlogProps) => {
  return (
    <div className="grid max-w-lg grid-cols-1 px-3 py-1 mx-auto rounded sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl bg-violet-200">
      <div className="grid grid-cols-1">
        <h1 className="title place-self-center">{data.title}</h1>
        <h3 className="py-1 text-lg">{data.summary}</h3>
        <time className="pb-1 italic">{formatDate(data.createdAt)}</time>
        <Image
          className="rounded"
          src={data.image}
          width={300}
          height={300}
          priority={true}
          alt={data.title}
        />
        <HTMLParser content={data.content} />
      </div>
    </div>
  )
}

export default Blog
