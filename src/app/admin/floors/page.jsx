// app/admin/floors/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { createFloor, getFloors, deleteFloor } from "@/services/floor.service";

export default function FloorsPage() {
  const [floors, setFloors] = useState([]);
  const [newFloor, setNewFloor] = useState("");
  const [loading, setLoading] = useState(true);

  // Define load function first to avoid hoisting issues
  const loadFloors = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFloors();
      setFloors(data);
    } catch (error) {
      console.error("Failed to load floors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFloors();
  }, [loadFloors]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newFloor.trim()) return;
    
    try {
      await createFloor({ name: newFloor });
      setNewFloor("");
      await loadFloors();
    } catch (error) {
      alert("Error adding floor");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this floor? This might affect shops assigned to it.")) {
      try {
        await deleteFloor(id);
        await loadFloors();
      } catch (error) {
        alert("Error deleting floor");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Floor Management</h1>

      {/* Form Section */}
      <div className="card bg-base-100 shadow-xl mb-8 p-4 border border-base-200">
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Floor Name / Level</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Ground Floor"
              className="input input-bordered"
              value={newFloor}
              onChange={(e) => setNewFloor(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Floor</button>
        </form>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : (
          <table className="table w-full bg-base-100 shadow-sm rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th>Floor Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {floors.length > 0 ? (
                floors.map((floor) => (
                  <tr key={floor.id} className="hover">
                    <td className="font-medium">{floor.name}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(floor.id)}
                        className="btn btn-error btn-outline btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-6 text-base-content/50">
                    No floors defined yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}