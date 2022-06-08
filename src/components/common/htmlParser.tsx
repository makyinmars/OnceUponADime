import parse, { HTMLReactParserOptions, Element } from "html-react-parser"

interface HTMLParserProps {
  content: string
}

const HTMLParser = ({ content }: HTMLParserProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs.h1) {
        return <h1 className="title">{}</h1>
      }
    },
  }
  return <div className="pt-1">{parse(content)}</div>
}

export default HTMLParser
