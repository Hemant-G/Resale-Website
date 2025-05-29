import React, { useState } from "react";

const CareersPage = () => {
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [jobTypeFilter, setJobTypeFilter] = useState("All Types"); // Note: job type is not in your sample data
  const [remoteOnly, setRemoteOnly] = useState(false); // Note: remote status is not in your sample data
  const [searchTerm, setSearchTerm] = useState("");
  const [openPositions, setOpenPositions] = useState([
    {
      s_no: 1,
      designation: "Sales Manager",
      level: "L4",
      qualification: "Graduate",
      experience: "1-2 Years",
      job_description: [
        "Assisting In Sale Of Pre Owned Vehicle",
        "Contacting Owner And Client",
      ],
      department: "Resale Showroom",
      job_location: "Hoshiarpur,Jalandhar",
      ctc: "₹3-4 Lakhs",
      isExpanded: false,
    },
    {
      s_no: 2,
      designation: "General Manager",
      level: "L4",
      qualification: "Graduate",
      experience: "1-2 Years",
      job_description: [
        "Maintaining Records Of Pre Owned Vehicle",
        "Carrying Operations",
      ],
      department: "Resale Showroom",
      job_location: "Hoshiarpur,Jalandhar",
      ctc: "₹3-4 Lakhs",
      isExpanded: false,
    },
    {
      s_no: 3,
      designation: "Legal Compliance Officer",
      level: "L4",
      qualification: "Graduate",
      experience: "1-2 Years",
      job_description: [
        "Fullfilling Legal Compliance For Resale Of Ev2 Wheeler.",
        "Carrying Documentation",
      ],
      department: "Resale Showroom",
      job_location: "Hoshiarpur,Jalandhar",
      ctc: "₹3-4 Lakhs",
      isExpanded: false,
    },

    // ... more positions
  ]);

  const [benefits, setBenefits] = useState([
    "Comprehensive Healthcare (Medical, dental, and vision coverage)",
    "Flexible Work Arrangements (Remote options and flexible scheduling)",
    "Competitive Compensation (Salary packages and equity options)",
    "Learning & Development (Training budgets and mentorship programs)",
    "Employee Vehicle Program (Special pricing and lease options)",
    // ... more benefits
  ]);

  // Function to toggle the expanded state of a job
  const toggleDetails = (s_no) => {
    setOpenPositions(
      openPositions.map((position) =>
        position.s_no === s_no
          ? { ...position, isExpanded: !position.isExpanded }
          : position
      )
    );
  };

  const filteredPositions = openPositions.filter((position) => {
    const departmentMatch =
      departmentFilter === "All Departments" ||
      position.department === departmentFilter;
    // Split locations and check if any include the filter term
    const locationMatch =
      locationFilter === "All Locations" ||
      position.job_location
        ?.split(",")
        .some((loc) => loc.trim().includes(locationFilter.trim()));
    const typeMatch =
      jobTypeFilter === "All Types" || position.type === jobTypeFilter; // Still includes jobTypeFilter but it won't match current data
    const remoteMatch = !remoteOnly || position.remote; // Still includes remoteOnly but it won't match current data
    const searchMatch =
      searchTerm === "" ||
      position.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.job_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(position.job_description)
        ? position.job_description
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : typeof position.job_description === "string" &&
          position.job_description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

    return (
      departmentMatch &&
      locationMatch &&
      typeMatch &&
      remoteMatch &&
      searchMatch
    );
  });

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Join Our Mission</h1>
        <p className="text-lg mb-8">
          Help us accelerate the world's transition to sustainable
          transportation. Join our team of innovators and make an impact on the
          future of mobility.
        </p>
        <div className="flex justify-center">
          <div className="relative w-2/3 max-w-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            <input
              type="text"
              placeholder="Search for jobs..."
              className="w-full py-3 mx-1 pl-10 pr-4 bg-white rounded-md text-gray-700 focus:outline-none "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Why SMG? */}
      <div className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Join SMG?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            {" "}
            {/* Added flex and items-center */}
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#2B3A8C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Impact</h3>
            <p className="text-gray-600">
              Your work directly contributes to a sustainable future. Help
              reduce carbon emissions and build cleaner transportation
              solutions.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            {" "}
            {/* Added flex and items-center */}
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#2B3A8C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Work with cutting-edge technology and pioneering solutions. We
              encourage creative thinking and bold ideas to solve complex
              challenges.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            {" "}
            {/* Added flex and items-center */}
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#2B3A8C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Growth</h3>
            <p className="text-gray-600">
              Develop your career in a supportive environment with opportunities
              for advancement. We invest in our team's professional and personal
              development.
            </p>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row ">
          {/* Filters */}
          <div className="lg:w-1/4 xl:w-1/5 lg:pr-8 mb-8 lg:mb-0 lg:sticky top-24 self-start">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            <div className="mb-4">
              <label
                htmlFor="department"
                className="block font-semibold text-gray-700 mb-2"
              >
                Department:
              </label>
              <select
                id="department"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="All Departments">All Departments</option>
                {Array.from(
                  new Set(openPositions.map((p) => p.department))
                ).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block font-semibold text-gray-700 mb-2"
              >
                Location:
              </label>
              <select
                id="location"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="All Locations">All Locations</option>
                {Array.from(
                  new Set(
                    openPositions.flatMap((p) =>
                      p.job_location.split(",").map((loc) => loc.trim())
                    )
                  )
                ).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="jobType"
                className="block font-semibold text-gray-700 mb-2"
              >
                Job Type:
              </label>
              <select
                id="jobType"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
              >
                <option value="All Types">All Types</option>
                {/* Add options for unique job types if 'type' property is added to data */}
                {/* {Array.from(new Set(openPositions.map(p => p.type).filter(Boolean))).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))} */}
              </select>
            </div>

            <div className="mb-4">
              <input
                type="checkbox"
                id="remoteOnly"
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
              />
              <label
                htmlFor="remoteOnly"
                className="ml-2 font-semibold text-gray-700"
              >
                Remote Only
              </label>
            </div>

            {/* Reset Filters Button */}
            {(departmentFilter !== "All Departments" ||
              locationFilter !== "All Locations" ||
              jobTypeFilter !== "All Types" ||
              remoteOnly ||
              searchTerm) && (
              <button
                onClick={() => {
                  setDepartmentFilter("All Departments");
                  setLocationFilter("All Locations");
                  setJobTypeFilter("All Types");
                  setRemoteOnly(false);
                  setSearchTerm("");
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4 xl:w-4/5">
            <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
            <ul>
              {filteredPositions.length > 0 ? (
                filteredPositions.map((position) => (
                  <li
                    key={position.s_no}
                    className={`bg-white rounded-lg shadow-md p-6 mb-4 ${
                      position.isExpanded ? "border-2 border-blue-900" : ""
                    }`}
                  >
                    <div className="md:flex justify-between items-start">
                      {" "}
                      {/* Changed items-center to items-start */}
                      <div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                          {position.designation}
                        </h3>
                        {/* Tags for Department and Location */}
                        <div className="flex flex-wrap mb-2">
                          {position.department && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">
                              {position.department}
                            </span>
                          )}
                          {position.job_location?.split(",").map((loc) => (
                            <span
                              key={loc.trim()}
                              className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2"
                            >
                              {loc.trim()}
                            </span>
                          ))}
                          {/* Add Job Type tag if 'type' property is added */}
                          {/* {position.type && (
                              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">{position.type}</span>
                            )} */}
                          {position.remote && (
                            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">
                              Remote
                            </span>
                          )}
                        </div>

                        {/* Collapsible Job Description and Details */}
                        <div
                          className={`overflow-hidden transition-max-height duration-700 ease-in-out ${
                            position.isExpanded ? "max-h-screen" : "max-h-16"
                          }`}
                        >
                          {/* Adjust max-h-16 to control initial preview height */}
                          <p className="text-gray-700 mt-2">
                            {position.isExpanded
                              ? // Show full description when expanded
                                Array.isArray(position.job_description)
                                ? position.job_description.map((item, idx) => (
                                    <span key={idx} className="block">
                                      - {item}
                                    </span>
                                  ))
                                : position.job_description
                              : // Show truncated description when collapsed
                              Array.isArray(position.job_description)
                              ? position.job_description
                                  .join(" ")
                                  .substring(0, 150) +
                                (position.job_description.join(" ").length > 150
                                  ? "..."
                                  : "")
                              : typeof position.job_description === "string"
                              ? position.job_description.substring(0, 150) +
                                (position.job_description.length > 150
                                  ? "..."
                                  : "")
                              : "No description available."}
                          </p>
                          {position.isExpanded && (
                            <div className="mt-4 text-gray-700">
                              <p>
                                <strong>Level:</strong> {position.level}
                              </p>
                              <p>
                                <strong>Qualification:</strong>{" "}
                                {position.qualification}
                              </p>
                              <p>
                                <strong>Experience:</strong>{" "}
                                {position.experience}
                              </p>
                              <p>
                                <strong>CTC:</strong> {position.ctc}
                              </p>
                              {/* Add other details you want to show when expanded */}
                            </div>
                          )}
                        </div>

                        <button
                          className="text-blue-500 hover:text-blue-700 focus:outline-none mt-2"
                          onClick={() => toggleDetails(position.s_no)}
                        >
                          {position.isExpanded ? "Show Less" : "View Details"}
                        </button>
                      </div>
                      <button className="bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 md:mt-0 self-center md:self-start">
                        Apply Now
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-600">
                  No positions match your criteria.
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits & Perks */}
      <div className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Benefits & Perks
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-start"
            >
              <svg
                className="h-6 w-6 text-green-500 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Don't See the Right Position? */}
      <div className="py-16 bg-blue-50 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Don't See the Right Position?
        </h2>
        <p className="text-blue-900 mb-8">
          We're always looking for talented individuals to join our team. Submit
          your resume for future opportunities.
        </p>
        <button className="bg-blue-900 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          Contact Our Talent Team
        </button>
      </div>
    </div>
  );
};

export default CareersPage;
