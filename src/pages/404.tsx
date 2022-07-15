import Link from "next/link"

const NotFound = () => {
  return (
    <div className="my-4 text-center">
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
