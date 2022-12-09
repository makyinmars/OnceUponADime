import Link from "next/link"
import { FcHome } from "react-icons/fc"
import Meta from "src/components/common/meta"
import { GetServerSidePropsContext } from "next"

import { ssrInit } from "src/utils/ssg"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <Meta title="Admin" description="" keywords="" />
      <div>
        <Link href="/admin" className="flex items-center justify-center gap-4">
          <FcHome className="w-8 h-8" />
          <span>Dashboard</span>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { ssg, session } = await ssrInit(context)

  const email = session?.user?.email as string

  if (email) {
    const user = await ssg.user.getAdminByEmail.fetch({ email })

    if (user) {
      return {
        props: {
          trpcState: ssg.dehydrate(),
        },
      }
    }else{
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    }

    }
  } else {
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}
