import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
  const { currentuser } = useSelector((state) => {
    return state.user.user;
  });
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={`/`}>
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
            <span className=" text-slate-500">Radhe</span>{" "}
            <span className=" text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className=" bg-slate-100 rounded-lg p-3 flex items-center">
          <input
            type="Search"
            placeholder="search"
            className=" bg-transparent outline-none w-24 sm:w-64"
          />
          <FaSearch className=" text-slate-600 cursor-pointer" />
        </form>

        <ul className="flex gap-4 text-[13px] sm:text-[16px]">
          <Link to={`/`}>
            {" "}
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to={`/about`}>
            {" "}
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to={`/profile`}>
            {currentuser ? (
              <img src={currentuser.avatar} alt="" className=" rounded-full h-7 w-7 object-cover" />
            ) : (
              <li className=" text-slate-700 hover:underline">Sign-in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
