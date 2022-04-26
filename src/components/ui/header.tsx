import { FcBinoculars } from "react-icons/fc";

const Header = () => {
  return (
    <header className="flex justify-around font-header bg-violet-400 py-6">
      <div className="font-title">Once Upon A Dime</div>
      <div>Blog</div>
      <div>Contact</div>
      <div className="flex flex-column justify-center items-center gap-2">
        Search <FcBinoculars />
      </div>
    </header>
  );
};

export default Header;
