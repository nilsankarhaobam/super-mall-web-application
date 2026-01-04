"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addProduct } from "@/services/product.service";

export default function AddProductPage() {
  const { id: shopId } = useParams(); // Get shopId from URL
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", price: "", description: "", features: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({ ...formData, shopId, price: Number(formData.price) });
      alert("Product Added!");
      router.push(`/admin/shops/${shopId}`); // Go back to shop details
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="input input-bordered w-full" 
          placeholder="Product Name" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          className="input input-bordered w-full" 
          type="number" 
          placeholder="Price" 
          onChange={(e) => setFormData({...formData, price: e.target.value})} 
          required 
        />
        <textarea 
          className="textarea textarea-bordered w-full" 
          placeholder="Description" 
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <button type="submit" className="btn btn-primary w-full">Save Product</button>
      </form>
    </div>
  );
}