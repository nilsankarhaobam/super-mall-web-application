"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm"; // IMPORT THE FORM

export default function LoginPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, send them to their dashboard
    if (!loading && user && role) {
      const destination = role === "admin" ? "/admin" : "/user";
      router.replace(destination);
    }
  }, [user, role, loading, router]);

  // 1. Show spinner while Firebase checks the session
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. Render the form ONLY if there is no user logged in
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      {!user && (
        <div className="w-full max-w-md">
          <LoginForm /> 
        </div>
      )}
    </div>
  );
}