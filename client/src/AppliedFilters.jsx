import React from "react";

function AppliedFilters({ filters, onRemove }) {
  return (
    <div className="flex flex-row flex-wrap">
      {Object.entries(filters).map(([key, value]) => {
        const displayValues = Array.isArray(value) ? value : [value];
        return displayValues.map((val) => (
          <div
            key={`${key}-${val}`}
            className="m-1 px-2 py-1 border rounded-2xl flex flex-row gap-2 items-center cursor-pointer bg-blue-100 hover:bg-blue-200"
            onClick={() => onRemove(key, val)}
          >
            <span>
              {key === "price_gte" && "Price ≥ ₹"}
              {key === "price_lte" && "Price ≤ ₹"}
              {key === "kms_lte" && "Kms ≤ "}
              {key === "kms_gte" && "Kms ≥ "}
              {key === "year_gte" && "Year ≥ "}
              {key === "year_lte" && "Year ≤ "}
              {key === "color" && "Color: "}
              {key === "owner" && "Owner: "}
              {key === "distance_lte" && "Range ≤ "}
              {key === "state" && "State: "}
              {key === "city" && "City: "}
              {val}
            </span>
            <span className="text-red-500 font-bold">✕</span>
          </div>
        ));
      })}
    </div>
  );
}

export default AppliedFilters;
