import type { NextApiResponse, NextApiRequest } from "next"

import connectDB from "@/server/database/db"
import BlogModel from "@/server/models/blogModel"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Get all blogs
    const blogs = await BlogModel.find()
    res.status(200).json(blogs)
  } else if (req.method === "POST") {
    const { author, content, draft, published } = req.body
    const blog = new BlogModel({ author, content, draft, published })
    await blog.save()
    res.status(200).json(blog)
  }
}

export default connectDB(handler)
