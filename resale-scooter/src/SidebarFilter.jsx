import React, { useState } from "react";
import Select from "react-select";

const locationOptions = [
  { value: "chandigarh", label: "Chandigarh" },
  { value: "delhi", label: "Delhi" },
  { value: "mumbai", label: "Mumbai" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
];

const brandList = ["Brand ABC", "Brand XYZ", "Brand PQR", "Brand DEF", "Brand GHI", "Brand JKL"];

const colors = [
  "white", "silver", "grey", "others", "red", "blue", "brown", "beige",
  "black", "orange", "yellow", "gold", "green"
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isFocused ? "#e0e7ff" : "white",
  }),
};

const SidebarFilter = ({ addFilter, removeFilter, filters }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sliderValue, setSliderValue] = useState(200);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [scooterAge, setScooterAge] = useState(5);
  const [ageToggle, setAgeToggle] = useState(false);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => {
      const updated = prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand];

      if (prev.includes(brand)) {
        removeFilter(brand);
      } else {
        addFilter(brand);
      }

      return updated;
    });
  };

  const handleColorClick = (color) => {
    if (selectedColor && selectedColor !== color) {
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

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-6 overflow-y-auto max-h-full">
      <h2 className="text-xl font-bold text-gray-800">Refine Your Results</h2>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <Select
          options={locationOptions}
          value={selectedLocation}
          onChange={(option) => {
            if (selectedLocation) {
              removeFilter(selectedLocation.label);
            }
            setSelectedLocation(option);
            addFilter(option.label);
          }}
          placeholder="Select a location..."
          styles={customStyles}
        />
      </div>

      {/* Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Range (km)</label>
        <input
          type="range"
          min="0"
          max="300"
          step="25"
          className="w-full accent-blue-500"
          value={sliderValue}
          onChange={(e) => {setSliderValue(e.target.value)}}
        />
        <div className="text-sm text-gray-600 text-right mt-1">{sliderValue} Km</div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Budget</label>
        <div className="flex flex-wrap gap-2">
          {["Less than 2 L", "2 L - 4 L", "4 L - 6 L", "More than 6 L"].map((item) => (
            <button
              key={item}
              className={`border px-3 py-1 rounded-full text-sm ${isFilterSelected(item) ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
              onClick={() => toggleSimpleFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="flex flex-wrap gap-2">
          {["Standard", "Electric"].map((type) => (
            <span
              key={type}
              className={`border px-3 py-1 rounded-full text-sm cursor-pointer ${isFilterSelected(type) ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
              onClick={() => toggleSimpleFilter(type)}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
        <div className="max-h-40 overflow-y-auto border p-2 rounded-md">
          {brandList.map((brand) => (
            <label key={brand} className="block text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="mr-2"
              />
              <span className={`${isFilterSelected(brand) ? "text-blue-500" : ""}`}>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Colour</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => handleColorClick(color)}
              className={`h-8 w-8 rounded-full border-2 cursor-pointer ${selectedColor === color ? "border-black" : "border-gray-300"} ${isFilterSelected(color) ? "ring-2 ring-blue-500" : ""}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Scooter Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Scooter Age</label>
        <input
          type="range"
          min="0"
          max="10"
          value={scooterAge}
          onChange={(e) => setScooterAge(e.target.value)}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{scooterAge} year</span>
          <label className="flex items-center gap-2">
            <span>10+ year</span>
            <input
              type="checkbox"
              checked={ageToggle}
              onChange={() => setAgeToggle(!ageToggle)}
            />
          </label>
        </div>
      </div>

      {/* Owner */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
        {["1st Owner", "2nd Owner", "More than 2 owners"].map((owner) => (
          <label key={owner} className="block text-sm text-gray-700">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => toggleSimpleFilter(owner)}
              checked={filters.includes(owner)}
            />
            <span className={`${isFilterSelected(owner) ? "text-blue-500" : ""}`}>{owner}</span>
          </label>
        ))}
      </div>

      {/* Kilometers Driven */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Kilometers Driven</label>
        <div className="flex flex-wrap gap-2">
          {["<10K km", "<25K km", "<50K km", "<75K km", ">75K+ km"].map((range) => (
            <button
              key={range}
              className={`border px-3 py-1 rounded-full text-sm ${isFilterSelected(range) ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
              onClick={() => toggleSimpleFilter(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
        {["Petrol", "Diesel", "CNG", "LPG"].map((fuel) => (
          <label key={fuel} className="block text-sm text-gray-700">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => toggleSimpleFilter(fuel)}
              checked={filters.includes(fuel)}
            />
            <span className={`${isFilterSelected(fuel) ? "text-blue-500" : ""}`}>{fuel}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilter;
