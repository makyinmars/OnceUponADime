import Link from "next/link"
import { FcHome } from "react-icons/fc"

import { useStore } from "@/utils/zustand"

const Header = () => {
  const { user } = useStore()
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
      {user.isAdmin ? (
        <Link href="/admin">
          <div>Admin</div>
        </Link>
      ) : null}
    </header>
  )
}

export default Header
