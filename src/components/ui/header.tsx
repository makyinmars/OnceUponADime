import { FcBinoculars, FcBusinesswoman } from "react-icons/fc"
import Link from "next/link"

import { useAppSelector } from "@/app/hooks"

const Header = () => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <>
      <header className="flex items-center justify-around py-6 font-header">
        <div className="font-header-title">
          <Link href="/">Once Upon A Dime</Link>
        </div>
        <div>
          <Link href="/blog">Blogs</Link>
        </div>
        <div>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex items-center justify-center gap-2 flex-column">
          Search <FcBinoculars className="icon-header" />
        </div>
        {user && user.admin && (
          <div>
            <Link href="/admin">
              <a href="">
                <FcBusinesswoman className="icon-header" />
              </a>
            </Link>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
