import React, { useState } from "react";
 import { useNavigate } from "react-router";

 const FocusedScooter = ({ scooter, onClose }) => {
   const navigate = useNavigate();
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   if (!scooter || !scooter.images || scooter.images.length === 0) {
     return (
       <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
         <div className="bg-white p-6 rounded-md shadow-lg">
           <p className="text-gray-700">No scooter images available.</p>
           <button
             onClick={onClose}
             className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
           >
             Close
           </button>
         </div>
       </div>
     );
   }

   const handleViewDetails = () => {
     navigate(`/scooter/${scooter._id}`);
   };

   const goToPreviousImage = () => {
     setCurrentImageIndex((prevIndex) => Math.max(0, prevIndex - 1));
   };

   const goToNextImage = () => {
     setCurrentImageIndex((prevIndex) =>
       Math.min(scooter.images.length - 1, prevIndex + 1)
     );
   };

   return (
     <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-50 flex items-center justify-center p-4">
       <div className="relative max-w-5xl w-full h-4/5 flex items-center justify-center">
         <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 text-white bg-black/70 rounded-full cursor-pointer hover:bg-black/60 transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-6 h-6"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
         </button>
         {scooter.images.length > 1 && (
           <button onClick={goToPreviousImage} className="absolute left-2 z-10 p-3 text-white bg-black/70 rounded-full cursor-pointer hover:bg-black/60 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-6 h-6"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
           </button>
         )}
         {scooter.images.length > 1 && (
           <button onClick={goToNextImage} className="absolute right-2 z-10 p-3 text-white bg-black/70 rounded-full cursor-pointer hover:bg-black/60 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-6 h-6"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
           </button>
         )}
         <img
           src={scooter.images[currentImageIndex]?.url}
           alt={scooter.model}
           className="max-h-full max-w-full object-contain rounded-t-2xl"

         />
         <div className="absolute bottom-0 left-0 right-0 bg-black/80 rounded-t-2xl p-6">
           <div className="flex justify-between items-end">
             <div className="text-gray-100">
               <h3 className="text-xl font-bold">{scooter.model}</h3>
               {scooter.description && <p className="text-white/80 mt-1">{scooter.description}</p>}
             </div>
             <div className="flex gap-3">
               
               <button
                 onClick={handleViewDetails}
                 className="justify-center text-gray-300 gap-2 border border-gray-500 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors  hover:bg-secondary/80 h-10 px-4 py-2 flex items-center"
                 title="View Details"
               >
                 View Details <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link ml-1 w-4 h-4"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
               </button>
             </div>
           </div>
           {scooter.images.length > 1 && (
             <div className="mt-4 flex justify-center">
               <p className="text-white/60 text-sm">Image {currentImageIndex + 1} of {scooter.images.length}</p>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 };

 export default FocusedScooter;