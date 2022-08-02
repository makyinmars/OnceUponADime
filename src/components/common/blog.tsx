import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect } from "react"
import { Comment, Blog } from "@prisma/client"

import { trpc } from "@/utils/trpc"
import HtmlParser from "@/components/common/html-parser"
import Meta from "./meta"
import { formatDateDay } from "@/utils/date"

interface BlogProps {
  blog: Blog | undefined
  blogComments: Comment[] | undefined
}

const Blog = ({ blog, blogComments }: BlogProps) => {
  return (
    <>
      {blog && (
        <div className="flex flex-col gap-2">
          <Meta title={blog.title} description={`${blog.summary}`} keywords={`${blog.title}, economics blog`} />
          <h3 className="text-lg font-bold md:text-xl lg:text-2xl text-center">
            {blog.title}
          </h3>
          <p className="font-bold md:text-lg">Written by {blog.author}</p>
          <p className="md:text-lg">{formatDateDay(blog.updatedAt)}</p>
          <p className="p-1 border border-slate-700 rounded">{blog.summary}</p>
          <div className="border border-slate-700 my-2" />
          <HtmlParser content={blog.content} />
          <CreateComment blogId={blog.id} />
          <div className="p-2 flex flex-col gap-2 border rounded border-slate-700">
            {blogComments && blogComments.length >= 1 ? (
              blogComments.map((comment) => (
                <div key={comment.id}>
                  <p className="font-bold">
                    {comment.firstName} {comment.lastName} -
                    {formatDateDay(comment.updatedAt)}
                  </p>
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <p>Nothing to see here folks</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Blog

interface CreateCommnetProps {
  blogId: string
}

const CreateComment = ({ blogId }: CreateCommnetProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Comment>()

  const utils = trpc.useContext()

  const createComment = trpc.useMutation("comment.createComment", {
    async onSuccess() {
      await utils.invalidateQueries(["comment.getCommentsByBlogId", { blogId }])
    },
  })

  const onSubmit: SubmitHandler<Comment> = async (data) => {
    try {
      await createComment.mutateAsync(data)
    } catch {}
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <div className="my-2">
      <div className="border rounded border-slate-700 p-2">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
          />
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
          />
          <label htmlFor="lastName">Content</label>
          <textarea
            cols={4}
            rows={4}
            id="lastName"
            {...register("content", { required: "Last name is required" })}
          />

          <input
            className="hidden"
            defaultValue={blogId}
            type="text"
            {...register("blogId", { required: "Blog id is required" })}
          />

          <div className="flex justify-center my-2">
            <button type="submit" className="button">
              Add comment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
