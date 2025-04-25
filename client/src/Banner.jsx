import React from "react";

const Banner = () => {
  return (
    <div className="bg-blue-100 border border-indigo-300 text-blue-900 font-medium px-4 py-3 rounded-lg shadow-sm flex items-center justify-between mb-6">
      <span className="flex items-center gap-2">
        <span role="img" aria-label="car">🛵</span>
        19 customers have booked test drives in your city. Don’t miss out.
      </span>
      {/* Optional Close Button */}
      {/* <button className="text-indigo-500 hover:text-indigo-700 text-sm">✕</button> */}
    </div>
  );
};

export default Banner;
