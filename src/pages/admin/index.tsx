import React, { useEffect } from "react"
import { FcApproval } from "react-icons/fc"
import { useRouter } from "next/router"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { removeCredentials } from "@/app/features/auth/authSlice"

const AdminPage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter()
  const dispatch = useAppDispatch()

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
      {user && user.admin && (
        <>
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            {`Welcome ${user.name}!`} <FcApproval />
          </div>
          <div className="flex-col items-center gap-2 container-button">
            <button
              className="button"
              onClick={() => router.push("/admin/blogs")}
            >
              Blogs
            </button>
            <button
              className="button"
              onClick={() => router.push("/admin/blog")}
            >
              Create a new blog
            </button>
            <button
              className="button"
              onClick={() => dispatch(removeCredentials())}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminPage
