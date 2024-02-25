import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const [searchTerm,setSearchTerm] = useState("")
  const Navigate = useNavigate()
  const { currentuser } = useSelector((state) => {
    return state.user.user;
  });
  
  function submitHandle(e){
    e.preventDefault()
    const urlPrams = new URLSearchParams(window.location.search)
    urlPrams.set('searchTerm',searchTerm)
    const searchQuery = urlPrams.toString()
    console.log(searchQuery)
    Navigate(`/search?${searchQuery}`)
  }

  useEffect(()=>{
    const urlPrams = new URLSearchParams(location.search)
    const searchTermFormUrl = urlPrams.get('searchTerm')
    if(searchTermFormUrl){
      setSearchTerm(searchTermFormUrl)
    }
  },[location.search])

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={`/`}>
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
            <span className=" text-slate-500">Radhe</span>{" "}
            <span className=" text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className=" bg-slate-100 rounded-lg p-3 flex items-center"
        onSubmit={submitHandle}
        >
          <input
            type="Search"
            defaultValue={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="search"
            className=" bg-transparent outline-none w-24 sm:w-64"
          />
         <button>
         <FaSearch className=" text-slate-600 cursor-pointer" />
         </button>
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
