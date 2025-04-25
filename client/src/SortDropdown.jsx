import React from "react";

const SortDropdown = ({ onSortChange }) => {
  return (
    <div className="mb-6 flex justify-end">
      <select
        className="p-2 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        defaultValue=""
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="" disabled>Sort By</option>
        <option value="price_low_high">Price: Low to High</option>
        <option value="price_high_low">Price: High to Low</option>
        <option value="year_new_old">Year: New to Old</option>
      </select>
    </div>
  );
};

export default SortDropdown;
