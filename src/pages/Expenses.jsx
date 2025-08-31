import React, { useEffect, useState } from "react";
import api from "../api";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    account: "",
    description: "",
  });

  const [editExpense, setEditExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
    fetchAccounts();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await api.get("expenses/");
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
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

  // Handle form changes
  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  // Add Expense
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("expenses/", newExpense);
      setNewExpense({ amount: "", category: "", account: "", description: "" });
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // Delete Expense
  const handleDelete = async (id) => {
    try {
      await api.delete(`expenses/${id}/`);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // Edit Expense
  const handleEditStart = (expense) => {
    setEditExpense({ ...expense });
  };

  const handleEditChange = (e) => {
    setEditExpense({ ...editExpense, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`expenses/${editExpense.id}/`, editExpense);
      setEditExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  const handleEditCancel = () => {
    setEditExpense(null);
  };

  if (loading) return <div className="p-6">Loading expenses...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      {/* Add Expense Form */}
      <form onSubmit={handleAdd} className="space-y-3 mb-6 bg-white p-4 shadow rounded">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newExpense.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="category"
          value={newExpense.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          name="account"
          value={newExpense.account}
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Expense
        </button>
      </form>

      {/* Expense List */}
      <div className="bg-white shadow-md rounded p-4">
        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <ul>
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="flex justify-between items-center border-b py-2"
              >
                {editExpense && editExpense.id === exp.id ? (
                  // Edit Mode
                  <form onSubmit={handleEditSave} className="flex flex-col w-full space-y-2">
                    <input
                      type="number"
                      name="amount"
                      value={editExpense.amount}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="description"
                      value={editExpense.description || ""}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                    />
                    <select
                      name="category"
                      value={editExpense.category}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="account"
                      value={editExpense.account}
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
                      <span className="font-semibold">₹{exp.amount}</span>{" "}
                      <span className="ml-2 text-sm text-gray-500">{exp.description}</span>
                      <span className="ml-2 text-gray-600">
                        (Category: {exp.category}, Account: {exp.account})
                      </span>
                    </div>
                    <div className="space-x-3">
                      <button
                        onClick={() => handleEditStart(exp)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
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

export default Expenses;
