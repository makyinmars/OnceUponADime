import { Document, model, models, Schema } from "mongoose"

export interface Blog extends Document {
  author: string
  summary: string
  image: string
  content: string
  draft: boolean
  published: boolean
}

// Create a schema using typescript with mongoose
const blogSchema = new Schema<Blog>(
  {
    author: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    draft: {
      type: Boolean,
      default: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const BlogModel = models.Blog || model<Blog>("Blog", blogSchema)

export default BlogModel
