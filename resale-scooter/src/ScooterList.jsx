import React from "react";
import ScooterCard from "./ScooterCard";

const dummyScooters = [
  {
    image: "https://images.pexels.com/photos/159192/vespa-roller-motor-scooter-cult-159192.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model ABC",
    distance: 12,
    year: 2021,
    kmsDriven: 8000,
    price: 18500,
    emiStart: 500,
    owner: "1st Owner",
    color: "red"
  },
  {
    image: "https://images.pexels.com/photos/205912/pexels-photo-205912.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model XYZ",
    distance: 5,
    year: 2022,
    kmsDriven: 5000,
    price: 29500,
    emiStart: 790,
    owner: "2nd Owner",
    color: "grey"
  },
  {
    image: "https://images.pexels.com/photos/159210/vespa-roller-motor-scooter-cult-159210.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model PQR",
    distance: 20,
    year: 2020,
    kmsDriven: 12000,
    price: 17500,
    emiStart: 470,
    owner: "More than 2 owners",
    color: "blue"
  },
  {
    image: "https://images.pexels.com/photos/1710509/pexels-photo-1710509.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model DEF",
    distance: 8,
    year: 2023,
    kmsDriven: 3000,
    price: 30000,
    emiStart: 800,
    owner: "1st Owner",
    color: "green"
  },
  {
    image: "https://images.pexels.com/photos/2067568/pexels-photo-2067568.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model GHI",
    distance: 15,
    year: 2023,
    kmsDriven: 2000,
    price: 19500,
    emiStart: 520,
    owner: "2nd Owner",
    color: "brown"
  },
  {
    image: "https://images.pexels.com/photos/4542987/pexels-photo-4542987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Model JKL",
    distance: 25,
    year: 2022,
    kmsDriven: 7500,
    price: 28000,
    emiStart: 765,
    owner: "More than 2 owners",
    color: "blue"
  }
];

const currentYear = new Date().getFullYear();

const ScooterList = ({ filters }) => {
  const filteredScooters = dummyScooters.filter((scooter) => {
    return filters.every((filter) => {
      const f = filter.toLowerCase();

      //  Handle price (budget) filters
      const isBudgetFilter = ["₹0-₹20,000", "₹20,000-₹50,000"].includes(filter);
      if (isBudgetFilter) {
        switch (filter) {
          case "₹0-₹20,000":
            return scooter.price <= 20000;
          case "₹20,000-₹50,000":
            return scooter.price >= 20000 && scooter.price <= 50000;
          default:
            return false;
        }
      }

      //  Handle kms driven filters
      const isKmsFilter = [
        "Less than 10k km",
        "10k - 20k km",
        "20k - 30k km",
        "More than 30k km"
      ].includes(filter);
      if (isKmsFilter) {
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
            return false;
        }
      }

      //  Handle age filters
      const isAgeFilter = [
        "0-2 years",
        "3-5 years",
        "6-10 years",
        "10+ years"
      ].includes(filter);
      if (isAgeFilter) {
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
            return false;
        }
      }

      //  Handle owner filter
      const isOwnerFilter = [
        "1st Owner",
        "2nd Owner",
        "More than 2 owners"
      ].includes(filter);
      if (isOwnerFilter) {
        return scooter.owner === filter;
      }

      // Handle color filter
      const isColorFilter = [
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
      ]
      .includes(filter);
      if (isColorFilter) {
        return scooter.color && scooter.color.toLowerCase() === f;
      }

      // Handle range filter
      if(filter.includes("Km")){
        const range = filter.split(" ");
        return scooter.distance <= range[0];
      }


      //  Fallback for matching by year (if ever needed)
      return scooter.year.toString() === filter;
    });
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredScooters.length > 0 ? (
        filteredScooters.map((scooter, index) => (
          <ScooterCard key={index} scooter={scooter} />
        ))
      ) : (
        <p className="text-gray-600">No scooters match your filters.</p>
      )}
    </div>
  );
};

export default ScooterList;
