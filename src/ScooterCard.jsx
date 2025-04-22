import React from "react";

const ScooterCard = ({ scooter }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-sm">
      {/* Image */}
      <img
        src={scooter.image}
        alt={scooter.title}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{scooter.title}</h3>
        <p className="text-sm text-gray-600">
          {scooter.location} • <span className="underline">{scooter.distance} Kms Away</span>
        </p>
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

        {/* Smart Finance Checkbox */}
        <label className="flex items-center text-sm text-gray-700 mt-1">
          <input type="checkbox" className="mr-2 accent-blue-900" />
          Select for Smart Finance
        </label>

        {/* Feature Labels (About, Compare, Finance) */}
        <div className="grid grid-cols-3 text-center text-xs text-gray-700 mt-3">
          <div>About Scooter</div>
          <div>Compare</div>
          <div>Smart Finance</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 border border-blue-900 text-blue-900 py-2 rounded-md text-sm hover:bg-blue-900/10 transition">
            CONTACT DEALER
          </button>
          <button className="flex-1 bg-blue-900 text-white py-2 rounded-md text-sm hover:bg-blue-900/90 transition">
            BOOK A TEST DRIVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScooterCard;
