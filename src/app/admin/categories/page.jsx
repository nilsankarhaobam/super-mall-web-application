// app/admin/categories/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
// Importing from our service layer as per folder structure
import { createCategory, getCategories, deleteCategory } from "@/services/category.service"; 
import { logAction } from "@/utils/logger";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Define the function first (using useCallback for best performance)
  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Now it is safe to call it in useEffect
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Handle adding new category
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    try {
      await createCategory({ name: newCategory });
      setNewCategory("");
      await loadCategories(); // Refresh list
    } catch (error) {
      alert("Error adding category");
    }
  };

  // Handle deleting category
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        await loadCategories(); // Refresh list
      } catch (error) {
        alert("Error deleting category");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      {/* Form Section [cite: 17] */}
      <div className="card bg-base-100 shadow-xl mb-8 p-4">
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">New Category Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Electronics"
              className="input input-bordered"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Category</button>
        </form>
      </div>

      {/* Table Section [cite: 102] */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <table className="table w-full bg-base-100 shadow-sm rounded-lg">
            <thead>
              <tr className="bg-base-200">
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover">
                    <td className="font-medium">{cat.name}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="btn btn-error btn-outline btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}