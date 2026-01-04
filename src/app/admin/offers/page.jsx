// app/admin/offers/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { getShops } from "@/services/shop.service"; // [cite: 287]
import { createOffer, getOffers, deleteOffer } from "@/services/offer.service"; // [cite: 289]

export default function AdminOffersPage() {
  const [shops, setShops] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    shopId: "", 
    discount: "", 
    validity: "", 
    type: "shop" 
  });

  // Optimized data loader to avoid cascading renders
  const loadInitialData = useCallback(async () => {
    try {
      const [shopData, offerData] = await Promise.all([
        getShops(),
        getOffers()
      ]);
      setShops(shopData);
      setOffers(offerData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedShop = shops.find(s => s.id === formData.shopId);

    try {
      await createOffer({
        ...formData,
        shopName: selectedShop?.name || "General"
      });
      setFormData({ shopId: "", discount: "", validity: "", type: "shop" });
      loadInitialData(); // Refresh list
    } catch (error) {
      alert("Error adding offer");
    }
  };

  if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner text-primary"></span></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Offer Details</h1> [cite: 16]

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Offer Form  */}
        <div className="card bg-base-100 shadow-xl p-6 border border-base-200 h-fit">
          <h2 className="text-lg font-semibold mb-4 text-accent">Create New Offer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select 
              className="select select-bordered w-full" 
              value={formData.shopId}
              onChange={(e) => setFormData({...formData, shopId: e.target.value})}
              required
            >
              <option value="">Select Shop</option>
              {shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>

            <input 
              type="text" placeholder="Discount (e.g. 20% Off)" className="input input-bordered w-full"
              value={formData.discount}
              onChange={(e) => setFormData({...formData, discount: e.target.value})}
              required 
            />

            <div className="form-control">
              <label className="label"><span className="label-text">Validity Date</span></label>
              <input 
                type="date" className="input input-bordered w-full"
                value={formData.validity}
                onChange={(e) => setFormData({...formData, validity: e.target.value})}
                required 
              />
            </div>

            <button type="submit" className="btn btn-accent w-full">Save Offer</button>
          </form>
        </div>

        {/* Offers List [cite: 24] */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map(offer => (
              <div key={offer.id} className="card bg-primary text-primary-content shadow-md">
                <div className="card-body p-4">
                  <h3 className="font-bold text-lg">{offer.discount}</h3>
                  <p className="text-sm">Shop: {offer.shopName}</p>
                  <p className="text-xs opacity-80">Valid until: {offer.validity}</p>
                  <div className="card-actions justify-end mt-2">
                    <button 
                      onClick={() => deleteOffer(offer.id).then(loadInitialData)}
                      className="btn btn-square btn-ghost btn-sm text-error"
                    >✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}