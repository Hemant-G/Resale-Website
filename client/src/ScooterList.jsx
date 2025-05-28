import React, { useState, useEffect } from "react";
 import ScooterCard from "./ScooterCard";
 import FocusedScooter from "./FocusedScooter";
 import axios from "axios";

 const ScooterList = ({ filters, sortOption }) => {
   const [scooters, setScooters] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selectedScooter, setSelectedScooter] = useState(null);

   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

   useEffect(() => {
     fetchScooters();
   }, [filters, sortOption]);

   const fetchScooters = async () => {
     setLoading(true);
     setError(null);

     try {
       const params = { ...filters };
       if (sortOption) {
         let sortField;
         let sortOrder;

         if (sortOption === 'price_low_high') {
           sortField = 'price';
           sortOrder = 'asc';
         } else if (sortOption === 'price_high_low') {
           sortField = 'price';
           sortOrder = 'desc';
         } else if (sortOption === 'year_new_old') {
           sortField = 'year';
           sortOrder = 'desc';
         }
         // Add more sorting options as needed

         if (sortField) {
           params.sort = `${sortField}-${sortOrder}`;
         }
       }
       const queryString = new URLSearchParams(params).toString();
       const apiUrl = `${API_BASE_URL}/api/scooters?${queryString}`;
       const response = await axios.get(apiUrl);
       if (Array.isArray(response.data)) {
         setScooters(response.data);
       } else {
         console.error("Server response is not an array:", response.data);
         setScooters([]);
         setError("Error: Invalid data format from server.");
       }
     } catch (err) {
       setError(err.message);
       setScooters([]);
     } finally {
       setLoading(false);
     }
   };

   const handleScooterClick = (scooter) => {
     setSelectedScooter(scooter);
   };

   const handleCloseModal = () => {
     setSelectedScooter(null);
   };

   return (
     <div>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
         {loading && <p>Loading scooters...</p>}
         {error && <p className="text-red-500">Error loading scooters: {error}</p>}
         {Array.isArray(scooters) && scooters.length > 0 ? (
           scooters.map((scooter) => (
             <div
               key={scooter._id}
               onClick={() => handleScooterClick(scooter)}
               className="cursor-pointer" // Add a visual cue for clickability
             >
               <ScooterCard scooter={scooter} />
             </div>
           ))
         ) : (
           !loading && <p className="text-gray-600 col-span-full">No scooters match your filters.</p>
         )}
       </div>
       {selectedScooter && (
         <FocusedScooter scooter={selectedScooter} onClose={handleCloseModal} />
       )}
     </div>
   );
 };

 export default ScooterList;