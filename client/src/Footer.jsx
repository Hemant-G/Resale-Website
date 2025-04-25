import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-10">
        
        {/* Logo & Company Name */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/smg_logo.jpg" alt="SMG Resell Logo" className="h-16 mb-4 mx-auto md:mx-0" />
          <p className="text-xl font-semibold">SMG Resell®</p>
        </div>

        {/* Company */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Support */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Report an Issue</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Legal */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Cookie Policy</li>
            <li>Accessibility</li>
          </ul>
        </div>

        {/* Explore */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>How it Works</li>
            <li>Pricing</li>
            <li>Partners</li>
            <li>Testimonials</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <p>📞 1882-318-708, 1882-318-709</p>
            <p>📧 SMGResell@gmail.com</p>
            <p>📍 Office 350, Sushma Business Tower, Aerocity Road, Mohali.</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="col-span-2 flex flex-col items-center md:items-start">
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex items-center gap-6 mt-2">
            <a
              href="https://www.instagram.com/_smgelectricscootersltd?igsh=c2w5dXd0Z2oyeXo3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              <img
                src="Instagram_Glyph_Gradient.png"
                alt="Instagram"
                className="w-[30px] mb-4"
              />
            </a>
            <a
              href="https://youtube.com/@smgelectricscootersltd?si=q4Sbx6rMEzzBasI0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              <img
                src="youtube_social_icon_red.png"
                alt="YouTube"
                className="w-[40px] mb-4"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="h-[1px] w-screen my-1 bg-blue-900"></div>
      <div className="mt-5 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} SMG Resell® | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
