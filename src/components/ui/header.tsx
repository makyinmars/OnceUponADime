import { FcBinoculars, FcBusinesswoman } from "react-icons/fc"
import Link from "next/link"

import { useAppSelector } from "@/app/hooks"

const Header = () => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <>
      <header className="flex flex-col items-center justify-center gap-2 py-6 sm:flex-row sm:justify-evenly font-header">
        <div className="font-header-title">
          <Link href="/">Once Upon A Dime</Link>
        </div>
        <div>
          <Link href="/blogs">Blogs</Link>
        </div>
        <div>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex items-center justify-center gap-2 flex-column">
          Search <FcBinoculars className="icon-header" />
        </div>
        <div>
          {user && user.admin && (
            <Link href="/admin">
              <a>
                <FcBusinesswoman className="icon-header" />
              </a>
            </Link>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
