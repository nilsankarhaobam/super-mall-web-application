// app/user/shops/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { getShops } from "@/services/shop.service";
import { getCategories } from "@/services/category.service";
import Link from "next/link";

export default function UserShopsPage() {
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Load all data at once to prevent cascading renders
  const loadInitialData = useCallback(async () => {
    try {
      const [shopData, catData] = await Promise.all([
        getShops(),
        getCategories()
      ]);
      setShops(shopData);
      setFilteredShops(shopData);
      setCategories(catData);
    } catch (error) {
      console.error("Discovery Page Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  /**
   * client-side filtering logic
   * Handles Search, Category Filter, and Sorting
   */
  useEffect(() => {
    let result = [...shops];

    // 1. Filter by Search Term
    if (searchTerm) {
      result = result.filter(shop => 
        shop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter(shop => shop.categoryId === selectedCategory);
    }

    // 3. Sort logic
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "floor") return a.floorName.localeCompare(b.floorName);
      return 0;
    });

    setFilteredShops(result);
  }, [searchTerm, selectedCategory, sortBy, shops]);

  if (loading) return <div className="p-20 text-center"><span className="loading loading-spinner text-primary"></span></div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Mall Directory</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-10 bg-base-200 p-6 rounded-2xl shadow-sm">
        <div className="form-control grow">
          <input 
            type="text" 
            placeholder="Search shops..." 
            className="input input-bordered"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select 
          className="select select-bordered w-full max-w-xs"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="floor">Sort by Floor</option>
        </select>
      </div>

      {/* Results Grid */}
      {filteredShops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <div key={shop.id} className="card bg-base-100 shadow-xl border hover:border-primary transition-all">
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">{shop.name}</h2>
                  <div className="badge badge-accent">{shop.floorName}</div>
                </div>
                <p className="text-sm opacity-60 mb-4">{shop.description}</p>
                <div className="card-actions justify-end">
                  <Link href={`/user/shop/${shop.id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed">
          <p className="text-xl opacity-50">No shops found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}