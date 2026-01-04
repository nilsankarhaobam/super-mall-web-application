// components/admin/AdminSidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  // Navigation items based on your folder structure [cite: 200, 201, 205, 206, 207]
  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Shops", path: "/admin/shops" },
    { name: "Products", path: "/admin/products" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Floors", path: "/admin/floors" },
    { name: "Offers", path: "/admin/offers" },
  ];

  return (
    <aside className="w-64 bg-base-200 shadow-xl min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-primary">Super Mall Admin</h1>
      </div>
      <ul className="menu p-4 w-full text-base-content">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              href={item.path} 
              className={pathname === item.path ? "active" : ""}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}