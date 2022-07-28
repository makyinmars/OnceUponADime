import { Blog } from "@prisma/client"

interface TableProps {
  blogs: Blog[]
}

const Table = ({ blogs }: TableProps) => {
  return <div>Table</div>
}

export default Table
