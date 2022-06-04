import parse, { attributesToProps } from "html-react-parser"

interface HTMLParserProps {
  content: string
}

const HTMLParser = ({ content }: HTMLParserProps) => {
  return <div>{parse(content)}</div>
}

export default HTMLParser
