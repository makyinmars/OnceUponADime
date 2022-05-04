import React, { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"

const Tiny = () => {
  const editorRef = useRef<any>(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  return (
    <div className="flex justify-center">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor as any)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 800,
          width: 800,
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
      <button onClick={log}>Log editor content</button>
    </div>
  )
}

export default Tiny
