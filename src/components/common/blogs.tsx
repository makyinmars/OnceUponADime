import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

import { Blog } from "@prisma/client"
import { formatDateDay } from "@/utils/date"

interface BlogsProps {
  blogs: Blog[] | undefined
}

const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <>
      {blogs &&
        blogs.map((blog) => (
          <Link href={`/blogs/${blog.id}`} key={blog.id}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }}>
              <div className="grid grid-cols-1 gap-2 p-4 mx-auto bg-transparent border rounded cursor-pointer border-slate-700 lg:grid-cols-2 lg:max-w-7xl place-items-center">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={390}
                  height={250}
                  className="rounded-lg"
                  priority={true}
                />
                <div className="flex flex-col w-full gap-4">
                  <h3 className="text-center subtitle">{blog.title}</h3>
                  <p className="p-1 border rounded border-slate-700">
                    {blog.summary}
                  </p>
                  <p className="font-bold text-center lg:text-lg">
                    {formatDateDay(blog.createdAt)}
                  </p>
                  {blog.updatedAt !== blog.createdAt && (
                    <p className="text-center md:text-lg">
                      Last updated {formatDateDay(blog.updatedAt)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
    </>
  )
}

export default Blogs
