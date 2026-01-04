"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      await register(formData.email, formData.password, formData.role);
      // Redirection is handled by the Page.jsx useEffect
    } catch (err) {
      // Firebase error parsing
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200 overflow-hidden">
      {/* Decorative top bar matching Login theme */}
      <div className="h-2 bg-secondary w-full"></div>
      
      <div className="card-body p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-secondary tracking-tight">Create Account</h2>
          <p className="text-sm text-base-content/60 mt-2">Join the SuperMall merchant network</p>
        </div>

        {/* Dynamic Error Alert */}
        {error && (
          <div className="alert alert-error shadow-sm mb-6 py-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="input input-bordered focus:input-secondary transition-all w-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Create Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered focus:input-secondary transition-all w-full"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {/* Role Selection - Stylish Select */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Register As</span>
            </label>
            <select 
              className="select select-bordered focus:select-secondary w-full"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">Customer / Shopper</option>
              <option value="admin">Mall Administrator</option>
            </select>
          </div>

          {/* Submit Button with Loading State */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`btn btn-secondary w-full text-lg mt-4 shadow-md hover:shadow-lg transition-all ${isSubmitting ? 'loading' : ''}`}
          >
            {isSubmitting ? "Creating Account..." : "Get Started"}
          </button>
        </form>

        <div className="divider my-8 text-xs opacity-50 uppercase tracking-widest">Already a Member?</div>

        {/* Secondary Action */}
        <div className="text-center">
          <Link 
            href="/auth/login" 
            className="btn btn-outline btn-block hover:bg-base-200 hover:text-base-content transition-all"
          >
            Sign In to Account
          </Link>
        </div>
      </div>
    </div>
  );
}