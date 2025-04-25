import React, { useState } from "react";

const SellScooterForm = () => {
  const [formData, setFormData] = useState({
    model: "",
    year: "",
    kmsDriven: "",
    condition: "",
    expectedPrice: "",
    city: "",
    rcFile: null,
    purchaseBillFile: null,
    photos: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? (name === "photos" ? Array.from(files) : files[0]) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.kmsDriven.trim()) newErrors.kmsDriven = "KMs driven is required";
    if (!formData.expectedPrice.trim()) newErrors.expectedPrice = "Price is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.rcFile) newErrors.rcFile = "RC document is required";
    if (!formData.purchaseBillFile) newErrors.purchaseBillFile = "Purchase bill is required";
    if (formData.photos.length === 0) newErrors.photos = "At least one photo is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Scooter form submitted!");
      // handle form data
    }
  };

  const handleAddPhoto = (index) => {
    const fileInput = document.getElementById(`photoInput${index}`);
    fileInput.click(); // Trigger file input click to select a file
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-3 p-8 border bg-slate-50 border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">List Your Scooter for Sale</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label htmlFor="model" className="text-sm mb-2 text-gray-700">Model*</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            id="model"
            className="p-3 border border-gray-300 rounded-md"
          />
          {errors.model && <div className="text-red-500 text-sm mt-1">{errors.model}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="year" className="text-sm mb-2 text-gray-700">Year*</label>
          <input
            type="text" // Changed from "number" to "text" to prevent increment/decrement controls
            name="year"
            value={formData.year}
            onChange={handleChange}
            id="year"
            className="p-3 border border-gray-300 rounded-md"
          />
          {errors.year && <div className="text-red-500 text-sm mt-1">{errors.year}</div>}
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label htmlFor="kmsDriven" className="text-sm mb-2 text-gray-700">Kilometers Driven*</label>
          <input
            type="text" // Changed from "number" to "text" to prevent increment/decrement controls
            name="kmsDriven"
            value={formData.kmsDriven}
            onChange={handleChange}
            id="kmsDriven"
            className="p-3 border border-gray-300 rounded-md"
          />
          {errors.kmsDriven && <div className="text-red-500 text-sm mt-1">{errors.kmsDriven}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="condition" className="text-sm mb-2 text-gray-700">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            id="condition"
            className="p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Condition</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Needs Work">Needs Work</option>
          </select>
        </div>
      </div>

      {/* Expected Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label htmlFor="expectedPrice" className="text-sm mb-2 text-gray-700">Expected Price*</label>
          <input
            type="text" // Changed from "number" to "text" to prevent increment/decrement controls
            name="expectedPrice"
            value={formData.expectedPrice}
            onChange={handleChange}
            id="expectedPrice"
            className="p-3 border border-gray-300 rounded-md"
          />
          {errors.expectedPrice && <div className="text-red-500 text-sm mt-1">{errors.expectedPrice}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="text-sm mb-2 text-gray-700">City*</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            id="city"
            className="p-3 border border-gray-300 rounded-md"
          />
          {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
        </div>
      </div>

      {/* Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label htmlFor="rcFile" className="text-sm mb-2 text-gray-700">Upload RC Document*</label>
          <input
            type="file"
            name="rcFile"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            id="rcFile"
            className="p-3 border border-gray-300 rounded-md"
          />
          {errors.rcFile && <div className="text-red-500 text-sm mt-1">{errors.rcFile}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="purchaseBillFile" className="text-sm mb-2 text-gray-700">Upload Purchase Bill*</label>
          <input
            type="file"
            name="purchaseBillFile"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            id="purchaseBillFile"
            className="p-3 border border-gray-300 rounded-md"
          />
          {errors.purchaseBillFile && <div className="text-red-500 text-sm mt-1">{errors.purchaseBillFile}</div>}
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className="text-sm mb-2 text-gray-700">Upload Photos*</label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md relative">
            <input
              type="file"
              name="photos"
              id={`photoInput${index}`}
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div
              className="flex justify-center items-center w-full h-full text-center text-gray-700 cursor-pointer"
              onClick={() => handleAddPhoto(index)}
            >
              {formData.photos[index] ? (
                <img src={URL.createObjectURL(formData.photos[index])} alt={`Photo ${index + 1}`} className="object-cover w-full h-full rounded-md" />
              ) : (
                <>
                  <span className="text-3xl font-semibold">+</span>
                  <p>Upload Photo</p>
                </>
              )}
            </div>
          </div>
        ))}
        {errors.photos && <div className="text-red-500 text-sm mt-1 col-span-2">{errors.photos}</div>}
      </div>

      <button type="submit" className="w-full p-3 bg-blue-900 text-white font-semibold rounded-md cursor-pointer hover:bg-blue-700 transition">
        Submit
      </button>
    </form>
  );
};

export default SellScooterForm;
