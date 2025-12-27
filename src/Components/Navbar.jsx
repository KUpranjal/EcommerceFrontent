import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch, FiShoppingCart, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {logoutUser} from "../Utils/userSlice"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Navbar = () => {
    const nav=useNavigate()
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const dispatch=useDispatch()
 const handleLogout = () => {
  axios
    .post(
      import.meta.env.VITE_DOMAIN + "/signout",
      {},
      { withCredentials: true }
    )
    .then(() => {
        toast.success("Logged out successfully");
      dispatch(logoutUser());
    
 

    })
    .catch((err) => console.log(err));
};


  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300
      ${scrolled ? "shadow-md" : ""}
      bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b
      border-gray-200 dark:border-gray-700`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          {/* LEFT : Logo */}
       <div className="h-10 w-10 rounded-full overflow-hidden">
  <img
    src={logo}
    alt="Sublimation Solution Logo"
    className="h-full w-full object-contain"
  />
</div>



          {/* CENTER : Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-[420px]">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-2.5 text-sm rounded-full border
                bg-gray-50 dark:bg-gray-800 dark:text-white
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-emerald-400
                transition-all"
              />
            </div>
          </div>

          {/* RIGHT : Cart, Dark Mode, Logout */}
          <div className="flex items-center gap-6">

            {/* Cart */}
            <div className="relative cursor-pointer group">
              <FiShoppingCart className="text-xl text-gray-700 dark:text-gray-200 group-hover:text-emerald-500 transition" />
              <span className="absolute -top-2 -right-3 text-[10px] bg-emerald-500 text-white px-1.5 rounded-full">
                3
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full border
              border-gray-300 dark:border-gray-600
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition"
            >
              {dark ? (
                <FiSun className="text-yellow-400" />
              ) : (
                <FiMoon className="text-gray-700" />
              )}
            </button>

            {/* Logout */}
            <button
            onClick={handleLogout}
               
              
            
            className="flex items-center gap-2 px-4 py-1.5 text-sm
              border rounded-full
              text-gray-700 dark:text-gray-200
              border-gray-300 dark:border-gray-600
              hover:bg-emerald-50 dark:hover:bg-gray-800
              hover:text-emerald-600 transition-all">
              <FiLogOut />
              Logout
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
