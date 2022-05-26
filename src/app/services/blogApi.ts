import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Blog } from "@/types/blog"
import { API_URL } from "@/constants"
import { RootState } from "../store"

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/blog`,
    // By default, if we have a token in the store, let's use that for authenticated requests
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    getBlog: builder.query<Blog, string>({
      query: (_id) => `/${_id}`,
      providesTags: ["Blog"],
    }),
    updateBlog: builder.mutation<Blog, Blog>({
      query: ({ _id, author, summary, image, content, draft, published }) => ({
        url: `/${_id}`,
        method: "PUT",
        body: { author, summary, image, content, draft, published },
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation<Blog, string>({
      query: (_id) => ({
        url: `/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi
