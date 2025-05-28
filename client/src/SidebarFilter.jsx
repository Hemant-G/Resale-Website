import React, { useState } from "react";
import Select from "react-select";
import locations from "./locations";

const locationOptions = locations
  .map((locationObj) => {
    return Object.entries(locationObj).map(([state, cities]) => ({
      label: state,
      value: state.toLowerCase().replace(/\s/g, "-"),
      cities: cities.map((city) => ({
        label: city,
        value: city.toLowerCase().replace(/\s/g, "-"),
      })),
    }));
  })
  .flat();

const colors = [
  "white",
  "grey",
  "red",
  "blue",
  "black",
  "brown",
  "Pink",
  "orange",
  "yellow",
  "green",
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isFocused ? "#e0e7ff" : "white",
  }),
};

const SidebarFilter = ({ filters, updateFilters }) => {
  const [sliderValue, setSliderValue] = useState(200);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handlePriceFilter = (event) => {
    const value = event.target.value;
    const parts = value.split("-");
    const min = Number(parts[0]?.replace("₹", ""));
    const max = Number(parts[1]?.replace("₹", ""));

    if (filters.price_gte === min && filters.price_lte === max) {
      // If the currently clicked budget range is already applied, remove it
      updateFilters({
        price_gte: undefined,
        price_lte: undefined,
      });
    } else {
      // Otherwise, apply the clicked budget range
      updateFilters({
        price_gte: min,
        price_lte: max,
      });
    }
  };

  const handleKmsFilter = (range) => {
    let kms_lte, kms_gte;
    if (range === "Less than 10k km") kms_lte = 10000;
    if (range === "10k - 20k km") {
      kms_gte = 10000;
      kms_lte = 20000;
    }
    if (range === "20k - 30k km") {
      kms_gte = 20000;
      kms_lte = 30000;
    }
    if (range === "More than 30k km") kms_gte = 30000;

    const isCurrentlyApplied =
      (range === "Less than 10k km" && filters.kms_lte === 10000) ||
      (range === "10k - 20k km" &&
        filters.kms_gte === 10000 &&
        filters.kms_lte === 20000) ||
      (range === "20k - 30k km" &&
        filters.kms_gte === 20000 &&
        filters.kms_lte === 30000) ||
      (range === "More than 30k km" && filters.kms_gte === 30000);

    updateFilters({
      kms_lte: isCurrentlyApplied ? undefined : kms_lte,
      kms_gte: isCurrentlyApplied ? undefined : kms_gte,
    });
  };

  const handleYearFilter = (event) => {
    updateFilters({ year_gte: parseInt(event.target.value) || undefined });
  };

  const handleColorClick = (color) => {
    updateFilters({ color: filters.color === color ? undefined : color });
    setSelectedColor(filters.color === color ? "" : color);
  };

  const handleOwnerChange = (event) => {
    const ownerValue = event.target.value;
    const currentOwners = filters.owner || [];
    const updatedOwners = event.target.checked
      ? [...currentOwners, ownerValue]
      : currentOwners.filter((owner) => owner !== ownerValue);
    updateFilters({
      owner: updatedOwners.length > 0 ? updatedOwners : undefined,
    });
  };

  const handleDistanceSliderChange = (value) => {
    setSliderValue(value);
    updateFilters({ distance_lte: value || undefined });
  };

  const handleAgeFilter = (ageRange) => {
    let year_gte, year_lte;
    const currentYear = new Date().getFullYear();

    switch (ageRange) {
      case "0-2":
        year_gte = currentYear - 2;
        year_lte = currentYear;
        break;
      case "3-5":
        year_gte = currentYear - 5;
        year_lte = currentYear - 3;
        break;
      case "6-10":
        year_gte = currentYear - 10;
        year_lte = currentYear - 6;
        break;
      case "10+":
        year_lte = currentYear - 11;
        break;
      default:
        year_gte = undefined;
        year_lte = undefined;
        break;
    }

    const isCurrentlyApplied =
      (ageRange === "0-2" &&
        filters.year_gte === year_gte &&
        filters.year_lte === year_lte) ||
      (ageRange === "3-5" &&
        filters.year_gte === year_gte &&
        filters.year_lte === year_lte) ||
      (ageRange === "6-10" &&
        filters.year_gte === year_gte &&
        filters.year_lte === year_lte) ||
      (ageRange === "10+" && filters.year_lte === year_lte);

    updateFilters({
      year_gte: isCurrentlyApplied ? undefined : year_gte,
      year_lte: isCurrentlyApplied ? undefined : year_lte,
    });
  };

  const handleStateChange = (option) => {
    updateFilters({
      state: option ? option.value : undefined,
      city: undefined,
    });
    setSelectedState(option);
    setSelectedCity(null);
  };

  const handleCityChange = (option) => {
    updateFilters({ city: option ? option.value : undefined });
    setSelectedCity(option);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-6 overflow-y-auto max-h-full">
      <h2 className="text-xl font-bold text-gray-800">Refine Your Results</h2>

      {/* Location */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Select
            options={locationOptions}
            value={selectedState}
            onChange={handleStateChange}
            placeholder="Select a state"
            styles={customStyles}
            isClearable
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Select
            options={selectedState ? selectedState.cities : []}
            value={selectedCity}
            onChange={handleCityChange}
            placeholder="Select a city"
            isDisabled={!selectedState}
            styles={customStyles}
            isClearable
          />
        </div>
      </div>

      {/* Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Range (km)
        </label>
        <input
          type="range"
          min="0"
          max="300"
          step="25"
          className="w-full accent-blue-900"
          value={sliderValue}
          onChange={(e) => handleDistanceSliderChange(Number(e.target.value))}
        />
        <div className="text-sm text-gray-600 text-right mt-1">
          {sliderValue} Km
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Budget
        </label>
        <div className="flex flex-wrap gap-2">
          {["₹0-₹20000", "₹20000-₹50000"].map((item) => {
            const [min, max] = item.replace(/₹/g, "").split("-").map(Number);
            const isSelected =
              filters.price_gte === min && filters.price_lte === max;

            return (
              <button
                key={item}
                className={`border px-3 py-1 rounded-full text-sm ${
                  isSelected ? "bg-blue-900 text-white" : "hover:bg-blue-100"
                }`}
                onClick={handlePriceFilter}
                value={`${min}-${max}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colour */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Colour
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => handleColorClick(color)}
              className={`h-8 w-8 rounded-full border-2 cursor-pointer ${
                selectedColor === color ? "border-black" : "border-gray-300"
              } ${filters.color === color ? "ring-2 ring-blue-900" : ""}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Scooter Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scooter Age
        </label>
        <div className="flex flex-wrap gap-2">
          {["0-2", "3-5", "6-10", "10+"].map((ageRange) => {
            let year_gte, year_lte;
            const currentYear = new Date().getFullYear();
            switch (ageRange) {
              case "0-2":
                year_gte = currentYear - 2;
                year_lte = currentYear;
                break;
              case "3-5":
                year_gte = currentYear - 5;
                year_lte = currentYear - 3;
                break;
              case "6-10":
                year_gte = currentYear - 10;
                year_lte = currentYear - 6;
                break;
              case "10+":
                year_lte = currentYear - 11;
                break;
              default:
                year_gte = undefined;
                year_lte = undefined;
                break;
            }
            const isActive =
              (ageRange === "0-2" &&
                filters.year_gte === year_gte &&
                filters.year_lte === year_lte) ||
              (ageRange === "3-5" &&
                filters.year_gte === year_gte &&
                filters.year_lte === year_lte) ||
              (ageRange === "6-10" &&
                filters.year_gte === year_gte &&
                filters.year_lte === year_lte) ||
              (ageRange === "10+" && filters.year_lte === year_lte);
            return (
              <button
                key={ageRange}
                className={`border px-3 py-1 rounded-full text-sm ${
                  isActive ? "bg-blue-900 text-white" : "hover:bg-blue-100"
                }`}
                value={ageRange}
                onClick={() => handleAgeFilter(ageRange)}
              >
                {ageRange} years
              </button>
            );
          })}
        </div>
      </div>

      {/* Owner */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Owner
        </label>
        {["1st Owner", "2nd Owner", "More than 2 owners"].map((owner) => (
          <label key={owner} className="block text-sm text-gray-700">
            <input
              type="checkbox"
              className="mr-2"
              value={owner}
              checked={filters.owner && filters.owner.includes(owner)}
              onChange={handleOwnerChange}
            />
            <span
              className={
                filters.owner && filters.owner.includes(owner)
                  ? "text-blue-900"
                  : ""
              }
            >
              {owner}
            </span>
          </label>
        ))}
      </div>

      {/* Kilometers Driven */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kilometers Driven
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            "Less than 10k km",
            "10k - 20k km",
            "20k - 30k km",
            "More than 30k km",
          ].map((range) => {
            let kms_lte, kms_gte;
            if (range === "Less than 10k km") kms_lte = 10000;
            if (range === "10k - 20k km") {
              kms_gte = 10000;
              kms_lte = 20000;
            }
            if (range === "20k - 30k km") {
              kms_gte = 20000;
              kms_lte = 30000;
            }
            if (range === "More than 30k km") kms_gte = 30000;

            const isActive =
              (range === "Less than 10k km" && filters.kms_lte === 10000) ||
              (range === "10k - 20k km" &&
                filters.kms_gte === 10000 &&
                filters.kms_lte === 20000) ||
              (range === "20k - 30k km" &&
                filters.kms_gte === 20000 &&
                filters.kms_lte === 30000) ||
              (range === "More than 30k km" && filters.kms_gte === 30000);

            return (
              <button
                key={range}
                className={`border px-3 py-1 rounded-full text-sm ${
                  isActive ? "bg-blue-900 text-white" : "hover:bg-blue-100"
                }`}
                onClick={() => handleKmsFilter(range)}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;