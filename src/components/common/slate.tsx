import React, { useEffect, useState } from "react"
import { BaseEditor, createEditor, Descendant } from "slate"
import { ReactEditor, withReact, Slate, Editable } from "slate-react"

interface CustomText {
  text: string
}
interface CustomElement {
  type: "paragraph"
  children: CustomText[]
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "A line of text in a paragraph." }] },
]

const SlateBlog = () => {
  const [editor] = useState(() => withReact(createEditor()))
  return (
    <Slate editor={editor} value={initialValue}>
      <Editable />
    </Slate>
  )
}

export default SlateBlog
