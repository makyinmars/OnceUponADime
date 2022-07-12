import Link from "next/link"

const Header = () => {
  return (
    <header className="flex text-lg font-bold justify-evenly">
      <Link href="/">
        <div>once upon a dime</div>
      </Link>
      <Link href="/blogs">
        <div>blogs</div>
      </Link>
      <div>search</div>
    </header>
  )
}

export default Header
