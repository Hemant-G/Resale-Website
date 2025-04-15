import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 text-sm text-gray-700 w-full">
      {/* App Banner Section */}
      <div className="bg-blue-900 text-white flex flex-col w-full md:flex-row items-center justify-between p-6 px-10 space-y-4 md:space-y-0">
        <div className="flex items-center gap-6">
          <img alt="App Banner" className="h-16 md:h-20" />
          <div>
            <p>
              Want to have over 10,000 scooters to choose from, right at your
              fingertips?
            </p>
            <h2 className="text-lg font-semibold mt-1">
              Download the True Value app now!
            </h2>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <img alt="App Store" className="h-10" />
          <img alt="Google Play" className="h-10" />
          <div className="ml-6">
            <p className="text-white font-medium">Connect With us</p>
            <div className="flex gap-4 mt-1">
              <div className="w-8 h-8 bg-white rounded-full" />
              <div className="w-8 h-8 bg-white rounded-full" />
              <div className="w-8 h-8 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-gray-100 py-8 px-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p>EMI Calculator</p>
          <p>Site Map</p>
          <p>Showroom Locator</p>
        </div>
        <div>
          <p>Complaint</p>
          <p>About</p>
          <p>Blog</p>
        </div>
        <div>
          <p>Careers</p>
          <p>Contact us</p>
          <p>FAQs</p>
          <p>Feedback</p>
        </div>
        <div>
          <p>Buy</p>
          <p>Sell</p>
          <p>Finance</p>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p className="mt-2 text-blue-800 font-medium">18001021800</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-100 text-xs px-10 pb-4 pt-2 space-y-2">
        <p>
          *Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scramble
        </p>
        <p>* and web page editors now use Lorem Ipsum as their default model text, and a search fe e</p>
        <p className="font-bold text-black">
          *Caution: Beware of Fake Promotions or Offers
        </p>
        
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 py-4 border-t">
        All Rights Reserved. © 2019 SMG ELECTRIC SCOOTERS LTD
        <br />
        Head Office : Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore
      </div>
    </footer>
  );
};

export default Footer;
