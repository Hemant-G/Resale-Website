import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";

const NavBar = () => {
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrent = (path) => location.pathname === path;

  const navLinkClass = (isActive) =>
    `px-2 py-1 font-semibold hover:bg-gray-300 cursor-pointer ${
      isActive ? "border-b-2 border-blue-800 text-blue-800" : "text-slate-900"
    }`;

  return (
    <div className="sticky top-0 z-50 bg-gray-100 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-900">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Hamburger Menu (mobile only) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl text-gray-700"
              aria-label="Toggle menu"
            >
              {menuOpen ? "╳" : "☰"}
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
              <button onClick={() => navigate("/about")} className={navLinkClass(isCurrent("/about"))}>
                About Us
              </button>
            </div>
          </div>

          {/* Right Side: Call & Login (desktop only) */}
          <div className="hidden md:flex items-center gap-x-4 text-sm">
            <span className="font-semibold text-slate-900">📞 1882-318-708</span>
            <button
              onClick={() => navigate("/login")}
              className="border border-gray-500 px-3 py-1 rounded text-blue-900 bg-slate-50 hover:bg-gray-300"
            >
              LOGIN
            </button>
          </div>
        </div>

        {/* Mobile Menu (shown when menuOpen is true) */}
        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-y-2 text-sm font-semibold text-slate-900">
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
            <button onClick={() => navigate("/about")} className={navLinkClass(isCurrent("/about"))}>
              About Us
            </button>

            {/* Call Us + Login on Mobile */}
            <span className="mt-2 mx-auto">📞 1882-318-708</span>
            <button
              onClick={() => navigate("/login")}
              className="border border-gray-500 px-3 py-1 rounded text-blue-900 bg-slate-50 hover:bg-gray-300"
            >
              LOGIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
