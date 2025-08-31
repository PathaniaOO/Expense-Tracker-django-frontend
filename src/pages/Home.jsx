import React, { useEffect, useState } from "react";
import api from "../api";
import CategoryChart from "../components/CategoryChart";
import RecentTransactions from "../components/RecentTransactions";
import MonthlyCashflowBarChart from "../components/BarChartforMonthlyCashflow";

function Home() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Currency formatter
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("summary/");
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (!summary) return <div className="p-6">No data available.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Income</h2>
          <p className="text-green-600 text-xl font-bold">
            {formatCurrency(summary.totals.income)}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-red-600 text-xl font-bold">
            {formatCurrency(summary.totals.expense)}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Transfers In</h2>
          <p className="text-blue-600 text-xl font-bold">
            {formatCurrency(summary.totals.transfers_in)}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Net</h2>
          <p
            className={`text-xl font-bold ${
              summary.totals.net >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(summary.totals.net)}
          </p>
        </div>
      </div>

      {/* Account Balances */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-3">Account Balances</h2>
        {summary.balances.by_account.map((acc) => (
          <div
            key={acc.account_id}
            className="flex justify-between border-b py-1"
          >
            <span>{acc.account}</span>
            <span>{formatCurrency(acc.balance)}</span>
          </div>
        ))}
        <p className="mt-3 font-bold">
          Total Balance: {formatCurrency(summary.balances.total_balance)}
        </p>
      </div>

      {/* Charts */}
    <CategoryChart />
      <MonthlyCashflowBarChart />
      <RecentTransactions />
    </div>
  );
}

export default Home;
