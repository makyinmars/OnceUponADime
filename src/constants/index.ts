export const API_URL =
  process.env.ENV === "prod" ? process.env.API_URL : "http://localhost:3000"

export const API_URL_TEST =
  process.env.ENV === "dev" ? "http://localhost:3000" : process.env.API_URL
