import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/smg_logo.jpg"
              alt="Company Logo"
              className="w-60 h-auto mr-4"
            />
          </div>

          {/* Link Sections Wrapper */}
          <div className="flex flex-wrap gap-16 justify-between flex-grow">
            {/* Company */}
            <div className="w-full md:w-auto">
              <h2 className="font-semibold mb-3">Company</h2>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="w-full md:w-auto">
              <h2 className="font-semibold mb-3">Support</h2>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Report an Issue</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="w-full md:w-auto">
              <h2 className="font-semibold mb-3">Legal</h2>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="#">Cookie Policy</a>
                </li>
                <li>
                  <a href="#">Accessibility</a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="w-full md:w-auto mt-8 md:mt-0">
              <h2 className="font-semibold mb-3">Follow Us</h2>
              <div className="flex flex-col space-y-2 text-sm opacity-90">
                <div className="w-1/2 md:w-auto">
                  <a href="#" target="_blank">LinkedIn</a>
                </div>
                <div className="w-1/2 md:w-auto">
                  <a href="https://youtube.com/@smgelectricscootersltd?si=q4Sbx6rMEzzBasI0" target="_blank">
                    YouTube
                  </a>
                </div>
                <div className="w-1/2 md:w-auto">
                  <a href="https://www.instagram.com/_smgelectricscootersltd?igsh=c2w5dXd0Z2oyeXo3" target="_blank">
                    Instagram
                  </a>
                </div>
                <div className="w-1/2 md:w-auto">
                  <a href="#" target="_blank">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-blue-800 pt-4 text-center text-sm opacity-70">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
