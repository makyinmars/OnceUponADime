import readingTime from "reading-time/lib/reading-time"

export const readTime = (content: string) => {
  const { text } = readingTime(content)
  return text
}
