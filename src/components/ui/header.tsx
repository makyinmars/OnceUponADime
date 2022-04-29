import { FcBinoculars } from "react-icons/fc"
import Link from "next/link"

const Header = () => {
  return (
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
  )
}

export default Header
