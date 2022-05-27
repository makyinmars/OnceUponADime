import React from "react"
import Image from "next/image"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useGetBlogsQuery } from "@/app/services/blogApi"

const Blogs = () => {
  const { data } = useGetBlogsQuery()

  console.log(data)

  return (
    <div className="grid grid-cols-1 gap-2 m-1">
      {data &&
        data.map((blog) => (
          <div className="flex flex-col bg-yellow-200 rounded" key={blog._id}>
            <h1 className="self-center">{blog.title}</h1>
            <Image src={blog.image} width={400} height={400} alt={blog.title} />
            <h2>By {blog.author}</h2>
            <p>Summary: {blog.summary}</p>
            <p>Content: {blog.content}</p>
            <p>Draft: {blog.draft ? "Yes" : "No"}</p>
            <p>Published: {blog.published ? "Yes" : "No"}</p>
          </div>
        ))}
    </div>
  )
}

export default Blogs
