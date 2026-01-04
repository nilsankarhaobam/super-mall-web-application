// app/admin/shops/create/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from "@/services/category.service";
import { getFloors } from "@/services/floor.service";
import { createShop } from "@/services/shop.service";

export default function CreateShopPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [floors, setFloors] = useState([]);
  const [formData, setFormData] = useState({ name: "", categoryId: "", floorId: "", description: "" });

  useEffect(() => {
    async function fetchData() {
      const [cats, flrs] = await Promise.all([getCategories(), getFloors()]);
      setCategories(cats);
      setFloors(flrs);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === formData.categoryId);
    const flr = floors.find(f => f.id === formData.floorId);

    try {
      await createShop({
        ...formData,
        categoryName: cat?.name || "",
        floorName: flr?.name || ""
      });
      router.push("/admin/shops"); // Go back to list after success
    } catch (error) {
      alert("Failed to create shop");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Shop Details</h1>
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 space-y-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Shop Name</span></label>
          <input 
            type="text" 
            className="input input-bordered" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Manage Category</span></label> {/* [cite: 17] */}
          <select 
            className="select select-bordered" 
            value={formData.categoryId}
            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Manage Floor</span></label> {/* [cite: 17] */}
          <select 
            className="select select-bordered" 
            value={formData.floorId}
            onChange={(e) => setFormData({...formData, floorId: e.target.value})}
            required
          >
            <option value="">Select Floor</option>
            {floors.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Description</span></label>
          <textarea 
            className="textarea textarea-bordered" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary flex-1">Save Shop</button>
          <button type="button" onClick={() => router.back()} className="btn btn-ghost">Cancel</button>
        </div>
      </form>
    </div>
  );
}