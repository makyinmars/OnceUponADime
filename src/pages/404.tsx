import Link from "next/link"

const NotFound = () => {
  return (
    <div className="my-4 text-center">
      <h2>Page Not Found - 404</h2>
      <Link href="/">
        <div className="flex justify-center my-4">
          <button className="p-2 rounded bg-violet-600">Take me home</button>
        </div>
      </Link>
    </div>
  )
}

export default NotFound
