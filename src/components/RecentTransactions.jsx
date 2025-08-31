// src/components/RecentTransactions.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenses, incomes, transfers] = await Promise.all([
          api.get("expenses/"),
          api.get("incomes/"),
          api.get("transfers/"),
        ]);

        // Add type field to each
        const exp = expenses.data.map((e) => ({ ...e, type: "Expense" }));
        const inc = incomes.data.map((i) => ({ ...i, type: "Income" }));
        const tr = transfers.data.map((t) => ({ ...t, type: "Transfer" }));

        // Merge and sort by created_at desc
        const merged = [...exp, ...inc, ...tr].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setTransactions(merged.slice(0, 5));
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>No recent activity.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx, idx) => (
            <li key={idx} className="flex justify-between border-b py-2">
              <span>
                <span className="font-semibold">{tx.type}</span> —{" "}
                {tx.description || `₹${tx.amount}`}
              </span>
              <span className="text-gray-600 text-sm">
                {new Date(tx.created_at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentTransactions;
