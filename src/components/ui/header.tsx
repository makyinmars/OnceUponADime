import Link from "next/link"
import { FcHome } from "react-icons/fc"

import { useStore } from "@/utils/zustand"
import { useEffect, useState } from "react"
import { User } from "@prisma/client"

const Header = () => {
  const { user } = useStore()

  const [u, setU] = useState<User | null>(null)

  useEffect(() => {
    setU(user)
  }, [user])

  return (
    <header className="flex items-center pb-4 text-lg font-bold justify-evenly">
      <Link href="/">
        <a>
          <FcHome className="w-8 h-8" />
        </a>
      </Link>
      <Link href="/blogs">
        <div>blogs</div>
      </Link>
      <div>search</div>
      {u?.isAdmin && (
        <Link href="/admin">
          <div>admin</div>
        </Link>
      )}
    </header>
  )
}

export default Header
