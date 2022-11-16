import { Blog } from "@prisma/client"
import Link from "next/link"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React from "react"

import { formatDateDay } from "src/utils/date"

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
    cell: (props) => (
      <Link
        href={`/admin/${
          props.row.original.published
            ? `published/${props.row.original.id}`
            : `drafts/${props.row.original.id}`
        }`}
      >
        <p className="cursor-pointer">
          {props.row.original.published ? "View published " : "View draft"}
        </p>
      </Link>
    ),
  }),
]
const Table = ({ blogs }: TableProps) => {
  const [data, setData] = React.useState(() => [...blogs])

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
