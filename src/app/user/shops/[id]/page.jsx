"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductsByShop } from "@/services/product.service";
import ProductCard from "@/components/user/ProductCard";

export default function ShopDetails() {
  const { id: shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getProductsByShop(shopId);
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, [shopId]);

  if (loading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Shop Inventory</h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="opacity-50 text-center py-10">No products found in this shop.</p>
      )}
    </div>
  );
}