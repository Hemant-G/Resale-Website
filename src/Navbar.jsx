import React from 'react';

const Navbar = () => {
  return (
    <nav className="shadow-sm bg-white">
      <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-900 border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap justify-end items-center gap-y-1"> 
          <div className="flex flex-wrap items-center gap-x-3 lg:gap-x-4 h-7">
            <a href="#" className="hover:text-blue-600 hover:underline whitespace-nowrap">About Us</a>
            <span className="whitespace-nowrap">📞 Call Us xxx xxx xxxx</span>
            <a href="#" className="flex items-center hover:text-blue-600 whitespace-nowrap">
                 🌐 English  
            </a>
          </div>

          <div className="flex items-center gap-x-3">
             <button className="text-gray-600 hover:text-black" aria-label="Search">
               🔍
             </button>
              <button className="text-gray-600 hover:text-black" aria-label="Account">
                 👤
              </button>
            <button className="border border-gray-300 px-3 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300 whitespace-nowrap">
              LOGIN
            </button>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-xl sm:text-4xl font-extrabold text-blue-900 cursor-pointer">
            RESALE SCOOTERS
        </div>
        <img className='h-15' src="/smg_logo.jpg" alt="SMG ELECTRIC SCOOTERS LTD" />
      </div>
    </nav>
  );
};

export default Navbar;