import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center lowercase">
      <div>
        <Link href="/contact">Contact</Link>
      </div>
      <div>Copyright Once Upon A Dime 2022</div>
    </footer>
  )
}

export default Footer
