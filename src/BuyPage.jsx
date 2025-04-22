import { React, useState } from "react";
import SidebarFilter from "./SidebarFilter";
import ScooterList from "./ScooterList";
import SortDropdown from "./SortDropDown";
import Banner from "./Banner";
import AppliedFilters from "./AppliedFilters";
import QueryBox from "./QueryBox";

function BuyPage() {
  const [filters, setFilters] = useState([]);
  const addFilter = (filter) => {
    setFilters((prev) => (prev.includes(filter) ? prev : [...prev, filter]));
  };

  const removeFilter = (filter) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-6">
      <div className="w-full mx-auto flex flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <SidebarFilter
            filters={filters}
            addFilter={addFilter}
            removeFilter={removeFilter}
          />
        </aside>

        {/* Main Content */}
        <main className="w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            64 Scooters Nearby Chandigarh for Sale!
          </h1>

          <div className="flex flex-row items-center justify-between mb-4">
            <AppliedFilters filters={filters} onRemove={removeFilter} />
            <SortDropdown />
          </div>

          <Banner />
          <ScooterList filters={filters} />
        </main>
      </div>

      <QueryBox />
    </div>
  );
}

export default BuyPage;
