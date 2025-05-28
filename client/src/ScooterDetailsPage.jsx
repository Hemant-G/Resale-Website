import React, { useEffect, useState } from "react";
 import { useParams, useNavigate } from "react-router";
 import axios from "axios";

 const ScooterDetailsPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [scooter, setScooter] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedImage, setSelectedImage] = useState(null);

   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

   useEffect(() => {
     const fetchScooterDetails = async () => {
       setLoading(true);
       setError(null);
       try {
         const response = await axios.get(`${API_BASE_URL}/api/scooters/${id}`);
         setScooter(response.data);
         if (response.data?.images?.length > 0) {
           setSelectedImage(response.data.images[0].url); // Initially select the first image
         }
       } catch (err) {
         setError("Failed to load scooter details.");
         console.error("Error fetching scooter details:", err);
       } finally {
         setLoading(false);
       }
     };

     if (id) {
       fetchScooterDetails();
     }
   }, [id, API_BASE_URL]);

   const handleThumbnailClick = (imageUrl) => {
     setSelectedImage(imageUrl);
   };

   if (loading) {
     return <div className="container mx-auto p-4">Loading scooter details...</div>;
   }

   if (error) {
     return <div className="container mx-auto p-4 text-red-500">{error}</div>;
   }

   if (!scooter) {
     return <div className="container mx-auto p-4">No scooter details found.</div>;
   }

   const remainingThumbnails = scooter.images.filter(img => img.url !== selectedImage).slice(0, 3);

   return (
     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
       <button onClick={() => navigate(-1)} className="inline-flex items-center mb-4 text-blue-800 cursor-pointer hover:underline">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2 h-5 w-5">
           <path d="m12 19-7-7 7-7" />
           <path d="M19 12H5" />
         </svg>
         Back
       </button>

       <div className="bg-white rounded-xl shadow-md overflow-hidden">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
           {/* Image Gallery */}
           <div>
             {scooter.images && scooter.images.length > 0 ? (
               <div className="rounded-lg overflow-hidden">
                 {/* Main Image */}
                 {selectedImage && (
                   <img
                     src={selectedImage}
                     alt={scooter.title}
                     className="w-full h-auto object-cover rounded-lg shadow-md"
                   />
                 )}
                 {/* Thumbnails */}
                 {scooter.images.length > 1 && (
                   <div className="mt-4 grid grid-cols-3 gap-2">
                     {remainingThumbnails.map((image, index) => (
                       <img
                         key={index}
                         src={image.url}
                         alt={`${scooter.title} - Thumbnail ${index + 1}`}
                         className={`w-full h-24 object-cover rounded-md shadow-sm cursor-pointer hover:opacity-90 transition ${selectedImage === image.url ? 'border-2 border-blue-500' : ''}`}
                         onClick={() => handleThumbnailClick(image.url)}
                       />
                     ))}
                   </div>
                 )}
               </div>
             ) : (
               <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                 <span className="text-gray-500">No Images Available</span>
               </div>
             )}
           </div>

           {/* Details Section */}
           <div>
             <h2 className="text-3xl font-bold text-blue-900 mb-4">{scooter.model}</h2>
             <h2 className="text-2xl font-semibold text-gray-900">₹{scooter.price}</h2>
             {scooter.description && <p className="text-gray-700 mb-4">{scooter.description}</p>}

             <h3 className="text-xl font-semibold text-blue-900 mb-2">Specifications</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
               {scooter.year && <p><span className="font-semibold">Year:</span> {scooter.year}</p>}
               {scooter.color && <p><span className="font-semibold">Color:</span> {scooter.color}</p>}
               {scooter.kmsDriven && <p><span className="font-semibold">Kms Driven:</span> {scooter.kmsDriven} km</p>}
               {scooter.location && <p><span className="font-semibold">Location:</span> {scooter.location}</p>}
               {scooter.owner && <p><span className="font-semibold">Owner:</span> {scooter.owner}</p>}
               {scooter.condition && <p><span className="font-semibold">Condition:</span> {scooter.condition}</p>}
               {scooter.distance && <p><span className="font-semibold">Range:</span> {scooter.distance} km</p>}
               {scooter.model && <p><span className="font-semibold">Model:</span> {scooter.model}</p>}
               {/* Add more specifications here based on your scooter data */}
             </div>

             <div className="mt-6">
               <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-900 text-white h-10 px-4 py-2 hover:bg-blue-700">
                 Schedule Test Ride
               </button>
             </div>

             {/* Add "Key Features" and other details as needed */}
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default ScooterDetailsPage;