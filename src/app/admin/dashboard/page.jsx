"use client";
import { useState, useEffect, useCallback } from "react";
import { getShops } from "@/services/shop.service";
import { getCategories } from "@/services/category.service";
import { getOffers } from "@/services/offer.service";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    shops: 0,
    categories: 0,
    offers: 0,
  });
  const [loading, setLoading] = useState(true);

  // Function to fetch all mall data totals
  const loadStats = useCallback(async () => {
    try {
      const [shopData, catData, offerData] = await Promise.all([
        getShops(),
        getCategories(),
        getOffers(),
      ]);

      setStats({
        shops: shopData.length,
        categories: catData.length,
        offers: offerData.length,
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
      <div className="flex justify-center items-center min-h-100">
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

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Shops Card */}
        <div className="stats shadow-md border border-base-200">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="stat-title">Total Shops</div>
            <div className="stat-value text-primary">{stats.shops}</div>
            <div className="stat-actions">
              <Link href="/admin/shops" className="btn btn-xs btn-outline">Manage</Link>
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="stats shadow-md border border-base-200">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </div>
            <div className="stat-title">Categories</div>
            <div className="stat-value text-secondary">{stats.categories}</div>
            <div className="stat-actions">
              <Link href="/admin/categories" className="btn btn-xs btn-outline">Edit</Link>
            </div>
          </div>
        </div>

        {/* Offers Card */}
        <div className="stats shadow-md border border-base-200">
          <div className="stat">
            <div className="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </div>
            <div className="stat-title">Active Offers</div>
            <div className="stat-value text-accent">{stats.offers}</div>
            <div className="stat-actions">
              <Link href="/admin/offers" className="btn btn-xs btn-outline">View All</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card bg-base-200 shadow-sm p-6">
          <h2 className="card-title mb-4">Quick Setup</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/shops/create" className="btn btn-primary btn-sm">Add New Shop</Link>
            <Link href="/admin/floors/create" className="btn btn-outline btn-sm">Add Floor</Link>
          </div>
        </div>
        <div className="card bg-base-200 shadow-sm p-6">
          <h2 className="card-title mb-4">System Status</h2>
          <div className="flex items-center gap-2">
            <div className="badge badge-success badge-xs"></div>
            <span className="text-sm font-medium">Database: Online</span>
          </div>
          <p className="text-xs text-base-content/50 mt-2 italic">All actions are logged to the central logger.</p>
        </div>
      </div>
    </div>
  );
}