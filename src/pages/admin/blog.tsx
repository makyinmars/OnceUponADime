import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { BaseEditor, Descendant } from "slate"
import { ReactEditor } from "slate-react"

import { useAppSelector } from "@/app/hooks"

type CustomText = { text: string }
type CustomElement = { type: "paragraph"; children: CustomText[] }

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
