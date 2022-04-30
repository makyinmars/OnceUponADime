import { FcBinoculars, FcApproval } from "react-icons/fc"
import Link from "next/link"

import { useAppSelector, useAppDispatch } from "@/app/hooks"
import { removeCredentials } from "@/app/features/auth/authSlice"

const Header = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.auth.user)

  return (
    <>
      <header className="flex justify-around py-6 font-header">
        <div className="font-header-title">
          <Link href="/">Once Upon A Dime</Link>
        </div>
        <div>
          <Link href="/blog">Blog</Link>
        </div>
        <div>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex items-center justify-center gap-2 flex-column">
          Search <FcBinoculars />
        </div>
      </header>
      {user && (
        <>
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            {`Welcome ${user.name}!`} <FcApproval />
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <button className="button">
              <Link href="/admin">Admin Page</Link>
            </button>
            <button
              className="button"
              onClick={() => dispatch(removeCredentials())}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Header
