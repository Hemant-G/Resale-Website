function AppliedFilters({ filters, onRemove }) {
    return (
      <div className="flex flex-row flex-wrap">
        {filters.map((fil, index) => (
          <div
            key={index}
            className="m-1 px-2 py-1 border rounded-2xl flex flex-row gap-2 items-center cursor-pointer bg-blue-100 hover:bg-blue-200"
            onClick={() => onRemove(fil)}
          >
            <span>{fil}</span>
            <span className="text-red-500 font-bold">✕</span>
          </div>
        ))}
      </div>
    );
  }
  
export default AppliedFilters;