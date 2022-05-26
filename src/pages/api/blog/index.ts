import type { NextApiResponse, NextApiRequest } from "next"

import connectDB from "@/server/database/db"
import BlogModel from "@/server/models/blogModel"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Get all blogs
    try {
      const blogs = await BlogModel.find()
      res.status(200).json(blogs)
    } catch (error) {
      res.status(500).json(error)
    }
  } else if (req.method === "POST") {
    try {
      const { author, summary, image, content, draft, published } = req.body
      const blog = new BlogModel({
        author,
        summary,
        image,
        content,
        draft,
        published,
      })
      await blog.save()
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default connectDB(handler)
