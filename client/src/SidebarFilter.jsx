import React, { useState, useEffect } from "react";
import Select from "react-select";
import locations from "./locations";

// Generate the location options for state, cities
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

const brandList = [
  "Brand ABC",
  "Brand XYZ",
  "Brand PQR",
  "Brand DEF",
  "Brand GHI",
  "Brand JKL",
];

const colors = [
  "white", "grey", "red", "blue", "black", "brown",
  "Pink", "orange", "yellow", "green",
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isFocused ? "#e0e7ff" : "white",
  }),
};

const SidebarFilter = ({ addFilter, removeFilter, filters }) => {
  const [sliderValue, setSliderValue] = useState(200);
  const [activeRangeFilter, setActiveRangeFilter] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const newRange = `${sliderValue} Km`;
    filters
      .filter((f) => f.endsWith("Km"))
      .forEach((range) => removeFilter(range));
  
    addFilter(newRange);
  }, [sliderValue]);
  

  const handleColorClick = (color) => {
    if (selectedColor) {
      removeFilter(selectedColor);
    }
    setSelectedColor(color);
    addFilter(color);
  };

  const toggleSimpleFilter = (val) => {
    if (filters.includes(val)) {
      removeFilter(val);
    } else {
      addFilter(val);
    }
  };

  const isFilterSelected = (val) => {
    return filters.includes(val);
  };

  const handleSliderChange = (value) => {
    const newRange = value + " Km";

    if (activeRangeFilter === newRange) {
      removeFilter(newRange);
      setActiveRangeFilter("");
    } else {
      if (activeRangeFilter) {
        removeFilter(activeRangeFilter);
      }
      addFilter(newRange);
      setActiveRangeFilter(newRange);
    }

    setSliderValue(value);
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
            onChange={(option) => {
              setSelectedState(option);
              setSelectedCity(null);
            }}
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
            onChange={(option) => setSelectedCity(option)}
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
          onChange={(e) => handleSliderChange(Number(e.target.value))}
        />
        <div className="text-sm text-gray-600 text-right mt-1">
          {activeRangeFilter || `${sliderValue} Km`}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Budget
        </label>
        <div className="flex flex-wrap gap-2">
          {["₹0-₹20,000", "₹20,000-₹50,000"].map((item) => (
            <button
              key={item}
              className={`border px-3 py-1 rounded-full text-sm ${
                isFilterSelected(item)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => toggleSimpleFilter(item)}
            >
              {item}
            </button>
          ))}
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
              onClick={() => {
                handleColorClick(color);
                toggleSimpleFilter(color);
              }}
              className={`h-8 w-8 rounded-full border-2 cursor-pointer ${
                selectedColor === color ? "border-black" : "border-gray-300"
              } ${isFilterSelected(color) ? "ring-2 ring-blue-500" : ""}`}
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
          {["0-2 years", "3-5 years", "6-10 years", "10+ years"].map(
            (ageRange) => (
              <button
                key={ageRange}
                className={`border px-3 py-1 rounded-full text-sm ${
                  isFilterSelected(ageRange)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => toggleSimpleFilter(ageRange)}
              >
                {ageRange}
              </button>
            )
          )}
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
              onChange={() => toggleSimpleFilter(owner)}
              checked={filters.includes(owner)}
            />
            <span
              className={`${isFilterSelected(owner) ? "text-blue-500" : ""}`}
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
          ].map((range) => (
            <button
              key={range}
              className={`border px-3 py-1 rounded-full text-sm ${
                isFilterSelected(range)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => toggleSimpleFilter(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
