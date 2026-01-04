"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";
import { logAction } from "@/utils/logger"; // Added missing import

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push("/auth/login");
      } else if (allowedRole && role !== allowedRole) {
        // Log the violation using the 'role' variable from useAuth
        logAction("SECURITY_VIOLATION", {
          userId: user.uid,
          attemptedRole: allowedRole,
          actualRole: role // Fixed: using 'role' instead of 'user.role'
        });

        // Redirect to appropriate dashboard
        const destination = role === "admin" ? "/admin" : "/user"; 
        router.push(destination);
      }
    }
  }, [user, role, loading, router, allowedRole]);

  // Show loading spinner while checking auth status
  if (loading) {
    return <Loader />;
  }

  // Final check to prevent content flicker
  const hasAccess = user && (!allowedRole || role === allowedRole);

  return hasAccess ? <>{children}</> : null;
}