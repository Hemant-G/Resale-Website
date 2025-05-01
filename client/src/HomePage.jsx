import React from "react";
import { Link } from "react-router"; // corrected import

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Section 1: SMG Resell® Advantage */}
      <section className="w-full px-6 py-24">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-5/6 text-center">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-4">
              SMG Resell® Advantage
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              <span className="font-extrabold text-blue-900">SMG Resell®</span>{" "}
              facilitates the seamless purchase and exchange of Pre owned
              E-Scooters. This end-to-end solution assures buyers and sellers of
              quality, transparency, affordability, value-for-money and complete
              peace of mind, in all the transactions related to pre-owned
              E-Scooters.
            </p>
            <Link
              to="/about"
              className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
            >
              Learn More
            </Link>
          </div>
          <img
            src="SMG_showroom.jpg"
            alt="Showroom"
            className="h-60 w-[520px] object-cover rounded-xl"
          />
        </div>
      </section>

      {/* Section 2: Exchange Made Easy */}
      <section className="w-full px-6 py-24 bg-slate-300">
        <div className="flex flex-col  items-center gap-10">
          <div className="w-5/6 text-center">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-4">
              Exchange Made Easy
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Get the best resale value of your used vehicle(s) with a
              hassle-free exchange process and upgrade to the latest,
              technologically advanced SMG electric vehicle(s).
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Buy Pre owned E-Scooters */}
      <section className="w-full px-6 py-24">
        <div className="flex flex-col items-center gap-10">
          <div className="w-5/6 text-center">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-4">
              Buy Pre owned E-Scooters
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Looking to buy a Pre-Owned E-Scooter that has passed the rigorous
              checks by{" "}
              <span className="font-extrabold text-blue-900">SMG Resell®</span>?
              Let us know your requirements and we will help you find the
              perfect fit. You can also explore the options of extended warranty
              and AMC, on these vehicles*.
            </p>
            <Link
              to="/buy"
              className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
            >
              Browse Scooters
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Pre-owned E-Scooters Finance */}
      <section className="w-full px-6 py-24 bg-slate-300">
        <div className="flex flex-col  items-center gap-10">
          <div className="w-5/6 text-center">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-4">
              Pre-owned E-Scooters Finance
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Owning a pre-owned E-Scooter is now easier with timely support
              from{" "}
              <span className="font-extrabold text-blue-900">SMG Resell®</span>{" "}
              Financing solutions. We have a team of associate financiers who
              are always available to facilitate easy and hassle-free loans.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
