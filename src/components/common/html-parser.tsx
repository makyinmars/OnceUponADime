import parse from "html-react-parser"

interface HtmlParserProps {
  content: any
}

const HtmlParser = ({ content }: HtmlParserProps) => {
  return <div>{parse(content)}</div>
}

export default HtmlParser
