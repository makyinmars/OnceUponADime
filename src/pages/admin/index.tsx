import React, { useEffect } from "react"
import { useRouter } from "next/router"

import { useAppSelector } from "@/app/hooks"

const AdminPage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter()

  useEffect(() => {
    if (user && user.admin === false) {
      router.push("/")
    }
  }, [router, user, user?.admin])
  return <div>AdminPage</div>
}

export default AdminPage
