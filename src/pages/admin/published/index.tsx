import { useRouter } from "next/router"
import { useEffect } from "react"

import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import Loading from "@/components/common/loading"
import Table from "@/components/common/table"
import Meta from "@/components/common/meta"

const Published = () => {
  const { user } = useStore()
  const { data, isError, isLoading } = trpc.useQuery([
    "blog.getAdminPublishedBlogs",
  ])

  const router = useRouter()
  const utils = trpc.useContext()
  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
    }
  }, [router, user?.isAdmin])

  useEffect(() => {
      if (data) {
        utils.invalidateQueries(["blog.getAdminPublishedBlog"])
    }
  }, [data, utils])

  if (isError) {
    return <div>Error!</div>
  }

  return (
    <div className="container mx-auto p-2">
      <Meta title="Published blogs" description="" keywords="" />
      <h2 className="title mb-4">Published Blogs</h2>
      {isLoading && <Loading />}
      {data && <Table blogs={data} />}
    </div>
  )
}

export default Published
