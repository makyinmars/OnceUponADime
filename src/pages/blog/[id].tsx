import React from "react"
import { useRouter } from "next/router"

import { useGetBlogQuery } from "@/app/services/blogApi"
import Blog from "@/components/common/blog"

const BlogId = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isError, isLoading, error } = useGetBlogQuery(id as string, {
    refetchOnMountOrArgChange: true,
  })

  return <>{data && <Blog data={data} />}</>
}

export default BlogId
