import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-6 leading-relaxed text-lg">
        <p>
          India’s pre-owned E-Scooter market is growing and maturing in tandem,
          and{" "}
          <span className="mb-4 text-xl font-extrabold leading-none tracking-tight text-blue-800">
            RESELL®
          </span>{" "}
          is at the forefront of this evolution. Our sole and overriding
          objective is to empower both the pre-owned scooter buyers and sellers
          through a methodical integration of technology and industry
          experience.
        </p>

        <p>
          Since foraying into India’s pre-owned E-Scooter market in 2022,{" "}
          <span className="mb-4 text-xl font-extrabold leading-none tracking-tight text-blue-800">
            RESELL®
          </span>
          , SMG Electric Scooter’s channel for pre-owned e-scooters, has grown
          in both size and stature. Being among the first major organized
          players in the market, the brand has expanded its pan India reach via
          a network of over <strong>15 outlets across 13 cities</strong>.
        </p>

        <p>
          Today,{" "}
          <span className="mb-4 text-xl font-extrabold leading-none tracking-tight text-blue-800">
            SMG RESELL®
          </span>{" "}
          is a trusted destination for buyers and sellers alike, committed to
          making pre-owned electric mobility accessible, transparent, and
          dependable.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">
            Why Choose Resell®
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-blue-800">
                Reliable E-Scooters
              </h3>
              <p className="text-gray-700 text-lg">
                Every pre-owned E-Scooter is digitally evaluated on{" "}
                <strong>78+ checkpoints</strong> to ensure quality and
                reliability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-blue-800">
                Fair Pricing
              </h3>
              <p className="text-gray-700 text-lg">
                Get transparent, market-driven prices on E-Scooters from
                multiple trusted brands.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-blue-800">
                Seamless Experience
              </h3>
              <p className="text-gray-700 text-lg">
                Enjoy convenient, customer-first processes designed for both
                buyers and sellers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
