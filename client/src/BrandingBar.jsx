import React from "react";

const BrandingBar = () => {
  return (
    <div className="container mx-auto flex justify-between items-center px-6 py-4 border-b border-slate-200 shadow-sm">
      <img
        className="h-15"
        src="/smg_logo.jpg"
        alt="SMG ELECTRIC SCOOTERS LTD"
      />
      <div className="text-xl sm:text-4xl font-extrabold text-blue-900 cursor-pointer">
      SMG Resell®
      </div>
      
    </div>
  );
};

export default BrandingBar;
