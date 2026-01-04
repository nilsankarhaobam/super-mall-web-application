// src/app/auth/register/page.jsx
"use client";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import RegisterForm from "../../../components/auth/RegisterForm";

export default function RegisterPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect them away from register page
    if (!loading && user && role) {
      const destination = role === "admin" ? "/admin" : "/user";
      router.replace(destination); 
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-100">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  // Only show form if no user is present
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      {!user && <RegisterForm />}
    </div>
  );
}