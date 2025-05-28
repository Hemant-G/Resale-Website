import React, { useState, useEffect } from "react";
import axios from "axios";
import ScooterCard from "./ScooterCard";

const UserProfileRedesignedWithSingleEditButton = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    profilePhoto: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState({
    ...profileData,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [userScooters, setUserScooters] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfileAndScooters = async () => {
      setIsLoading(true);
      setError("");
      try {
        const profileResponse = await axios.get(
          `${API_BASE_URL}/api/auth/profile`,
          { withCredentials: true }
        );
        setProfileData(profileResponse.data);
        setUpdatedProfileData(profileResponse.data);

        const scootersResponse = await axios.get(
          `${API_BASE_URL}/api/auth/me/scooters`,
          { withCredentials: true }
        );
        setUserScooters(scootersResponse.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "User Not Logged in!"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileAndScooters();
  }, []);

  const getCsrfToken = () => {
    const name = "XSRF-TOKEN=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfileData({ ...updatedProfileData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedProfileData(profileData);
    setSuccessMessage("");
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        updatedProfileData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": getCsrfToken(),
          },
          withCredentials: true,
        }
      );
      setProfileData(response.data);
      setUpdatedProfileData(response.data);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {/* Left Sidebar - User Profile Info */}
          <div className="bg-indigo-50 py-8 px-6 border-r border-gray-200">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-200 shadow-md">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-500 text-4xl">
                    👤
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mt-4">
                {profileData.username}
              </h2>
              <p className="text-gray-600 text-sm">{profileData.email}</p>

              <div className="mt-6 space-y-4 text-gray-700">
                <div className="flex items-center space-x-2">
                  {/* {<PhoneIcon className="w-5 h-5 text-indigo-500" />} */}
                  <strong className="block text-sm font-medium">Phone:</strong>
                  <span>{profileData.phone || "-"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {/* {<MapPinIcon className="w-5 h-5 text-indigo-500" />} */}
                  <strong className="block text-sm font-medium">Address:</strong>
                  <span>{profileData.address || "-"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {/* {<HomeIcon className="w-5 h-5 text-indigo-500" />} */}
                  <strong className="block text-sm font-medium">City:</strong>
                  <span>{profileData.city || "-"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <strong className="block text-sm font-medium">State:</strong>
                  <span>{profileData.state || "-"}</span>
                </div>
                {/* Add other relevant profile info here */}
              </div>

              <div className="mt-8">
                {!isEditing ? (
                  <button
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline transition duration-200"
                    onClick={handleEditClick}
                  >
                    <svg
                      className="w-4 h-4 mr-2 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 8l-2 2 2 2 8-8 2.828-2.828zM7 12l-2 2 2 2 4-4-2-2-2 2z" />
                    </svg>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      className="inline-flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline transition duration-200"
                      onClick={handleSaveClick}
                    >
                      Save Changes
                    </button>
                    <button
                      className="inline-flex items-center justify-center bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline transition duration-200"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {successMessage && (
                  <p className="mt-2 text-green-500">{successMessage}</p>
                )}
                {error && <p className="mt-2 text-red-500">{error}</p>}
                {isLoading && (
                  <p className="mt-2 text-gray-500 italic">Loading...</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Content Area - User's Scooters */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-50 py-8 px-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Your Scooters for Sale
            </h2>
            {isEditing ? (
              <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Edit Profile Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-gray-600 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username:
                    </label>
                    <input
                      className="shadow border border-slate-400 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus-shadow-outline"
                      id="username"
                      type="text"
                      name="username"
                      value={updatedProfileData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-600 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      className="shadow  border border-slate-400  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus-shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      value={updatedProfileData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-600 text-sm font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone:
                    </label>
                    <input
                      className="shadow  border border-slate-400 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus-shadow-outline"
                      id="phone"
                      type="text"
                      name="phone"
                      value={updatedProfileData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-600 text-sm font-bold mb-2"
                      htmlFor="address"
                    >
                      Address:
                    </label>
                    <input
                      className="shadow  border border-slate-400 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus-shadow-outline"
                      id="address"
                      type="text"
                      name="address"
                      value={updatedProfileData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-600 text-sm font-bold mb-2"
                      htmlFor="city"
                    >
                      City:
                    </label>
                    <input
                      className="shadow  border border-slate-400 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus-shadow-outline"
                      id="city"
                      type="text"
                      name="city"
                      value={updatedProfileData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-600 text-sm font-bold mb-2"
                      htmlFor="state"
                    >
                      State:
                    </label>
                    <input
                      className="shadow  border border-slate-400 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus-shadow-outline"
                      id="state"
                      type="text"
                      name="state"
                      value={updatedProfileData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* You might want to add options to edit individual scooter listings here */}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {userScooters.length > 0 ? (
                  userScooters.map((scooter) => (
                    <ScooterCard key={scooter._id} scooter={scooter} />
                  ))
                ) : (
                  <div className="col-span-full py-6 text-center text-gray-600 italic">
                    You haven't posted any scooters for sale yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileRedesignedWithSingleEditButton;