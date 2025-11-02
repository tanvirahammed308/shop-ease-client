"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import {
  logoutUser,
  fetchCurrentUser,
} from "@/features/auth/authTunks";
import {
  clearError,
  clearSuccess,
  clearLogoutSuccess,
} from "@/features/auth/authSlice";
import toast from "react-hot-toast";


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, success, logoutSuccess, error } = useSelector(
    (state: RootState) => state.auth
  );

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  //  Handle toast & redirect
  useEffect(() => {
    if (success) {
      toast.success("Login successful!");
      dispatch(clearSuccess());
    }
    if (logoutSuccess) {
      toast.success("Logout successfully!");
      router.push("/login");
      dispatch(clearLogoutSuccess());
      setMobileOpen(false); // ✅ mobile menu বন্ধ হবে
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [success, logoutSuccess, error, router, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navLinks = [
    { name: "Home", path: "/" },
    
    
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#e94560]">
          ShopEase
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-gray-700 hover:text-[#e94560] transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-600">
            <FiSearch size={20} />
          </button>
          <button className="relative text-gray-700 hover:text-red-500">
            <FiHeart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </button>
          <button className="relative text-gray-700 hover:text-blue-600">
            <Link href='/dashboard/cart'>
            <FiShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 rounded-full">
              2
            </span>
            
            </Link>
            
          </button>

          {/* User Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600">
              <FiUser size={20} />
            </button>

            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
              <ul>
                <li>
                  {user  ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  )}
                </li>
                {!user && (
                  <li>
                    <Link
                      href="/register"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </li>
                )}
                {user && user.role === "user" && (
  <li>
    <Link
      href="/dashboard"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Dashboard
    </Link>
  </li>
)}

{user && user.role === "admin" && (
  <li>
    <Link
      href="/admin"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Admin
    </Link>
  </li>
)}

              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block px-4 py-2 border-b border-gray-100 text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center justify-around px-4 py-3 border-t border-gray-100">
            <FiSearch className="text-gray-700" size={20} />
            <FiHeart className="text-gray-700" size={20} />
            <FiShoppingCart className="text-gray-700" size={20} />
            {user ? (
              <button onClick={handleLogout} className="text-gray-700">
                <FiUser size={20} />
              </button>
            ) : (
              <Link href="/login">
                <FiUser size={20} className="text-gray-700" />
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
