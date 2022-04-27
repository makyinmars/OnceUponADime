import { FcBinoculars } from "react-icons/fc";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-around font-header bg-violet-400 py-6">
      <div className="font-title">
        <Link href="/">Once Upon A Dime</Link>
      </div>
      <div>
        <Link href="/blog">Blog</Link>
      </div>
      <div>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="flex flex-column justify-center items-center gap-2">
        Search <FcBinoculars />
      </div>
    </header>
  );
};

export default Header;
