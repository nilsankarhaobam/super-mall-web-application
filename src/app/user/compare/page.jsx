"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { getAllProducts } from "@/services/product.service";

export default function ComparePage() {
  const [compareList, setCompareList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Logic to find the cheapest price in the current list
  const minPrice = useMemo(() => {
    if (compareList.length < 2) return null;
    return Math.min(...compareList.map(item => item.price));
  }, [compareList]);

  const loadData = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      const saved = JSON.parse(localStorage.getItem("compareList") || "[]");
      setCompareList(saved);
      const products = await getAllProducts();
      setAllProducts(products);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    loadData();
  }, [loadData]);

  const removeItem = (id) => {
    const updated = compareList.filter(item => item.id !== id);
    setCompareList(updated);
    localStorage.setItem("compareList", JSON.stringify(updated));
    window.dispatchEvent(new Event("compareUpdated"));
  };

  const addItemFromDropdown = (product) => {
    if (!product || compareList.find(p => p.id === product.id) || compareList.length >= 3) return;
    const updated = [...compareList, product];
    setCompareList(updated);
    localStorage.setItem("compareList", JSON.stringify(updated));
    window.dispatchEvent(new Event("compareUpdated"));
  };

  if (!isMounted) return null;

  return (
    <div className="p-6 animate-in fade-in duration-500 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">
          Product <span className="text-primary underline">Versus</span>
        </h1>
        <p className="opacity-60 mt-2 italic">Battle of the Brands: Find the best deal in SuperMall</p>
      </div>

      {/* Slots Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[0, 1, 2].map((index) => (
          <div key={index} className="p-4 border-2 border-dashed border-base-300 rounded-2xl bg-base-200/30">
            {compareList[index] ? (
              <div className="flex justify-between items-center bg-base-100 p-3 rounded-xl shadow-sm border border-primary/20 relative">
                {compareList[index].price === minPrice && compareList.length > 1 && (
                    <span className="absolute -top-2 -left-2 badge badge-warning badge-sm font-bold shadow-sm">BEST DEAL</span>
                )}
                <div className="truncate pr-2">
                  <p className="font-bold text-sm truncate">{compareList[index].name}</p>
                  <p className="text-success text-xs font-mono">${compareList[index].price}</p>
                </div>
                <button onClick={() => removeItem(compareList[index].id)} className="btn btn-circle btn-xs btn-error btn-outline">✕</button>
              </div>
            ) : (
              <select 
                className="select select-bordered select-sm w-full bg-base-100"
                onChange={(e) => addItemFromDropdown(allProducts.find(p => p.id === e.target.value))}
                value=""
              >
                <option value="">+ Add Product</option>
                {allProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Versus Table */}
      {compareList.length > 0 ? (
        <div className="overflow-x-auto shadow-2xl rounded-3xl border border-base-200">
          <table className="table w-full bg-base-100 table-fixed md:table-auto">
            <thead>
              <tr className="bg-primary text-primary-content uppercase text-xs">
                <th className="w-1/4 py-6 px-6">Attributes</th>
                {compareList.map(item => (
                  <th key={item.id} className={`text-center py-6 ${item.price === minPrice && compareList.length > 1 ? 'bg-primary-focus' : ''}`}>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              <tr>
                <td className="font-bold bg-base-200/20 px-6">Price</td>
                {compareList.map(item => {
                  const isBest = item.price === minPrice && compareList.length > 1;
                  return (
                    <td key={item.id} className={`text-center py-8 transition-all duration-500 ${isBest ? 'bg-warning/10' : ''}`}>
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-3xl font-black font-mono ${isBest ? 'text-warning' : 'text-success'}`}>
                          ${item.price}
                        </span>
                        {isBest && <span className="text-[10px] font-bold text-warning uppercase tracking-widest">Cheapest Option</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="font-bold bg-base-200/20 px-6">Specs / Features</td>
                {compareList.map(item => (
                  <td key={item.id} className="text-center text-sm p-6 italic leading-relaxed whitespace-pre-line">
                    {item.features || "Standard specifications apply."}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold bg-base-200/20 px-6">Availability</td>
                {compareList.map(item => (
                  <td key={item.id} className="text-center p-6">
                    <Link href={`/user/shop/${item.shopId}`} className="btn btn-primary btn-outline btn-sm rounded-full hover:scale-105">
                      View in Store
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-400">
           <p className="text-xl font-bold opacity-30 uppercase tracking-widest">Select products above to begin battle</p>
        </div>
      )}
    </div>
  );
}