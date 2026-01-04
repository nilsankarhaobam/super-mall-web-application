// app/error.jsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { logAction } from "@/utils/logger"; // Importing our central logger [cite: 309]

/**
 * Global Error Boundary
 * Automatically catches crashes in nested segments [cite: 194]
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to your central logging system as required by metrics [cite: 42, 123]
    logAction("APPLICATION_CRASH", { 
      message: error.message, 
      stack: error.stack 
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <div className="bg-error/10 p-8 rounded-2xl border border-error/20">
        <h2 className="text-3xl font-bold text-error mb-4">Something went wrong!</h2>
        <p className="text-base-content/70 mb-6 max-w-md">
          We encountered an unexpected error. This has been logged, and our team is looking into it.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()} // Corrected: parenthesis closed correctly
            className="btn btn-primary"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.href = "/"}
            className="btn btn-ghost"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}