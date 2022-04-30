import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { RootState } from "../store"
import { User, AuthResponse, Login, Register } from "@/types/user"

let API_URL

if (process.env.NODE_ENV === "development") {
  API_URL = process.env.NEXT_PUBLIC_API_URL_DEV
} else {
  API_URL = process.env.NEXT_PUBLIC_API_URL_PROD
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/user`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, Register>({
      query: ({ name, email, password }) => ({
        url: "/register",
        method: "POST",
        body: { name, email, password },
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<AuthResponse, Login>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const { useRegisterUserMutation, useLoginMutation } = userApi
