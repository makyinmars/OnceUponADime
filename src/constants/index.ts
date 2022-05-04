export let API_URL: string | undefined
export let TINY_API_TOKEN: string | undefined

if (process.env.NODE_ENV === "development") {
  API_URL = process.env.NEXT_PUBLIC_API_URL_DEV
  TINY_API_TOKEN = process.env.NEXT_PUBLIC_API_TINY_TOKEN
} else {
  API_URL = process.env.NEXT_PUBLIC_API_URL_PROD
  TINY_API_TOKEN = process.env.NEXT_PUBLIC_API_TINY_TOKEN
}
