import { useRouter } from "next/router"
import { useEffect } from "react"

import Loading from "@/components/common/loading"
import Table from "@/components/common/table"
import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"

const Drafts = () => {
  const router = useRouter()
  const { user } = useStore()

  const { data, isError, isLoading } = trpc.useQuery(["blog.getDraftBlogs"])

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
    }
  }, [router, user?.isAdmin])

  if (isError) {
    return <div>Error!</div>
  }
  return (
    <div className="container mx-auto p-2">
      <h2 className="title mb-4">Drafted Blogs</h2>
      {isLoading && <Loading />}
      {data && <Table blogs={data} />}
    </div>
  )
}

export default Drafts
