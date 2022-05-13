import React, { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { useForm, SubmitHandler } from "react-hook-form"

import { Blog } from "@/types/blog"

const Tiny = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Blog>()

  const onBlogSubmit: SubmitHandler<Blog> = async (data) => console.log(data)

  const editorRef = useRef<any>(null)

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
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
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor as any)}
          initialValue="<p>This is the initial content of the editor.</p>"
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
        <input
          type="text"
          {...register("content", { required: "The content is required" })}
          className="input hidden"
          defaultValue={editorRef.current.getContent()}
        />
        {errors.author && <p className="error-form">{errors.author.message}</p>}
        <button className="button" type="submit">
          Log editor content
        </button>
      </form>
    </div>
  )
}

export default Tiny
