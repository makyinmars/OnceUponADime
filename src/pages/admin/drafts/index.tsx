import { useRouter } from "next/router"
import { useEffect } from "react"

import Loading from "src/components/common/loading"
import Table from "src/components/common/table"
import { trpc } from "src/utils/trpc"
import { useStore } from "src/utils/zustand"
import Meta from "src/components/common/meta"

const Drafts = () => {
  const router = useRouter()
  const { user } = useStore()

  const { data, isError, isLoading } = trpc.blog.getDraftBlogs.useQuery()
  const utils = trpc.useContext()

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
    }
  }, [router, user?.isAdmin])

  useEffect(() => {
    if (data) {
      utils.blog.getDraftBlogs.invalidate()
    }
  }, [data, utils])

  if (isError) {
    return <div>Error!</div>
  }
  return (
    <div className="container mx-auto p-2">
      <Meta title="Drafts" description="" keywords="" />
      <h2 className="title mb-4">Drafted Blogs</h2>
      {isLoading && <Loading />}
      {data && <Table blogs={data} />}
    </div>
  )
}

export default Drafts
