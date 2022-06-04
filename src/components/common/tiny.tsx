import React, { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { useForm, SubmitHandler } from "react-hook-form"

import { Blog } from "@/types/blog"
import { useCreateBlogMutation } from "@/app/services/blogApi"

const Tiny = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Blog>()

  const editorRef = useRef<any>(null)

  const [createBlog, { isError, error, isLoading }] = useCreateBlogMutation()

  const onBlogSubmit: SubmitHandler<Blog> = async (data) => {
    if (editorRef.current) {
      data.content = editorRef.current?.getContent() as string
      data.draft = true
      data.published = false
    }
    try {
      const user = await createBlog(data).unwrap()
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <form
        onSubmit={handleSubmit(onBlogSubmit)}
        className="grid grid-cols-1 gap-1"
      >
        <label htmlFor="author" className="label">
          Author
        </label>
        <input
          type="text"
          id="author"
          {...register("author", { required: "The author is required" })}
          className="input"
        />
        {errors.author && <p className="error-form">{errors.author.message}</p>}

        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "The title is required" })}
          className="input"
        />
        {errors.title && <p className="error-form">{errors.title.message}</p>}

        <label htmlFor="summary" className="label">
          Summary
        </label>
        <textarea
          id="summary"
          rows={3}
          cols={4}
          {...register("summary", { required: "The summary is required" })}
          className="input"
        />
        {errors.summary && (
          <p className="error-form">{errors.summary.message}</p>
        )}

        <label htmlFor="image" className="label">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          {...register("image", { required: "The image is required" })}
          className="input"
        />
        {errors.image && <p className="error-form">{errors.image.message}</p>}

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
        <div className="flex justify-center py-2">
          <button className="button" type="submit">
            Log editor content
          </button>
        </div>
      </form>
    </div>
  )
}

export default Tiny
