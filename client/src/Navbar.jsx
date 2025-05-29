import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import axios from "axios"; // Import axios for making API requests

// SVG Icons
const HamburgerIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const NavBar = () => {
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isCurrent = (path) => location.pathname === path;

  const navLinkClass = (isActive) =>
    `block px-4 py-2 font-semibold hover:bg-gray-300 cursor-pointer ${
      isActive ? "border-b-4 border-blue-800 text-blue-800 bg-gray-200" : "text-slate-900"
    }`;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Assuming you have this defined

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Logout successful from backend");
        setIsLogin(false); // Update frontend state
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("userData");
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed on backend:", response.data);
        setIsLogin(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLogin(false);
      navigate("/login");
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-100 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-900">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Hamburger Menu (mobile only) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-2xl text-gray-700"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>

            {/* Main Navigation (desktop only) */}
            <div className="hidden md:flex items-center gap-x-4 text-sm">
              <button onClick={() => navigate("/")} className={navLinkClass(isCurrent("/"))}>
                Home
              </button>
              <button onClick={() => navigate("/buy")} className={navLinkClass(isCurrent("/buy"))}>
                Buy
              </button>
              <button
                onClick={() => (isLogin ? navigate("/sell") : navigate("/login"))}
                className={navLinkClass(isCurrent("/sell"))}
              >
                Sell
              </button>
              <button onClick={() => navigate("/testimonials")} className={navLinkClass(isCurrent("/testimonials"))}>
                Testimonials
              </button>
              <button onClick={() => navigate("/careers")} className={navLinkClass(isCurrent("/careers"))}>
                Careers
              </button>
              <button onClick={() => navigate("/about")} className={navLinkClass(isCurrent("/about"))}>
                About Us
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-x-4 text-sm">
            {/* Call & Login/Logout (desktop only) */}
            <div className="hidden md:flex items-center gap-x-4">
              <span className="font-semibold text-slate-900">📞 1882-318-708</span>
              {isLogin ? (
                <button
                  onClick={handleLogout}
                  className="border border-gray-500 px-3 py-1 rounded cursor-pointer text-red-700 bg-slate-50 hover:bg-gray-300"
                >
                  LOGOUT
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="border border-gray-500 px-3 py-1 rounded cursor-pointer text-blue-900 bg-slate-50 hover:bg-gray-300"
                >
                  LOGIN
                </button>
              )}
            </div>
            {/* Profile Button (always visible on desktop) */}
            <button
              onClick={() => navigate("/userprofile")}
              className={`px-3 py-1 cursor-pointer font-semibold ${
                isCurrent("/userprofile") ? "text-blue-900 border-b-2 border-blue-900" : "text-slate-900"
              } hover:bg-gray-300 md:block hidden`}
            >
              Profile
            </button>
            {/* Profile Icon for Mobile */}
            <button
              onClick={() => navigate("/userprofile")}
              className={`md:hidden text-gray-700`}
              aria-label="Profile"
            >
              <UserIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50`}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-6">
          <button onClick={() => { navigate("/"); setSidebarOpen(false); }} className={navLinkClass(isCurrent("/"))}>
            Home
          </button>
          <button onClick={() => { navigate("/buy"); setSidebarOpen(false); }} className={navLinkClass(isCurrent("/buy"))}>
            Buy
          </button>
          <button
            onClick={() => { isLogin ? navigate("/sell") : navigate("/login"); setSidebarOpen(false); }}
            className={navLinkClass(isCurrent("/sell"))}
          >
            Sell
          </button>
          <button onClick={() => { navigate("/testimonials"); setSidebarOpen(false); }} className={navLinkClass(isCurrent("/testimonials"))}>
            Testimonials
          </button>
          <button onClick={() => { navigate("/careers"); setSidebarOpen(false); }} className={navLinkClass(isCurrent("/careers"))}>
            Careers
          </button>
          <button onClick={() => { navigate("/about"); setSidebarOpen(false); }} className={navLinkClass(isCurrent("/about"))}>
            About Us
          </button>
          <button onClick={() => { navigate("/userprofile"); setSidebarOpen(false); }} className={navLinkClass(isCurrent("/userprofile"))}>
            Profile
          </button>
        </nav>

        {/* Mobile Logout */}
        <div className="mt-8 p-4 border-t border-gray-200">
          {isLogin ? (
            <button
              onClick={() => { handleLogout(); setSidebarOpen(false); }}
              className="block w-full border border-gray-500 px-3 py-2 rounded cursor-pointer text-red-700 bg-slate-50 hover:bg-gray-300 text-center"
            >
              LOGOUT
            </button>
          ) : (
            <button
              onClick={() => { navigate("/login"); setSidebarOpen(false); }}
              className="block w-full border border-gray-500 px-3 py-2 rounded cursor-pointer text-blue-900 bg-slate-50 hover:bg-gray-300 text-center"
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile Call Us */}
        <p className="mt-4 p-4 text-center font-semibold text-slate-900">📞 1882-318-708</p>
      </div>
    </div>
  );
};

export default NavBar;