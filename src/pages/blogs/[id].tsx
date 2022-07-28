import { useRouter } from "next/router"
import { useForm, SubmitHandler } from "react-hook-form"
import { Comment } from "@prisma/client"

import { trpc } from "@/utils/trpc"
import HtmlParser from "@/components/common/html-parser"
import Loading from "@/components/common/loading"
import { formatDateDay } from "@/utils/date"
import { useEffect } from "react"

const Blog = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { data, isLoading } = trpc.useQuery(["blog.getPublishedBlog", { id }])
  const { data: blogComments, isLoading: isLoadingComments } = trpc.useQuery([
    "comment.getCommentsByBlogId",
    { blogId: id },
  ])
  return (
    <div className="container mx-auto p-4">
      {isLoading && <Loading />}
      {data && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold md:text-xl lg:text-2xl text-center">
            {data.title}
          </h3>
          <p className="font-bold md:text-lg">Written by {data.author}</p>
          <p className="md:text-lg">{formatDateDay(data.updatedAt)}</p>
          <p className="p-1 border border-slate-700 rounded">{data.summary}</p>
          <div className="border border-slate-700 my-2" />
          <HtmlParser content={data.content} />
          <CreateComment blogId={data.id} />
        </div>
      )}
    </div>
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
      const newComment = await createComment.mutateAsync(data)
      if (newComment) {
        console.log(newComment)
      }
    } catch {}
  }

  useEffect(() => {
    if(isSubmitSuccessful){
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <div className="mt-2">
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
            <button type="submit" className="p-2 rounded bg-slate-200">
              Add comment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
