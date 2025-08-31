import React, { useEffect, useState } from "react";
import api from "../api";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState("");
  const [editAccount, setEditAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await api.get("accounts/");
      setAccounts(res.data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create new account
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("accounts/", { name: newAccount });
      setNewAccount("");
      fetchAccounts();
    } catch (err) {
      console.error("Error adding account:", err);
    }
  };

  // Delete account
  const handleDelete = async (id) => {
    try {
      await api.delete(`accounts/${id}/`);
      fetchAccounts();
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  // Start editing
  const handleEditStart = (account) => {
    setEditAccount({ ...account });
  };

  // Change edit input
  const handleEditChange = (e) => {
    setEditAccount({ ...editAccount, name: e.target.value });
  };

  // Save edit
  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`accounts/${editAccount.id}/`, {
        name: editAccount.name,
      });
      setEditAccount(null);
      fetchAccounts();
    } catch (err) {
      console.error("Error updating account:", err);
    }
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditAccount(null);
  };

  if (loading) return <div className="p-6">Loading accounts...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>

      {/* Add account form */}
      <form onSubmit={handleAdd} className="flex mb-6">
        <input
          type="text"
          placeholder="New account name"
          value={newAccount}
          onChange={(e) => setNewAccount(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-l"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Account list */}
      <div className="bg-white shadow-md rounded p-4">
        {accounts.length === 0 ? (
          <p>No accounts found.</p>
        ) : (
          <ul>
            {accounts.map((acc) => (
              <li
                key={acc.id}
                className="flex justify-between items-center border-b py-2"
              >
                {editAccount && editAccount.id === acc.id ? (
                  // Edit mode
                  <form onSubmit={handleEditSave} className="flex w-full">
                    <input
                      type="text"
                      value={editAccount.name}
                      onChange={handleEditChange}
                      className="flex-1 border px-3 py-2 rounded"
                    />
                    <button
                      type="submit"
                      className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="ml-2 px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  // Display mode
                  <>
                    <div>
                      <span className="font-semibold">{acc.name}</span>
                      <span className="ml-4 text-gray-600">
                        Balance: ₹{acc.balance}
                      </span>
                    </div>
                    <div className="space-x-3">
                      <button
                        onClick={() => handleEditStart(acc)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(acc.id)}
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

export default Accounts;
