import Link from "next/link"
import { FcHome } from "react-icons/fc"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { useStore } from "@/utils/zustand"
import Meta from "@/components/common/meta"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter()
  const { user } = useStore()

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
    }
  }, [router, user?.isAdmin])

  return (
    <div>
      <Meta title="Admin" description="" keywords="" />
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
        </div>
      </div>
      {children}
    </div>
  )
}

export default AdminLayout
