import React, { useEffect } from "react"
import { useRouter } from "next/router"

import { useAppSelector } from "@/app/hooks"

const AdminPage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push("/")
    }
  }, [router, user])
  return <div>AdminPage</div>
}

export default AdminPage
