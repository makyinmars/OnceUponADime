import type { NextApiResponse, NextApiRequest } from "next"

import BlogModel from "@/server/models/blogModel"
import connectDB from "@/server/database/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query
      const blog = await BlogModel.findById(id)
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json(error)
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query
      const { author, content, draft, published } = req.body

      const blog = await BlogModel.findById(id)

      if (blog) {
        blog.author = author
        blog.content = content
        blog.draft = draft
        blog.published = published

        const updatedBlog = await blog.save()

        res.status(200).json(updatedBlog)
      } else {
        res.status(404).json({ message: "Blog not found" })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body
    try {
      await BlogModel.findByIdAndDelete(id)
      res.status(200).json({ message: "Blog deleted" })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default connectDB(handler)
