"use client";
import { useState, useEffect, useCallback } from "react";
import { getCategories } from "@/services/category.service";
import { getFloors } from "@/services/floor.service";
import Link from "next/link";

// IMPORTANT: Ensure "export default" is present!
export default function UserDashboard() {
  const [categories, setCategories] = useState([]);
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDiscoveryData = useCallback(async () => {
    try {
      const [catData, floorData] = await Promise.all([
        getCategories(),
        getFloors()
      ]);
      setCategories(catData);
      setFloors(floorData);
    } catch (error) {
      console.error("Dashboard Load Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDiscoveryData();
  }, [loadDiscoveryData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Search Section */}
      <section className="bg-linear-to-r from-primary to-primary-focus p-8 md:p-12 rounded-3xl text-primary-content shadow-xl">
        <h1 className="text-3xl md:text-5xl font-black mb-4">Welcome to SuperMall</h1>
        <p className="text-lg opacity-90 mb-8 max-w-xl">
          Discover local commodities and global brands across all our floors.
        </p>
        <Link href="/user/shops" className="btn btn-secondary shadow-lg">
          Browse All Shops
        </Link>
      </section>

      {/* Discovery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Categories Card */}
        <div className="card bg-base-100 shadow-md border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Shop by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/user/shops?category=${cat.id}`} 
                  className="badge badge-lg badge-outline hover:badge-primary cursor-pointer py-4 px-6 transition-all"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Floors Card */}
        <div className="card bg-base-100 shadow-md border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Mall Directory</h2>
            <div className="grid grid-cols-2 gap-3">
              {floors.map((floor) => (
                <div key={floor.id} className="p-3 bg-base-200 rounded-lg text-center font-bold text-sm">
                  {floor.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}