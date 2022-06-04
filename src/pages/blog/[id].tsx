import React from "react"
import { useRouter } from "next/router"

import { useGetBlogQuery } from "@/app/services/blogApi"

const BlogId = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isError, isLoading, error } = useGetBlogQuery(id as string, {
    refetchOnMountOrArgChange: true,
  })

  return <div>BlogId</div>
}

export default BlogId
