import React, { useCallback, useMemo } from "react"
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Node,
} from "slate"
import { ReactEditor, withReact, Slate, Editable } from "slate-react"
interface CustomText {
  text: string
}
interface CustomElement {
  type: "paragraph" | "code"
  children: CustomText[]
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

// Define a serializing function that takes a value and returns a string.
const serialize = (value: any) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  )
}

// Define a deserializing function that takes a string and returns a value.
const deserialize = (value: any) => {
  // Return a value array of children derived by splitting the string.
  return value.split("\n").map((line: any) => {
    return {
      children: [{ text: line }],
    }
  })
}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}
const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}

const SlateBlog = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const initialValue: any = useMemo(
    deserialize(localStorage.getItem("content")) || "",
    []
  )

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        )
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          localStorage.setItem("content", content)
        }
      }}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === "`" && event.ctrlKey) {
            event.preventDefault()
            const [match] = Editor.nodes(editor, {
              match: (n) => n.type === "code",
            })
            Transforms.setNodes(
              editor,
              { type: match ? "paragraph" : "code" },
              { match: (n) => Editor.isBlock(editor, n) }
            )
          }
        }}
      />
    </Slate>
  )
}

export default SlateBlog
