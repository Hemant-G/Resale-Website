import React from "react";
import ScooterCard from "./ScooterCard";

const dummyScooters = [
  {
    image: "https://images.pexels.com/photos/159192/vespa-roller-motor-scooter-cult-159192.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model ABC",
    location: "Chandigarh",
    distance: 12,
    year: 2021,
    fuel: "Petrol",
    kmsDriven: 8000,
    price: 78000,
    emiStart: 1550,
    brand: "Brand ABC"
  },
  {
    image: "https://images.pexels.com/photos/205912/pexels-photo-205912.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model XYZ",
    location: "Delhi",
    distance: 5,
    year: 2022,
    fuel: "Petrol",
    kmsDriven: 5000,
    price: 95000,
    emiStart: 1900,
    brand: "Brand XYZ"
  },
  {
    image: "https://images.pexels.com/photos/159210/vespa-roller-motor-scooter-cult-159210.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model PQR",
    location: "Bangalore",
    distance: 20,
    year: 2020,
    fuel: "Petrol",
    kmsDriven: 12000,
    price: 72000,
    emiStart: 1450,
    brand: "Brand PQR"
  },
  {
    image: "https://images.pexels.com/photos/1710509/pexels-photo-1710509.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model DEF",
    location: "Pune",
    distance: 8,
    year: 2023,
    fuel: "Electric",
    kmsDriven: 3000,
    price: 285000,
    emiStart: 5600,
    brand: "Brand DEF"
  },
  {
    image: "https://images.pexels.com/photos/2067568/pexels-photo-2067568.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model GHI",
    location: "Hyderabad",
    distance: 15,
    year: 2023,
    fuel: "Electric",
    kmsDriven: 2000,
    price: 410000,
    emiStart: 8100,
    brand: "Brand GHI"
  },
  {
    image: "https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Model JKL",
    location: "Mumbai",
    distance: 25,
    year: 2022,
    fuel: "Petrol",
    kmsDriven: 7500,
    price: 320000,
    emiStart: 6300,
    brand: "Brand JKL"
  }
];

const ScooterList = ({ filters }) => {
  const applyBudgetFilter = (price) => {
    const budgetFilters = filters.filter((f) =>
      [
        "Less than 2 L",
        "2 L - 4 L",
        "4 L - 6 L",
        "More than 6 L"
      ].includes(f)
    );

    if (budgetFilters.length === 0) return true;

    return budgetFilters.some((filter) => {
      switch (filter) {
        case "Less than 2 L":
          return price < 200000;
        case "2 L - 4 L":
          return price >= 200000 && price <= 400000;
        case "4 L - 6 L":
          return price > 400000 && price <= 600000;
        case "More than 6 L":
          return price > 600000;
        default:
          return true;
      }
    });
  };

  const filteredScooters = dummyScooters.filter((scooter) => {
    return filters.every((filter) => {
      const f = filter.toLowerCase();

      const match =
        scooter.title.toLowerCase().includes(f) ||
        scooter.location.toLowerCase() === f ||
        scooter.fuel.toLowerCase() === f ||
        scooter.brand?.toLowerCase() === f ||
        scooter.year.toString() === filter ||
        scooter.kmsDriven.toString().includes(filter);

      return match || applyBudgetFilter(scooter.price);
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
