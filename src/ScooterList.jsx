import React from "react";
import ScooterCard from "./ScooterCard";

const dummyScooters = [
  {
    image: "src\\assets\\red.jpg",
    title: "Model ABC",
    distance: 12,
    year: 2021,
    kmsDriven: 8000,
    price: 18500,
    emiStart: 500,
    owner: "1st Owner",
    color: "red",
  },
  {
    image: "src\\assets\\grey.jpg",
    title: "Model XYZ",
    distance: 5,
    year: 2022,
    kmsDriven: 5000,
    price: 29500,
    emiStart: 790,
    owner: "2nd Owner",
    color: "grey",
  },
  {
    image: "src\\assets\\blue.jpg",
    title: "Model PQR",
    distance: 20,
    year: 2020,
    kmsDriven: 12000,
    price: 17500,
    emiStart: 470,
    owner: "More than 2 owners",
    color: "blue",
  },
  {
    image: "src\\assets\\white.jpg",
    title: "Model DEF",
    distance: 8,
    year: 2023,
    kmsDriven: 3000,
    price: 30000,
    emiStart: 800,
    owner: "1st Owner",
    color: "white",
  },
  {
    image: "src\\assets\\grey2.jpg",
    title: "Model JKL",
    distance: 25,
    year: 2022,
    kmsDriven: 7500,
    price: 28000,
    emiStart: 765,
    owner: "More than 2 owners",
    color: "grey",
  },
];

const currentYear = new Date().getFullYear();

const ScooterList = ({ filters, sortOption }) => {
  const sortedScooters = [...dummyScooters].sort((a, b) => {
    switch (sortOption) {
      case "price_low_high":
        return a.price - b.price;
      case "price_high_low":
        return b.price - a.price;
      case "year_new_old":
        return b.year - a.year;
      default:
        return 0;
    }
  });

  const filteredScooters = sortedScooters.filter((scooter) => {
    return filters.every((filter) => {
      const f = filter.toLowerCase();

      // Price filter
      if (["₹0-₹20,000", "₹20,000-₹50,000"].includes(filter)) {
        switch (filter) {
          case "₹0-₹20,000":
            return scooter.price <= 20000;
          case "₹20,000-₹50,000":
            return scooter.price > 20000 && scooter.price <= 50000;
          default:
            return true;
        }
      }

      // Kms driven filter
      if (
        [
          "Less than 10k km",
          "10k - 20k km",
          "20k - 30k km",
          "More than 30k km",
        ].includes(filter)
      ) {
        switch (filter) {
          case "Less than 10k km":
            return scooter.kmsDriven < 10000;
          case "10k - 20k km":
            return scooter.kmsDriven >= 10000 && scooter.kmsDriven <= 20000;
          case "20k - 30k km":
            return scooter.kmsDriven > 20000 && scooter.kmsDriven <= 30000;
          case "More than 30k km":
            return scooter.kmsDriven > 30000;
          default:
            return true;
        }
      }

      // Age filter
      if (["0-2 years", "3-5 years", "6-10 years", "10+ years"].includes(filter)) {
        const age = currentYear - scooter.year;
        switch (filter) {
          case "0-2 years":
            return age >= 0 && age <= 2;
          case "3-5 years":
            return age >= 3 && age <= 5;
          case "6-10 years":
            return age >= 6 && age <= 10;
          case "10+ years":
            return age > 10;
          default:
            return true;
        }
      }

      // Owner filter
      if (["1st Owner", "2nd Owner", "More than 2 owners"].includes(filter)) {
        return scooter.owner === filter;
      }

      // Color filter
      const colorOptions = [
        "white",
        "grey",
        "red",
        "blue",
        "black",
        "orange",
        "yellow",
        "pink",
        "brown",
        "green",
      ];
      if (colorOptions.includes(f)) {
        return scooter.color.toLowerCase() === f;
      }

      // Range (distance) filter
      if (filter.includes("Km")) {
        const rangeValue = parseInt(filter.split(" ")[0]);
        return scooter.distance <= rangeValue;
      }

      return true;
    });
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredScooters.length > 0 ? (
        filteredScooters.map((scooter, index) => (
          <ScooterCard key={index} scooter={scooter} />
        ))
      ) : (
        <p className="text-gray-600 col-span-full">No scooters match your filters.</p>
      )}
    </div>
  );
};

export default ScooterList;
