"use client";
import { useState, useEffect } from "react";
import { toggleCompare, getCompareList } from "@/utils/compare";

export default function ProductCard({ product }) {
  const [isCompared, setIsCompared] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
      const list = getCompareList();
      setIsCompared(list.some(item => item.id === product.id));
    });
    return () => cancelAnimationFrame(frame);
  }, [product.id]);

  const handleCompare = () => {
    const currentList = getCompareList();
    const updated = toggleCompare(currentList, product);
    localStorage.setItem("compareList", JSON.stringify(updated));
    
    setIsCompared(updated.some(item => item.id === product.id));
    window.dispatchEvent(new Event("compareUpdated"));
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-all group">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold group-hover:text-primary transition-colors">
          {product.name}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-success font-black text-xl">${product.price}</p>
          <span className="badge badge-ghost text-xs uppercase">{product.categoryName || 'General'}</span>
        </div>
        
        {/* Features Preview */}
        <p className="text-sm opacity-60 line-clamp-2 mt-2 h-10">
          {product.features || "No specific features listed for this item."}
        </p>
        
        <div className="card-actions flex-col gap-2 mt-4">
          {/* Main Action: Add to Compare Button */}
          {!isMounted ? (
            <div className="h-10 w-full bg-base-300 animate-pulse rounded-lg"></div>
          ) : (
            <button 
              onClick={handleCompare}
              className={`btn btn-sm w-full transition-all duration-300 ${
                isCompared 
                ? "btn-secondary shadow-inner" 
                : "btn-outline btn-primary"
              }`}
            >
              {isCompared ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Added to Compare
                </>
              ) : (
                "Add to Compare"
              )}
            </button>
          )}

          {/* Secondary Action: Details */}
          <button className="btn btn-ghost btn-sm w-full border-base-300 hover:bg-base-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}