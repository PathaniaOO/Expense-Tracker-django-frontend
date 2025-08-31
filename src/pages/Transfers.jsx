import React, { useEffect, useState } from "react";
import api from "../api";

function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [newTransfer, setNewTransfer] = useState({
    from_account: "",
    to_account: "",
    amount: "",
  });

  const [editTransfer, setEditTransfer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransfers();
    fetchAccounts();
  }, []);

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const res = await api.get("transfers/");
      setTransfers(res.data);
    } catch (err) {
      console.error("Error fetching transfers:", err);
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

  // Handle form changes
  const handleChange = (e) => {
    setNewTransfer({ ...newTransfer, [e.target.name]: e.target.value });
  };

  // Add Transfer
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("transfers/", newTransfer);
      setNewTransfer({ from_account: "", to_account: "", amount: "" });
      fetchTransfers();
    } catch (err) {
      console.error("Error adding transfer:", err);
      alert("Failed to add transfer. Make sure accounts are different and valid.");
    }
  };

  // Delete Transfer
  const handleDelete = async (id) => {
    try {
      await api.delete(`transfers/${id}/`);
      fetchTransfers();
    } catch (err) {
      console.error("Error deleting transfer:", err);
    }
  };

  // Edit Transfer
  const handleEditStart = (transfer) => {
    setEditTransfer({ ...transfer });
  };

  const handleEditChange = (e) => {
    setEditTransfer({ ...editTransfer, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`transfers/${editTransfer.id}/`, editTransfer);
      setEditTransfer(null);
      fetchTransfers();
    } catch (err) {
      console.error("Error updating transfer:", err);
    }
  };

  const handleEditCancel = () => {
    setEditTransfer(null);
  };

  if (loading) return <div className="p-6">Loading transfers...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Transfers</h1>

      {/* Add Transfer Form */}
      <form onSubmit={handleAdd} className="space-y-3 mb-6 bg-white p-4 shadow rounded">
        <select
          name="from_account"
          value={newTransfer.from_account}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">From Account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} (₹{acc.balance})
            </option>
          ))}
        </select>
        <select
          name="to_account"
          value={newTransfer.to_account}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">To Account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} (₹{acc.balance})
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newTransfer.amount}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Add Transfer
        </button>
      </form>

      {/* Transfers List */}
      <div className="bg-white shadow-md rounded p-4">
        {transfers.length === 0 ? (
          <p>No transfers found.</p>
        ) : (
          <ul>
            {transfers.map((tr) => (
              <li
                key={tr.id}
                className="flex justify-between items-center border-b py-2"
              >
                {editTransfer && editTransfer.id === tr.id ? (
                  // Edit Mode
                  <form onSubmit={handleEditSave} className="flex flex-col w-full space-y-2">
                    <select
                      name="from_account"
                      value={editTransfer.from_account}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                      required
                    >
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="to_account"
                      value={editTransfer.to_account}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                      required
                    >
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="amount"
                      value={editTransfer.amount}
                      onChange={handleEditChange}
                      className="border px-3 py-2 rounded"
                      required
                    />
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
                      <span className="font-semibold">₹{tr.amount}</span>{" "}
                      <span className="ml-2 text-gray-600">
                        (From {tr.from_account} → To {tr.to_account})
                      </span>
                    </div>
                    <div className="space-x-3">
                      <button
                        onClick={() => handleEditStart(tr)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tr.id)}
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

export default Transfers;
