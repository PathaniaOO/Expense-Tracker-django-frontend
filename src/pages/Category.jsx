import React, { useEffect, useState } from "react";
import api from "../api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null); // store category being edited
  const [loading, setLoading] = useState(true);

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new category
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("categories/", { name: newCategory });
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
  try {
    await api.delete(`categories/${id}/`);
    fetchCategories();
  } catch (err) {
    if (err.response && err.response.status === 500) {
      alert("Cannot delete this category because it has expenses linked to it.");
    } else {
      console.error("Error deleting category:", err);
    }
  }
};


  // Start editing
  const handleEditStart = (category) => {
    setEditCategory({ ...category }); // copy current category
  };

  // Handle editing input change
  const handleEditChange = (e) => {
    setEditCategory({ ...editCategory, name: e.target.value });
  };

  // Save edit
  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`categories/${editCategory.id}/`, {
        name: editCategory.name,
      });
      setEditCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditCategory(null);
  };

  if (loading) return <div className="p-6">Loading categories...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="flex mb-6">
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
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

      {/* Category List */}
      <div className="bg-white shadow-md rounded p-4">
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex justify-between items-center border-b py-2"
              >
                {editCategory && editCategory.id === cat.id ? (
                  // Edit Mode
                  <form onSubmit={handleEditSave} className="flex w-full">
                    <input
                      type="text"
                      value={editCategory.name}
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
                  // Display Mode
                  <>
                    <span>{cat.name}</span>
                    <div className="space-x-3">
                      <button
                        onClick={() => handleEditStart(cat)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
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

export default Categories;
