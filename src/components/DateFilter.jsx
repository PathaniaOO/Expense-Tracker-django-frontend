// src/components/DateFilter.jsx
import React from "react";

function DateFilter({ filters, setFilters, onApply }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 shadow rounded flex gap-4 items-end mb-6">
      <div>
        <label className="block text-sm">Start Date</label>
        <input
          type="date"
          name="start"
          value={filters.start}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">End Date</label>
        <input
          type="date"
          name="end"
          value={filters.end}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Account (optional)</label>
        <input
          type="number"
          name="account"
          placeholder="Account ID"
          value={filters.account}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        />
      </div>
      <button
        onClick={onApply}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Apply
      </button>
    </div>
  );
}

export default DateFilter;
