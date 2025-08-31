import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../api";
import DateFilter from "./DateFilter";

function MonthlyCashflowChart() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ start: "", end: "", account: "" });

  const fetchData = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.start) params.append("start", filters.start);
      if (filters.end) params.append("end", filters.end);
      if (filters.account) params.append("account", filters.account);

      const res = await api.get(`expenses/monthly-cashflow/?${params.toString()}`);
      setData(
        res.data.map((row) => ({
          month: row.month.substring(0, 7),
          income: Number(row.income),
          expense: Number(row.expense),
          net: Number(row.net),
        }))
      );
    } catch (err) {
      console.error("Error fetching monthly cashflow:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Monthly Cashflow</h2>
      <DateFilter filters={filters} setFilters={setFilters} onApply={fetchData} />
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#4caf50" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#f44336" strokeWidth={2} />
            <Line type="monotone" dataKey="net" stroke="#2196f3" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MonthlyCashflowChart;
