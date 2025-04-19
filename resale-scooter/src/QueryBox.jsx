import React, { useState } from "react";

const popularQueries = [
  "How do I sell my vehicle?",
  "What documents are required?",
  "How do I schedule a pickup?",
  "Can I edit my listing?",
  "Is there a resale fee?",
];

const QueryBox = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleQueryClick = (query) => {
    setMessage(query); // Set the query as the message when clicked
  };

  const handleSubmit = () => {
    // Check if Name, Mobile, Email, and Message are filled out
    if (name.trim() === "" || mobile.trim() === "" || email.trim() === "" || message.trim() === "") {
      alert("Please fill all the required fields: Name, Mobile No, Gmail ID, and Message.");
      return;
    }

    // If all fields are filled, prepare the form data and log it
    const formData = {
      name,
      mobile,
      email,
      message,
    };

    // Optionally clear form inputs after submission
    setName("");
    setMobile("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-blue-900 text-white rounded-2xl my-5 shadow-lg shadow-slate-400 px-4">
      <h1 className="text-2xl font-semibold mb-6">Hi, how can we help?</h1>

      {/* Form fields */}
      <div className="flex flex-col gap-2 w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-full text-white bg-white/10 placeholder-white outline-none"
        />
        <input
          type="tel"
          placeholder="Mobile No"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="px-4 py-2 rounded-full text-white bg-white/10 placeholder-white outline-none"
        />
        <input
          type="email"
          placeholder="Gmail ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-full text-white bg-white/10 placeholder-white outline-none"
        />
      </div>

      {/* Message input */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-xl shadow-md mb-6">
        <input
          type="text"
          placeholder="Ask your query here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 text-gray-700 bg-transparent outline-none"
        />
        <button
          onClick={handleSubmit}
          className="text-blue-900 font-semibold px-3 py-1 rounded-full hover:bg-blue-100 transition"
        >
          Send
        </button>
      </div>

      {/* Popular queries */}
      <div className="text-sm text-white opacity-80 mb-2">Popular queries:</div>
      <div className="flex flex-wrap gap-2 justify-center">
        {popularQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => handleQueryClick(query)}
            className="bg-white text-blue-900 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QueryBox;
