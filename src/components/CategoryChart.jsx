import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../api";
import DateFilter from "./DateFilter";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#0088fe"];

function CategoryChart() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ start: "", end: "", account: "" });

  const fetchData = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.start) params.append("start", filters.start);
      if (filters.end) params.append("end", filters.end);
      if (filters.account) params.append("account", filters.account);

      const res = await api.get(`expenses/totals_by_category/?${params.toString()}`);
      setData(res.data.map((row) => ({ name: row.category, value: Number(row.total) })));
    } catch (err) {
      console.error("Error fetching category totals:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
      <DateFilter filters={filters} setFilters={setFilters} onApply={fetchData} />
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategoryChart;
