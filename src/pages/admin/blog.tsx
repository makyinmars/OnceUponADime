import React, { useEffect } from "react"
import { useRouter } from "next/router"

import { useAppSelector } from "@/app/hooks"
import Tiny from "@/components/common/tiny"

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
      <h1 className="pb-4 text-center title">Create a new blog</h1>
      <Tiny />
    </div>
  )
}

export default BlogPage
