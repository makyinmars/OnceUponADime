import React from "react"
import Image from "next/image"
import Link from "next/link"
import { FcRemoveImage } from "react-icons/fc"
import readingTime from "reading-time/lib/reading-time"

import { useDeleteBlogMutation, useGetBlogsQuery } from "@/app/services/blogApi"
import {  useAppSelector } from "@/app/hooks"

const Blogs = () => {
  const user = useAppSelector((state) => state.auth.user)

  const { data } = useGetBlogsQuery()

  const [deleteBlog] = useDeleteBlogMutation()

  const onDeleteBlog = async (blogId: string) => {
    try {
      await deleteBlog(blogId)
    } catch (e) {}
  }

  const readTime = (content: string) => {
    const { text } = readingTime(content)
    return text
  }

  return (
    <div className="grid items-center justify-center max-w-md grid-cols-1 gap-4 p-2 mx-auto sm:max-w-7xl">
      <div className="grid items-center justify-center grid-cols-1 gap-3 mx-2 sm:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((blog) => (
            <div
              className="flex flex-col p-1 bg-gray-100 rounded shadow-lg shadow-violet-800"
              key={blog._id}
            >
              <Image
                className="rounded"
                src={blog.image}
                width={300}
                height={300}
                alt={blog.title}
                priority={true}
              />
              <h1 className="self-center pt-1 text-lg font-semibold md:text-xl">
                {blog.title}
              </h1>
              <div className="p-1 my-1 rounded bg-violet-200">
                <h2>By {blog.author}</h2>
                <p>Summary: {blog.summary}</p>
                <p>Draft: {blog.draft ? "Yes" : "No"}</p>
                <p>Published: {blog.published ? "Yes" : "No"}</p>
                <p>Created: {blog.createdAt}</p>
                <p>Updated: {blog.updatedAt}</p>
              </div>
              <p>Reading time: {readTime(blog.content)}</p>
              <div className="flex justify-between">
                <Link href={`/blog/${blog._id}`}>
                  <a className="flex gap-1 link">Read more {`>`}</a>
                </Link>
                {user?.admin && (
                  <button onClick={() => onDeleteBlog(blog._id)}>
                    <FcRemoveImage className="w-8 h-8" />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Blogs
