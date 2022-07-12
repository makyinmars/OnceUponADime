import React from "react"
import Image from "next/image"
import Link from "next/link"
import { FcRemoveImage } from "react-icons/fc"

import { useDeleteBlogMutation, useGetBlogsQuery } from "@/app/services/blogApi"
import { useAppSelector } from "@/app/hooks"
import { readTime } from "@/utils/readingTime"

const Blogs = () => {
  const user = useAppSelector((state) => state.auth.user)

  const { data } = useGetBlogsQuery()

  const [deleteBlog] = useDeleteBlogMutation()

  const onDeleteBlog = async (blogId: string) => {
    try {
      await deleteBlog(blogId)
    } catch (e) {}
  }

  return (
    <div className="grid items-center justify-center max-w-md grid-cols-1 gap-4 p-2 mx-auto sm:max-w-7xl">
      <div className="grid items-center justify-center grid-cols-1 gap-4 mx-2 sm:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((blog, i) => (
            <div className="flex flex-col p-1 rounded" key={i}>
              <h1 className="self-center pt-1 text-lg font-semibold md:text-xl">
                {blog.title}
              </h1>
              <Image
                className="rounded"
                src={blog.image}
                width={300}
                height={300}
                alt={blog.title}
                priority={true}
              />
              <p>Reading time: {readTime(blog.content)}</p>
              <div className="p-1 my-1 rounded">
                <p>Summary: {blog.summary}</p>
              </div>
              <div className="flex justify-between">
                <Link href={`/blog/${blog._id}`}>
                  <a className="flex gap-1 text-lg link">Read more {`>`}</a>
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
