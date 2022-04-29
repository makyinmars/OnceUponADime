import React from "react"

import { useAppSelector } from "@/app/hooks"

const AdminPage = () => {
  const user = useAppSelector((state) => state.auth.user)
  console.log(user)
  return <div>AdminPage</div>
}

export default AdminPage
