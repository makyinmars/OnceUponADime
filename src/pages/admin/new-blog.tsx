import { useRef } from "react"
import { GetServerSidePropsContext } from "next"
import { Editor } from "@tinymce/tinymce-react"
import { Blog } from "@prisma/client"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/router"

import { trpc } from "src/utils/trpc"
import Meta from "src/components/common/meta"
import { ssrInit } from "src/utils/ssg"

const NewBlog = () => {
  const router = useRouter()
  const editorRef = useRef<any>(null)

  const { register, handleSubmit } = useForm<Blog>()

  const createBlog = trpc.blog.createBlog.useMutation()

  const onSubmit: SubmitHandler<Blog> = async (data) => {
    if (editorRef.current) {
      data.content = editorRef.current?.getContent() as string
      const blog = await createBlog.mutateAsync(data)
      if (blog) {
        router.push(`/admin/drafts/${blog.id}`)
      }
    }
  }

  return (
    <div>
      <Meta title="New Blog" description="" keywords="" />
      <h2 className="text-center md:text-2xl pb-2">Create New Blog</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2 justify-items-center"
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "The title is required" })}
          className="input md:w-2/5"
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          {...register("author", { required: "The author is required" })}
          className="input md:w-2/5"
        />
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          rows={3}
          {...register("summary", { required: "The author is required" })}
          className="input md:w-2/5"
        />
        <label htmlFor="image">Image Url</label>
        <input
          type="text"
          id="image"
          {...register("imageUrl", { required: "The image url is required" })}
          className="input md:w-2/5"
        />
        <div>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor as any)}
            initialValue="<p>The content goes here :)</p>"
            init={{
              height: 900,
              width: 900,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "image",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "image " +
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <div className="flex justify-center mt-2">
            <button type="submit" className="button">
              Create Blog
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewBlog

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { ssg, session } = await ssrInit(context)

  const email = session?.user?.email as string

  if (email) {
    const user = await ssg.user.getAdminByEmail.fetch({ email })

    if (user) {
      return {
        props: {
          trpcState: ssg.dehydrate(),
        },
      }
    } else {
      return {
        props: {
          trpcState: ssg.dehydrate(),
        },
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  } else {
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}
