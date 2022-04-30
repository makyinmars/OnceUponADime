export let API_URL: string | undefined
if (process.env.NODE_ENV === "development") {
  API_URL = process.env.NEXT_PUBLIC_API_URL_DEV
} else {
  API_URL = process.env.NEXT_PUBLIC_API_URL_PROD
}
