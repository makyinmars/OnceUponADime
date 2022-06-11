declare module "reading-time/lib/reading-time" {
  declare interface ReadingTime {
    text: string
    minutes: number
    words: number
  }
  export default function readingTime(text: string): ReadingTime
}
