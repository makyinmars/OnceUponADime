import Link from "next/link"

import Meta from "@/components/common/meta"

const NotFound = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <Meta title="404 - Page Not Found" description="Page not found" keywords="404, error, page not found" />
      <h2>Page Not Found - 404</h2>
      <Link href="/">
        <div className="flex justify-center my-4">
          <button className="p-2 font-bold rounded shadow-md bg-slate-200 hover:bg-slate-700 hover:text-slate-200 shadow-slate-700">
            Take me home
          </button>
        </div>
      </Link>
    </div>
  )
}

export default NotFound
