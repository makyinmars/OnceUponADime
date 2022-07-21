import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { FcHome } from "react-icons/fc"

import { useStore } from "@/utils/zustand"
import { useRouter } from "next/router"
import { useEffect } from "react"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter()
  const { removeUser } = useStore()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
      removeUser()
      router.push("/")
    }
  }, [removeUser, router, session])

  return (
    <div>
      <div>
        <Link href="/admin">
          <a className="flex items-center justify-center gap-4">
            <FcHome className="w-8 h-8" />
            <span>Dashboard</span>
          </a>
        </Link>
        <div className="flex justify-evenly">
          <Link href="/admin/drafts">
            <h2>Drafts</h2>
          </Link>
          <Link href="/admin/published">
            <h2>Published</h2>
          </Link>
          <Link href="/admin/new-blog">
            <h2>Create New Blog</h2>
          </Link>
          {session && (
            <div className="flex flex-col items-center justify-center gap-2">
              <div onClick={() => signOut()}>Sign out</div>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default AdminLayout
