import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiLogOut,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Utils/userSlice";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  // 🔁 Load saved theme ONCE
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // 🌙 Toggle theme (SINGLE SOURCE OF TRUTH)
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // 🔐 Logout
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
      .catch(console.log);
  };

  // 🌫 Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300
      ${scrolled ? "shadow-md" : ""}
      bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
      border-b border-gray-200 dark:border-gray-700`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src={logo}
              alt="Sublimation Solution Logo"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-[420px]">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-2.5 text-sm rounded-full border
                bg-gray-50 dark:bg-gray-800 dark:text-white
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">

            {/* Cart */}
            <div className="relative cursor-pointer">
              <FiShoppingCart className="text-xl text-gray-700 dark:text-gray-200" />
              <span className="absolute -top-2 -right-3 text-[10px] bg-emerald-500 text-white px-1.5 rounded-full">
                3
              </span>
            </div>

            {/* 🌙 Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border
              border-gray-300 dark:border-gray-600
              hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {document.documentElement.classList.contains("dark") ? (
                <FiSun className="text-yellow-400" />
              ) : (
                <FiMoon className="text-gray-700 dark:text-gray-200" />
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-1.5 text-sm
              border rounded-full
              text-gray-700 dark:text-gray-200
              border-gray-300 dark:border-gray-600
              hover:bg-emerald-50 dark:hover:bg-gray-800"
            >
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
