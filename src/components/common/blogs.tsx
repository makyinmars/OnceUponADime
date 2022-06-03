import React from "react"
import Image from "next/image"

import { useGetBlogsQuery } from "@/app/services/blogApi"

const Blogs = () => {
  const { data } = useGetBlogsQuery()

  console.log(data)

  return (
    <div className="grid grid-cols-1 gap-3 mx-2">
      {data &&
        data.map((blog) => (
          <div
            className="flex flex-col p-1 bg-gray-100 rounded shadow shadow-xl shadow-violet-800"
            key={blog._id}
          >
            <Image
              className="rounded"
              src={blog.image}
              width={50}
              height={300}
              alt={blog.title}
              priority={true}
            />
            <h1 className="self-center pt-1 font-semibold">{blog.title}</h1>
            <div className="p-1 my-1 rounded bg-violet-200">
              <h2>By {blog.author}</h2>
              <p>Summary: {blog.summary}</p>
              <p>Content: {blog.content}</p>
              <p>Draft: {blog.draft ? "Yes" : "No"}</p>
              <p>Published: {blog.published ? "Yes" : "No"}</p>
              <p>Created: {blog.createdAt}</p>
              <p>Updated: {blog.updatedAt}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Blogs
