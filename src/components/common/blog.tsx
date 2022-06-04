import { Blog } from "@/types/blog"
import React from "react"

interface BlogProps {
  data: Blog
}

const Blog = ({ data }: BlogProps) => {
  console.log(data)
  return <div>Blog</div>
}

export default Blog
