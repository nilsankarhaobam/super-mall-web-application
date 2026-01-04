// app/admin/products/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { getShops } from "@/services/shop.service"; // [cite: 20, 287]
import { createProduct, getProductsByShop, deleteProduct } from "@/services/product.service"; // [cite: 288]

export default function AdminProductsPage() {
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", features: "" });

  // Initial load of shops
  useEffect(() => {
    async function fetchShops() {
      const shopData = await getShops();
      setShops(shopData);
    }
    fetchShops();
  }, []);

  /**
   * loadProducts is now optimized to avoid synchronous setState warnings
   */
  const loadProducts = useCallback(async () => {
    if (!selectedShopId) {
      setProducts([]);
      return;
    }
    
    // We fetch data first, then update state once to avoid cascading renders
    try {
      const data = await getProductsByShop(selectedShopId);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }, [selectedShopId]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!selectedShopId) return alert("Please select a shop first");

    try {
      setLoading(true);
      await createProduct({
        ...formData,
        shopId: selectedShopId,
        price: Number(formData.price)
      });
      setFormData({ name: "", price: "", features: "" });
      await loadProducts();
    } catch (error) {
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Shop Products</h1> [cite: 115]

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-xl p-6 border border-base-200 h-fit">
          <h2 className="text-lg font-semibold mb-4 text-primary">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <select 
              className="select select-bordered w-full" 
              value={selectedShopId}
              onChange={(e) => setSelectedShopId(e.target.value)}
              required
            >
              <option value="">Select Shop to Manage</option>
              {shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>

            <input 
              type="text" placeholder="Product Name" className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />

            <input 
              type="number" placeholder="Price" className="input input-bordered w-full"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required 
            />

            <textarea 
              placeholder="Features (e.g. 1 year warranty, 4GB RAM)" 
              className="textarea textarea-bordered w-full"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
            ></textarea>

            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? "Saving..." : "Save Product"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="overflow-x-auto rounded-box border border-base-200">
            <table className="table bg-base-100">
              <thead className="bg-base-200">
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
  {!selectedShopId ? (
    <tr>
      <td colSpan="4" className="text-center py-10 opacity-50 italic">
        Please select a shop from the left to view inventory
      </td>
    </tr>
  ) : products.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-10 opacity-50">
        No products found for this shop. Add one to get started!
      </td>
    </tr>
  ) : (
    products.map(p => (
      <tr key={p.id} className="hover">
        <td className="font-semibold">{p.name}</td>
        <td className="text-success font-mono font-bold">${p.price}</td>
        <td className="text-sm opacity-70">{p.features}</td>
        <td>
          <button 
            onClick={() => deleteProduct(p.id).then(loadProducts)}
            className="btn btn-error btn-xs btn-outline hover:shadow-md"
          >Delete</button>
        </td>
      </tr>
    ))
  )}
</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}