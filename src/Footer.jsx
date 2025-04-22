import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-12">
        {/* Logo and Company Info */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <img
            src="/smg_logo.jpg"
            alt="SMG Resell Logo"
            className="h-16 mb-6"
          />
          <p className="text-xl font-semibold text-center md:text-left">
            SMG Resell®
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-2xl font-semibold mb-4">Contact Us</h4>
          <p className="text-lg mb-2">📞 1882-318-708</p>
          <p className="text-lg mb-2">📞 1882-318-709</p>
          <p className="text-lg mb-2">📧 SMGResell@gmail.com</p>
          <p className="text-lg">📍 Office 350, Sushma Business Tower, Aerocity Road, Mohali.</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-2xl font-semibold mb-4">Follow Us</h4>
          <div className="flex flex-wrap space-x-6 justify-center md:justify-start">
            <a
              href="https://www.facebook.com/smgresell"
              className="text-white hover:text-blue-300 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/smgresell"
              className="text-white hover:text-blue-300 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/_smgelectricscootersltd?igsh=c2w5dXd0Z2oyeXo3"
              className="text-white hover:text-blue-300 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@smgelectricscootersltd?si=q4Sbx6rMEzzBasI0"
              className="text-white hover:text-blue-300 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-4 border-t border-blue-700 pt-2 text-center">
        <p className="text-lg text-gray-300">
          &copy; {new Date().getFullYear()} SMG Resell® | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
