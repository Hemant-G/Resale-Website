import React, { useState, useEffect, useContext } from "react";
 import axios from "axios";

 const SellScooterForm = () => {

   const [formData, setFormData] = useState({
     model: "",
     year: "",
     kmsDriven: "",
     condition: "",
     price: "",
     location: "",
     rcFile: null,
     purchaseBillFile: null,
     images: [],
     color: "",
     distance: "100",
     owner: "",
     description: "", 
   });

   const [errors, setErrors] = useState({});
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

   const colorOptions = [
     "",
     "White",
     "Grey",
     "Red",
     "Blue",
     "Black",
     "Brown",
     "Pink",
     "Orange",
     "Yellow",
     "Green",
   ];

   const ownerOptions = [
     "",
     "1st Owner",
     "2nd Owner",
     "More than 2 owners",
   ];

   const handleChange = (e) => {
     const { name, value, type, files } = e.target;

     if (type === "file" && name === "images") {
       setFormData((prevFormData) => ({
         ...prevFormData,
         images: [...prevFormData.images, ...Array.from(files)],
       }));
     } else if (type === "file") {
       setFormData((prevFormData) => ({
         ...prevFormData,
         [name]: files[0],
       }));
     } else {
       setFormData((prevFormData) => ({
         ...prevFormData,
         [name]: value,
       }));
     }
   };

   const handleSubmit = async (e) => {
     e.preventDefault();

     const newErrors = {};
     if (!formData.model.trim()) newErrors.model = "Model is required"; // Error for 'model'
     if (!formData.year.trim()) newErrors.year = "Year is required";
     if (!formData.kmsDriven.trim()) newErrors.kmsDriven = "KMs driven is required";
     if (!formData.distance.trim()) newErrors.distance = "Distance is required";
     if (!formData.price.trim()) newErrors.price = "Price is required";
     if (!formData.location.trim()) newErrors.location = "City is required";
     if (!formData.color) newErrors.color = "Color is required";
     if (!formData.owner) newErrors.owner = "Owner information is required";
     if (!formData.rcFile) newErrors.rcFile = "RC document is required";
     if (!formData.purchaseBillFile) newErrors.purchaseBillFile = "Purchase bill is required";
     if (formData.images.length === 0) newErrors.images = "At least one photo is required";

     setErrors(newErrors);

     if (Object.keys(newErrors).length === 0) {
       const formDataToSend = new FormData();
       formDataToSend.append("model", formData.model); // Append model
       formDataToSend.append("year", formData.year);
       formDataToSend.append("kmsDriven", formData.kmsDriven);
       formDataToSend.append("distance", formData.distance);
       formDataToSend.append("condition", formData.condition);
       formDataToSend.append("price", formData.price);
       formDataToSend.append("location", formData.location);
       formDataToSend.append("color", formData.color);
       formDataToSend.append("owner", formData.owner);
       formDataToSend.append("description", formData.description); // Append description
       formDataToSend.append("rcFile", formData.rcFile);
       formDataToSend.append("purchaseBillFile", formData.purchaseBillFile);
       formData.images.forEach((photo) => {
         formDataToSend.append("images", photo);
       });

       try {
         const response = await axios.post(`${API_BASE_URL}/api/scooters`, formDataToSend, {
           headers: {
             "Content-Type": "multipart/form-data",
           },
           withCredentials: true,
         });

         console.log("Scooter listed successfully:", response.data);
         alert("Scooter listed successfully!");
       } catch (error) {
         console.error("Error listing scooter:", error);
         alert("Failed to list scooter. Please try again.");
       }
     }
   };

   const handleAddPhoto = (index) => {
     const fileInput = document.getElementById(`photoInput${index}`);
     fileInput.click();
   };

   const handleRemovePhoto = (indexToRemove) => {
     setFormData((prevFormData) => ({
       ...prevFormData,
       images: prevFormData.images.filter((_, index) => index !== indexToRemove),
     }));
   };

   return (
     <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-3 p-8 border bg-slate-50 border-gray-300 rounded-lg shadow-md">
       <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">List Your Scooter for Sale</h2>

       {/* Basic Info */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         <div className="flex flex-col">
           <label htmlFor="model" className="text-sm mb-2 text-gray-700">Model*</label> {/* Label as Model */}
           <input
             type="text"
             name="model" // Input name is model
             value={formData.model}
             onChange={handleChange}
             id="model" // Input id is model
             className="p-3 border border-gray-300 rounded-md"
           />
           {errors.model && <div className="text-red-500 text-sm mt-1">{errors.model}</div>} {/* Error for model */}
         </div>
         <div className="flex flex-col">
           <label htmlFor="year" className="text-sm mb-2 text-gray-700">Year*</label>
           <input
             type="text"
             name="year"
             value={formData.year}
             onChange={handleChange}
             id="year"
             className="p-3 border border-gray-300 rounded-md"
           />
           {errors.year && <div className="text-red-500 text-sm mt-1">{errors.year}</div>}
         </div>
         <div className="flex flex-col">
           <label htmlFor="kmsDriven" className="text-sm mb-2 text-gray-700">Kilometers Driven*</label>
           <input
             type="text"
             name="kmsDriven"
             value={formData.kmsDriven}
             onChange={handleChange}
             id="kmsDriven"
             className="p-3 border border-gray-300 rounded-md"
           />
           {errors.kmsDriven && <div className="text-red-500 text-sm mt-1">{errors.kmsDriven}</div>}
         </div>

         <div className="flex flex-col">
           <label htmlFor="color" className="text-sm mb-2 text-gray-700">Color*</label>
           <select
             name="color"
             id="color"
             value={formData.color}
             onChange={handleChange}
             className="p-3 border border-gray-300 rounded-md"
           >
             {colorOptions.map((color) => (
               <option key={color} value={color}>{color || "Select Color"}</option>
             ))}
           </select>
           {errors.color && <div className="text-red-500 text-sm mt-1">{errors.color}</div>}
         </div>
         <div className="flex flex-col">
           <label htmlFor="owner" className="text-sm mb-2 text-gray-700">Owner*</label>
           <select
             name="owner"
             id="owner"
             value={formData.owner}
             onChange={handleChange}
             className="p-3 border border-gray-300 rounded-md"
           >
             {ownerOptions.map((owner) => (
               <option key={owner} value={owner}>{owner || "Select Owner"}</option>
             ))}
           </select>
           {errors.owner && <div className="text-red-500 text-sm mt-1">{errors.owner}</div>}
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
         <div className="flex flex-col">
           <label htmlFor="price" className="text-sm mb-2 text-gray-700">Expected Price*</label>
           <input
             type="text"
             name="price"
             value={formData.price}
             onChange={handleChange}
             id="price"
             className="p-3 border border-gray-300 rounded-md"
           />
           {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
         </div>
         <div className="flex flex-col">
           <label htmlFor="city" className="text-sm mb-2 text-gray-700">City*</label>
           <input
             type="text"
             name="location"
             value={formData.location}
             onChange={handleChange}
             id="city"
             className="p-3 border border-gray-300 rounded-md"
           />
           {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
         </div>
       </div>

       {/* Description Field */}
       <div className="mb-6">
         <label htmlFor="description" className="text-sm mb-2 text-gray-700 block">Description</label>
         <textarea
           name="description"
           id="description"
           value={formData.description}
           onChange={handleChange}
           rows="4"
           className="p-3 border border-gray-300 rounded-md w-full"
         ></textarea>
       </div>

       {/* Documents */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
         <div className="flex flex-col">
           <label htmlFor="rcFile" className="text-sm mb-2 text-gray-700">Upload RC Document*</label>
           <input
             type="file"
             name="rcFile"
             accept=".pdf"
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
             accept=".pdf"
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
         {formData.images.map((photo, index) => (
           <div key={index} className="flex justify-center items-center border-2 border-gray-300 rounded-md relative">
             <img src={URL.createObjectURL(photo)} alt={`Photo ${index + 1}`} className="object-cover w-full h-full rounded-md" />
             <button
               type="button"
               onClick={() => handleRemovePhoto(index)}
               className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs focus:outline-none"
             >
               &times;
             </button>
           </div>
         ))}
         {[...Array(Math.max(0, 4 - formData.images.length))].map((_, index) => (
           <div key={`empty-${index}`} className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md relative">
             <input
               type="file"
               name="images"
               id={`photoInput${formData.images.length + index}`}
               accept="image/*"
               onChange={handleChange}
               className="absolute inset-0 opacity-0 cursor-pointer"
               multiple
             />
             <div
               className="flex justify-center items-center w-full h-full text-center text-gray-700 cursor-pointer"
               onClick={() => handleAddPhoto(formData.images.length + index)}
             >
               <span className="text-3xl font-semibold">+</span>
               <p>Upload Photo</p>
             </div>
           </div>
         ))}
         {errors.images && <div className="text-red-500 text-sm mt-1 col-span-2">{errors.images}</div>}
       </div>

       <button type="submit" className="w-full p-3 bg-blue-900 text-white font-semibold rounded-md cursor-pointer hover:bg-blue-700 transition">
         Submit
       </button>
     </form>
   );
 };

 export default SellScooterForm;