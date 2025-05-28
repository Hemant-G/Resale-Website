import React, { useState } from "react";
import SidebarFilter from "./SidebarFilter";
import ScooterList from "./ScooterList";
import SortDropdown from "./SortDropdown";
import Banner from "./Banner";
import AppliedFilters from "./AppliedFilters";
import QueryBox from "./QueryBox";

function BuyPage() {
    const [filters, setFilters] = useState({});
    const [sortOption, setSortOption] = useState("");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const updateFilters = (newFilter) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            for (const key in newFilter) {
                if (newFilter[key] === undefined || (Array.isArray(newFilter[key]) && newFilter[key].length === 0)) {
                    delete updatedFilters[key];
                } else {
                    updatedFilters[key] = newFilter[key];
                }
            }
            return updatedFilters;
        });
    };

    const removeFilter = (filterKey, filterValue) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[filterKey]) {
                if (Array.isArray(updatedFilters[filterKey])) {
                    updatedFilters[filterKey] = updatedFilters[filterKey].filter(val => val !== filterValue);
                    if (updatedFilters[filterKey].length === 0) {
                        delete updatedFilters[filterKey];
                    }
                } else if (updatedFilters[filterKey] === filterValue) {
                    delete updatedFilters[filterKey];
                }
            }
            return updatedFilters;
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 relative">
            {/* Mobile Filter Button */}
            <div className="flex justify-center mb-4 md:hidden">
                <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="w-2/3 border border-blue-900 text-slate-700 px-4 py-2 rounded-md font-semibold text-lg"
                >
                    Filters
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileFilterOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-xs backdrop-brightness-40 z-40"
                    onClick={() => setMobileFilterOpen(false)}
                />
            )}

            {/* Sidebar (Mobile Drawer) */}
            <aside
                className={`fixed z-50 top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="text-gray-600 text-lg font-bold"
                    >
                        ╳
                    </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                    <SidebarFilter filters={filters} updateFilters={updateFilters} />
                </div>
            </aside>

            {/* Page Layout */}
            <div className="w-full  mx-auto flex flex-col md:flex-row gap-6">
                {/* Sidebar (Desktop only) */}
                <aside className="w-full hidden md:block md:w-1/4">
                    <SidebarFilter filters={filters} updateFilters={updateFilters} />
                </aside>

                {/* Main Content */}
                <main className="w-full md:w-3/4">
                    { /* <h1 className="text-2xl font-bold text-gray-800 mb-3">
                        64 Scooters Nearby Chandigarh for Sale!
                    </h1> */ }

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <AppliedFilters filters={filters} onRemove={removeFilter} />
                        <SortDropdown onSortChange={setSortOption} />
                    </div>

                    {/* <Banner /> */}

                    <div className="mt-4">
                        <ScooterList filters={filters} sortOption={sortOption} />
                    </div>
                </main>
            </div>

            <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <QueryBox />
            </div>
        </div>
    );
}

export default BuyPage;