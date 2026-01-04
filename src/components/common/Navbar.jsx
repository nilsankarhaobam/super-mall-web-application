"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { logAction } from "@/utils/logger";
import { getCompareList } from "@/utils/compare";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const [compareCount, setCompareCount] = useState(0);
  const router = useRouter();

  // Update comparison count from localStorage
  useEffect(() => {
    const updateCount = () => {
      const list = getCompareList();
      setCompareCount(list.length);
    };

    updateCount(); // Initial load
    window.addEventListener("compareUpdated", updateCount);
    return () => window.removeEventListener("compareUpdated", updateCount);
  }, []);

  const handleLogout = async () => {
    try {
      logAction("USER_LOGOUT", { userId: user?.uid });
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 md:px-8 sticky top-0 z-50">
      {/* Mobile: Burger Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/user/shops">Shops</Link></li>
            <li><Link href="/user/offers">Offers</Link></li>
            <li>
              <Link href="/user/compare" className="flex justify-between">
                Compare 
                {compareCount > 0 && <span className="badge badge-secondary badge-sm">{compareCount}</span>}
              </Link>
            </li>
            {role === 'admin' && <li><Link href="/admin" className="text-primary font-bold">Admin Panel</Link></li>}
          </ul>
        </div>
        <Link href="/" className="text-2xl font-black tracking-tighter text-primary">
          SUPER<span className="text-base-content">MALL</span>
        </Link>
      </div>

      {/* Desktop: Horizontal Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li><Link href="/user/shops" className="hover:text-primary transition-colors">Shops</Link></li>
          <li><Link href="/user/offers" className="hover:text-primary transition-colors">Offers</Link></li>
          
          {/* Compare Link with Badge */}
          <li>
            <Link href="/user/compare" className="hover:text-primary transition-colors flex items-center gap-1">
              Compare
              {compareCount > 0 && (
                <span className="badge badge-secondary badge-sm animate-bounce">{compareCount}</span>
              )}
            </Link>
          </li>

          {role === 'admin' && (
            <li>
              <Link href="/admin" className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Auth Section */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block text-xs opacity-60">Hi, {user.email?.split('@')[0]}</span>
            <button 
              onClick={handleLogout}
              className="btn btn-outline btn-error btn-sm md:btn-md px-6 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            href="/auth/login" 
            className="btn btn-primary btn-sm md:btn-md px-8 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}