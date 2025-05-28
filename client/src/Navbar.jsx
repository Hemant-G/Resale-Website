// NavBar.js
import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import axios from "axios"; // Import axios for making API requests

const NavBar = () => {
 const { isLogin, setIsLogin } = useContext(AuthContext);
 const navigate = useNavigate();
 const location = useLocation();
 const [menuOpen, setMenuOpen] = useState(false);

 const isCurrent = (path) => location.pathname === path;

 const navLinkClass = (isActive) =>
   `px-2 py-1 font-semibold hover:bg-gray-300 cursor-pointer ${
     isActive ? "border-b-2 border-blue-800 text-blue-800" : "text-slate-900"
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
       // Clear any tokens or user data from local/session storage
       localStorage.removeItem("authToken");
       sessionStorage.removeItem("userData");
       navigate("/login"); // Redirect to login page
     } else {
       console.error("Logout failed on backend:", response.data);
       // Optionally handle frontend state update even if backend fails
       setIsLogin(false);
       navigate("/login");
       // Optionally show an error message to the user
     }
   } catch (error) {
     console.error("Error during logout:", error);
     // Optionally handle frontend state update even if backend call fails
     setIsLogin(false);
     navigate("/login");
     // Optionally show an error message to the user
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
           {/* Profile Button (always visible) */}
           <button
             onClick={() => navigate("/userprofile")}
             className={`px-3 py-1 cursor-pointer font-semibold ${
               isCurrent("/userprofile") ? "text-blue-900 border-b-2 border-blue-900" : "text-slate-900"
             } hover:bg-gray-300`}
           >
             Profile
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
           <button onClick={() => navigate("/testimonials")} className={navLinkClass(isCurrent("/testimonials"))}>
             Testimonials
           </button>
           <button onClick={() => navigate("/careers")} className={navLinkClass(isCurrent("/careers"))}>
             Careers
           </button>
           <button onClick={() => navigate("/about")} className={navLinkClass(isCurrent("/about"))}>
             About Us
           </button>

           {/* Call Us + Login/Logout on Mobile */}
           <span className="mt-2 mx-auto">📞 1882-318-708</span>
           {isLogin ? (
             <button
               onClick={handleLogout}
               className="border border-gray-500 px-3 py-1 rounded cursor-pointer text-red-700 bg-slate-50 hover:bg-gray-300 mx-auto"
             >
               LOGOUT
             </button>
           ) : (
             <button
               onClick={() => navigate("/login")}
               className="border border-gray-500 px-3 py-1 rounded cursor-pointer text-blue-900 bg-slate-50 hover:bg-gray-300 mx-auto"
             >
               LOGIN
             </button>
           )}
           {/* Profile Button on Mobile */}
           <button
             onClick={() => navigate("/userprofile")}
             className={`mx-auto px-3 py-1  cursor-pointer font-semibold ${
               isCurrent("/userprofile") ? "text-blue-900 border-b-2 border-blue-900" : "text-slate-900"
             } hover:bg-gray-300`}
           >
             Profile
           </button>
         </div>
       )}
     </div>
   </div>
 );
};

export default NavBar;