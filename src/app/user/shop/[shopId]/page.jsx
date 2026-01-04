// app/user/shop/[shopId]/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { getProductsByShop } from "@/services/product.service";
import { getShops } from "@/services/shop.service";

export default function ShopDetailsPage() {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadShopData = useCallback(async () => {
    try {
      const allShops = await getShops();
      const currentShop = allShops.find(s => s.id === shopId);
      const shopProducts = await getProductsByShop(shopId);
      
      setShop(currentShop);
      setProducts(shopProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    loadShopData();
  }, [loadShopData]);

  if (loading) return <div className="p-20 text-center"><span className="loading loading-ring loading-lg"></span></div>;
  if (!shop) return <div className="p-20 text-center text-error font-bold">Shop not found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Shop Header Section [cite: 130] */}
      <div className="bg-primary text-primary-content p-8 rounded-3xl mb-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">{shop.name}</h1>
        <div className="flex gap-2 mb-4">
          <span className="badge badge-ghost">{shop.categoryName}</span>
          <span className="badge badge-ghost">{shop.floorName}</span>
        </div>
        <p className="max-w-2xl">{shop.description}</p>
      </div>

      {/* Products List [cite: 131] */}
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="card bg-base-100 shadow-sm border">
            <div className="card-body p-4">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-primary font-mono text-lg">${product.price}</p>
              <p className="text-xs opacity-60">{product.features}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}