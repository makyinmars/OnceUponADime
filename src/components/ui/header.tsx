import Link from "next/link"
import { FcHome } from "react-icons/fc"

const Header = () => {
  return (
    <header className="flex items-center pb-4 text-lg font-bold justify-evenly">
      <Link href="/">
        <FcHome className="w-8 h-8" />
      </Link>
      <Link href="/blogs">
        <div className="subtitle">blogs</div>
      </Link>
    </header>
  )
}

export default Header
