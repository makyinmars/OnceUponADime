import Table from "@/components/common/table"
import { trpc } from "@/utils/trpc"

const Boom = () => {
  const { data } = trpc.useQuery(["blog.getPublishedBlogs"])
  return (
    <div className="container mx-auto">{data && <Table blogs={data} />}</div>
  )
}

export default Boom
