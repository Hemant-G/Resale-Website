import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";

const NavBar = () => {
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isSellPage = location.pathname === "/sell";
  const isBuyPage = location.pathname === "/buy";
  const isAboutPage = location.pathname === "/about";

  return (
    <div className="sticky top-0 z-50 bg-gray-100 border-b border-gray-200 ">
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-900">
        <div className="container mx-auto flex justify-between items-center gap-y-1">
          <div className="flex items-center gap-x-2 lg:gap-x-4 h-7 text-sm">
            <button
              onClick={() => navigate("/")}
              className={`px-2 font-semibold hover:bg-gray-300 cursor-pointer ${
                isHomePage
                  ? "border-blue-800 border-b-2 text-blue-800"
                  : "text-slate-900"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigate("/buy")}
              className={`px-2 font-semibold hover:bg-gray-300 cursor-pointer ${
                isBuyPage
                  ? "border-blue-800 border-b-2 text-blue-800"
                  : "text-slate-900"
              }`}
            >
              Buy
            </button>

            <button
              onClick={() => (isLogin ? navigate("/sell") : navigate("/login"))}
              className={`px-2 font-semibold hover:bg-gray-300 cursor-pointer ${
                isSellPage
                  ? "border-blue-800 border-b-2 text-blue-800"
                  : "text-slate-900"
              }`}
            >
              Sell
            </button>

            <button
              onClick={() => navigate("/about")}
              className={`px-2 font-semibold hover:bg-gray-300 cursor-pointer ${
                isAboutPage
                  ? "border-blue-800 border-b-2 text-blue-800"
                  : "text-slate-900"
              }`}
            >
              About Us
            </button>
          </div>

          <div className="flex items-center text-sm gap-x-4 text-slate-900 font-semibold">
            <span>Call Us 📞 1882-318-708, 📞 1882-318-709</span>
            <button
              onClick={() => navigate("/login")}
              className="border border-gray-500 px-3 py-1 rounded font-semibold text-blue-900 bg-slate-50 hover:bg-gray-300 cursor-pointer"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
