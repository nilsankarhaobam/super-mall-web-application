// app/user/layout.jsx
"use client";

import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function UserLayout({ children }) {
  return (
    <ProtectedRoute allowedRole="user">
      {/* REMOVED: <Navbar /> and <Footer /> 
          They are already provided by the Root Layout 
      */}
      <main className="grow p-4 md:p-8">
        <div className="user-container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </ProtectedRoute>
  );
}