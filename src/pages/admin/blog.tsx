import React, { useEffect } from "react"
import { useRouter } from "next/router"

import { useAppSelector } from "@/app/hooks"

const BlogPage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
    if (user && user.admin === false) {
      router.push("/")
    }
  }, [router, user])

  return (
    <div>
      <h1>Blog Page</h1>
    </div>
  )
}

export default BlogPage
