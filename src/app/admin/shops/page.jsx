// app/admin/shops/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { getShops, deleteShop } from "@/services/shop.service";
import Link from "next/link";

export default function ShopsListPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadShops = useCallback(async () => {
    try {
      const data = await getShops();
      setShops(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShops();
  }, [loadShops]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      await deleteShop(id);
      loadShops();
    }
  };

  if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner"></span></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">List of Shop Details</h1> {/* [cite: 20] */}
        <Link href="/admin/shops/create" className="btn btn-primary">
          + Add New Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop.id} className="card bg-base-100 shadow-md border border-base-200">
            <div className="card-body">
              <h2 className="card-title">{shop.name}</h2>
              <div className="flex gap-2 mb-2">
                <span className="badge badge-secondary">{shop.categoryName}</span>
                <span className="badge badge-outline">Floor: {shop.floorName}</span>
              </div>
              <p className="text-sm opacity-70">{shop.description}</p>
              <div className="card-actions justify-end mt-4">
                <button onClick={() => handleDelete(shop.id)} className="btn btn-error btn-xs btn-outline">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}