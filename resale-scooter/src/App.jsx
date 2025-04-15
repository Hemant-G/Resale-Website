import { useState } from "react";
import "./App.css";
import SidebarFilter from "./SidebarFilter";
import ScooterList from "./ScooterList";
import SortDropdown from "./SortDropDown";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppliedFilters from "./AppliedFilters";

function App() {
  const [filters, setFilters] = useState([]);

  const addFilter = (filter) => {
    setFilters((prev) => (prev.includes(filter) ? prev : [...prev, filter]));
  };

  const removeFilter = (filter) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen w-full bg-gray-100 px-4 py-6">
        <div className="w-full mx-auto flex flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <SidebarFilter filters={filters} addFilter={addFilter} removeFilter={removeFilter} />
          </aside>

          {/* Main Content */}
          <main className="w-full w-">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              64 Scooters Nearby Chandigarh for Sale!
            </h1>
            <AppliedFilters filters={filters} onRemove={removeFilter} />
            <SortDropdown />
            <Banner />
            <ScooterList filters={filters} />
          </main>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
