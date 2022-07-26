import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Blog } from "@prisma/client"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { trpc } from "@/utils/trpc"
import { useStore } from "@/utils/zustand"
import Loading from "@/components/common/loading"
import { formatDate } from "@/utils/date"

const Published = () => {
  const columnHelper = createColumnHelper<Blog>()

  const columns = [
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: () => <span>Title</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("author", {
      cell: (info) => info.getValue(),
      header: () => <span>Author</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("draft", {
      cell: (info) => info.getValue(),
      header: () => <span>Draft</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("published", {
      cell: (info) => info.getValue(),
      header: () => <span>Published</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("author", {
      cell: (info) => info.getValue(),
      header: () => <span>Author</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => formatDate(info.getValue()),
      header: () => <span>Author</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("updatedAt", {
      cell: (info) => formatDate(info.getValue()),
      header: () => <span>Author</span>,
      footer: (info) => info.column.id,
    }),
  ]

  const { user } = useStore()
  const { data, isError, isLoading } = trpc.useQuery([
    "blog.getAdminPublishedBlogs",
  ])

  console.log(data)
  const router = useRouter()
  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/")
    }
  }, [router, user?.isAdmin])

  if (isError) {
    return <div>Error!</div>
  }

  return (
    <div>
      <h2 className="title">Published</h2>
      {isLoading && <Loading />}
      {data && (
        <div>
          {data.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <h3>{blog.author}</h3>
              <time>{formatDate(blog.createdAt)}</time>
              <p>{blog.summary}</p>
              <img src={blog.imageUrl} alt={blog.title} />
              <p>{blog.content}</p>
              <Link href={`/admin/published/${blog.id}`}>
                <p>View Published Bog</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Published
