"use client";
import { useState, useEffect, useCallback } from "react";
import { getShops } from "@/services/shop.service";
import { getCategories } from "@/services/category.service";
import { getOffers } from "@/services/offer.service";
import { getAllProducts } from "@/services/product.service"; // Ensure this service exists
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    shops: 0,
    categories: 0,
    offers: 0,
    products: 0, // Added Product stat
  });
  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(async () => {
    try {
      // Fetch all 4 main data points
      const [shopData, catData, offerData, productData] = await Promise.all([
        getShops(),
        getCategories(),
        getOffers(),
        getAllProducts(), 
      ]);

      setStats({
        shops: shopData.length,
        categories: catData.length,
        offers: offerData.length,
        products: productData.length,
      });
    } catch (error) {
      console.error("Dashboard data fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black">Mall Analytics</h1>
          <p className="text-base-content/60 text-sm">Real-time overview of your mall infrastructure.</p>
        </div>
        <button onClick={loadStats} className="btn btn-ghost btn-sm border-base-300">
          Refresh Data
        </button>
      </div>

      {/* Stats Cards Grid - Updated to 4 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Shops */}
        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-box">
          <div className="stat-title">Total Shops</div>
          <div className="stat-value text-primary text-2xl">{stats.shops}</div>
          <div className="stat-actions"><Link href="/admin/shops" className="btn btn-xs btn-outline">Manage</Link></div>
        </div>

        {/* Categories */}
        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-box">
          <div className="stat-title">Categories</div>
          <div className="stat-value text-secondary text-2xl">{stats.categories}</div>
          <div className="stat-actions"><Link href="/admin/categories" className="btn btn-xs btn-outline">Edit</Link></div>
        </div>

        {/* Products - NEW CARD */}
        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-box">
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-info text-2xl">{stats.products}</div>
          <div className="stat-actions"><Link href="/admin/products" className="btn btn-xs btn-outline">Inventory</Link></div>
        </div>

        {/* Offers */}
        <div className="stat bg-base-100 shadow-md border border-base-200 rounded-box">
          <div className="stat-title">Active Offers</div>
          <div className="stat-value text-accent text-2xl">{stats.offers}</div>
          <div className="stat-actions"><Link href="/admin/offers" className="btn btn-xs btn-outline">View All</Link></div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card bg-base-200 shadow-sm p-6">
          <h2 className="card-title mb-4 font-bold text-lg">Inventory Management</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/shops/create" className="btn btn-primary btn-sm">Add New Shop</Link>
            <Link href="/admin/products" className="btn btn-info btn-sm">Add New Product</Link>
            <Link href="/admin/floors/create" className="btn btn-outline btn-sm">Manage Floors</Link>
          </div>
        </div>
        
        <div className="card bg-base-200 shadow-sm p-6 border-l-4 border-success">
          <h2 className="card-title mb-4">Live Status</h2>
          <div className="flex items-center gap-2">
            <div className="badge badge-success badge-xs animate-pulse"></div>
            <span className="text-sm font-medium">Cloud Database: Connected</span>
          </div>
          <p className="text-xs text-base-content/50 mt-2">Metrics are synchronized with Firebase Firestore.</p>
        </div>
      </div>
    </div>
  );
}