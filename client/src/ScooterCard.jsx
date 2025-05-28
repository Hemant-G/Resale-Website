import React from "react";

const ScooterCard = ({ scooter }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:border hover:border-gray-300 transition-shadow duration-300 w-full max-w-sm">
      {/* Image */}
      {scooter.images && scooter.images.length > 0 ? (
        <img
          src={scooter.images[0]?.url}
          alt={scooter.model}
          className="w-full h-48 object-cover cursor-pointer"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {scooter.model}
        </h3>
        <p className="text-sm text-gray-700">
          {scooter.year} • {scooter.fuel} • {scooter.kmsDriven} km
        </p>

        {/* Rating */}
        <div className="text-sm text-gray-800">★★★★☆</div>

        {/* Price & EMI */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-bold text-blue-900">₹{scooter.price}</p>
          <button className="text-sm text-blue-900 border border-blue-900 px-3 py-1 rounded-md hover:bg-blue-900/10 transition">
            CALCULATE EMI
          </button>
        </div>
        <p className="text-xs text-gray-500">EMI Starts: ₹{scooter.emiStart}</p>
      </div>
    </div>
  );
};

export default ScooterCard;
