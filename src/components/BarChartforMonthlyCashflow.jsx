// src/components/MonthlyCashflowBarChart.jsx
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../api";

function MonthlyCashflowBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCashflow = async () => {
      try {
        const res = await api.get("expenses/monthly-cashflow/");
        setData(
          res.data.map((row) => ({
            month: row.month.substring(0, 7),
            income: Number(row.income),
            expense: Number(row.expense),
          }))
        );
      } catch (err) {
        console.error("Error fetching cashflow:", err);
      }
    };
    fetchCashflow();
  }, []);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Monthly Cashflow (Bar)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4caf50" />
          <Bar dataKey="expense" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyCashflowBarChart;
