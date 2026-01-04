"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  
  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      // Success! The Page.jsx useEffect will handle the redirection
    } catch (err) {
      // Friendly error handling
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("An error occurred. Please check your connection.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200 overflow-hidden">
      {/* Decorative top bar */}
      <div className="h-2 bg-primary w-full"></div>
      
      <div className="card-body p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-primary tracking-tight">Welcome Back</h2>
          <p className="text-sm text-base-content/60 mt-2">Enter your details to access your account</p>
        </div>

        {/* Dynamic Error Alert */}
        {error && (
          <div className="alert alert-error shadow-sm mb-6 py-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="h.nilsankar@example.com"
              className="input input-bordered focus:input-primary transition-all w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
              <Link href="#" className="label-text-alt link link-hover text-primary">Forgot password?</Link>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered focus:input-primary transition-all w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`btn btn-primary w-full text-lg mt-4 shadow-md hover:shadow-lg transition-all ${isSubmitting ? 'loading' : ''}`}
          >
            {isSubmitting ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="divider my-8 text-xs opacity-50 uppercase tracking-widest">New to the Mall?</div>

        {/* Secondary Action */}
        <div className="text-center">
          <Link 
            href="/auth/register" 
            className="btn btn-outline btn-block hover:bg-base-200 hover:text-base-content transition-all"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}