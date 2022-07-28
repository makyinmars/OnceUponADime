import Link from "next/link"
import { motion } from "framer-motion"

import { trpc } from "@/utils/trpc"
import Loading from "@/components/common/loading"
import { formatDateDay } from "@/utils/date"

const Blogs = () => {
  const { data, isLoading } = trpc.useQuery(["blog.getPublishedBlogs"])
  return (
    <div className="container mx-auto p-4">
      <h2 className="title mb-4">Blogs</h2>
      {isLoading && <Loading />}
      <div className="grid grid-cols-3 gap-4 bg-transparent">
        {data &&
          data.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <div className="border rounded border-slate-700 p-2 flex flex-col gap-2 cursor-pointer">
                  <h2 className="text-lg font-bold md:text-xl lg:text-2xl text-center">
                    {blog.title}
                  </h2>
                  <p className="font-bold md:text-lg">
                    Writen by {blog.author}
                  </p>
                  <p className="p-1 border border-slate-700 rounded">
                    {blog.summary}
                  </p>
                  <div className="flex justify-center">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="h-72 w-full rounded"
                    />
                  </div>
                  <p className="text-center md:text-lg">
                    {formatDateDay(blog.updatedAt)}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Blogs
