import React, { useEffect, useState } from "react";
import api from "../api";

function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [newIncome, setNewIncome] = useState({
    amount: "",
    account: "",
    description: "",
  });

  const [editIncome, setEditIncome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncomes();
    fetchAccounts();
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const res = await api.get("incomes/");
      setIncomes(res.data);
    } catch (err) {
      console.error("Error fetching incomes:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await api.get("accounts/");
      setAccounts(res.data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  // Add Income
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("incomes/", newIncome);
      setNewIncome({ amount: "", account: "", description: "" });
      fetchIncomes();
    } catch (err) {
      console.error("Error adding income:", err);
    }
  };

  // Delete Income
  const handleDelete = async (id) => {
    try {
      await api.delete(`incomes/${id}/`);
      fetchIncomes();
    } catch (err) {
      console.error("Error deleting income:", err);
    }
  };

  // Edit Income
  const handleEditStart = (income) => {
    setEditIncome({ ...income });
  };

  const handleEditChange = (e) => {
    setEditIncome({ ...editIncome, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`incomes/${editIncome.id}/`, editIncome);
      setEditIncome(null);
      fetchIncomes();
    } catch (err) {
      console.error("Error updating income:", err);
    }
  };

  const handleEditCancel = () => {
    setEditIncome(null);
  };

  if (loading) return <div className="p-6">Loading incomes...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Incomes</h1>

      {/* Add Income Form */}
      <form onSubmit={handleAdd} className="space-y-3 mb-6 bg-white p-4 shadow rounded">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newIncome.amount}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newIncome.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="account"
          value={newIncome.account}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} (₹{acc.balance})
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Income
        </button>
      </form>

      {/* Incomes List */}
      <div className="bg-white shadow-md rounded p-4">
        {incomes.length === 0 ? (
          <p>No incomes found.</p>
        ) : (
          <ul>
            {incomes.map((inc) => (
              <li
                key={inc.id}
                className="flex justify-between items-center border-b py-2"
              >
                {editIncome && editIncome.id === inc.id ? (
                  // Edit Mode
                  <form onSubmit={handleEditSave} className="flex flex-col w-full space-y-2">
                    <input
                      type="number"
                      name="amount"
                      value={editIncome.amount}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="description"
                      value={editIncome.description || ""}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                    />
                    <select
                      name="account"
                      value={editIncome.account}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                    >
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleEditCancel}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Display Mode
                  <>
                    <div>
                      <span className="font-semibold">₹{inc.amount}</span>{" "}
                      <span className="ml-2 text-sm text-gray-500">{inc.description}</span>
                      <span className="ml-2 text-gray-600">
                        (Account: {inc.account})
                      </span>
                    </div>
                    <div className="space-x-3">
                      <button
                        onClick={() => handleEditStart(inc)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(inc.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Incomes;
