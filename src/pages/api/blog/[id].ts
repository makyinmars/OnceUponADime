import type { NextApiResponse, NextApiRequest } from "next"

import BlogModel from "@/server/models/blogModel"
import connectDB from "@/server/database/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query
    try {
      const blog = await BlogModel.findById(id)
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json(error)
    }
  } else if (req.method === "PUT") {
    const { id, author, content, draft, published } = req.body
    try {
      const blog = await BlogModel.findByIdAndUpdate(id, {
        author,
        content,
        draft,
        published,
      })
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json(error)
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body
    try {
      const blog = await BlogModel.findByIdAndDelete(id)
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default connectDB(handler)
