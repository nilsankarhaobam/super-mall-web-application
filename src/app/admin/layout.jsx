// app/admin/layout.jsx
"use client";
import ProtectedRoute from "@/components/common/ProtectedRoute"; // [cite: 229]
import AdminSidebar from "@/components/admin/AdminSidebar"; // 

/**
 * Layout for Admin Section [cite: 198]
 * Ensures all nested /admin/* routes are protected by role 'admin' [cite: 89]
 */
export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRole="admin">
      <div className="flex min-h-screen bg-base-100">
        {/* Persistent Sidebar for Admin Dashboard [cite: 214] */}
        <AdminSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="admin-container">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}