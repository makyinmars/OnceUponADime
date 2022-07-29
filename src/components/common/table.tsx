import { formatDateDay } from "@/utils/date"
import { Blog } from "@prisma/client"
import Link from "next/link"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React from "react"

interface TableProps {
  blogs: Blog[]
}

const columnHelper = createColumnHelper<Blog>()

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("draft", {
    header: "Draft",
  }),
  columnHelper.accessor("published", {
    header: "Published",
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
    cell: (info) => <p>{formatDateDay(info.getValue())}</p>,
  }),
  columnHelper.accessor("id", {
    header: "View blog",
    cell: (info) => (
      <Link href={`/blogs/${info.getValue()}`}>
        <p className="cursor-pointer">View Blog</p>
      </Link>
    ),
  }),
]
const Table = ({ blogs }: TableProps) => {
  const [data, setData] = React.useState(() => [...blogs])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="container mx-auto border border-slate-700">
      <thead className="border border-slate-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border border-slate-700">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border border-slate-700">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-center border border-slate-700">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
