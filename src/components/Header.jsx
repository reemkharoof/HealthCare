import { FaBars, FaSearch } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header({ isOpen, setIsOpen }) {
  return (
    <div className="flex-1 bg-slate-900 h-[70px] flex items-center justify-between px-[30px] border-b border-slate-800 shadow-lg">

      {/* LEFT */}
      <div className="flex items-center gap-[25px]">

        {/* MENU */}
        <button
          className="bg-transparent cursor-pointer text-[24px] flex justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars className="text-slate-200 hover:text-white transition" />
        </button>

        {/* SEARCH */}
        <div className="w-[320px] h-[48px] bg-slate-800 rounded-[14px] flex items-center relative overflow-hidden">

          <FaSearch className="absolute right-[18px] text-slate-400 text-[16px]" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full h-full outline-none bg-transparent pr-[50px] pl-[18px] text-[17px] text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <button className="text-[25px] text-slate-300 hover:text-white transition">
          <FiBell />
        </button>

        {/* LOGIN BUTTON */}
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition"
        >
          Login
        </Link>

      </div>
    </div>
  );
}

export default Header;