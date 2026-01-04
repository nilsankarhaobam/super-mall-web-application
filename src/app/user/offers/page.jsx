// app/user/offers/page.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { getOffers } from "@/services/offer.service";

export default function UserOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define fetcher first to avoid "accessed before declaration" error
  const fetchOffers = useCallback(async () => {
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (error) {
      console.error("Offer Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  if (loading) return (
    <div className="flex justify-center p-20">
      <span className="loading loading-dots loading-lg text-secondary"></span>
    </div>
  );

  return (
    <div className="p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-secondary">Hot Offers & Discounts</h1>
        <p className="opacity-70">Grab the best deals from your favorite shops before they expire!</p>
      </header>

      {offers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="card bg-secondary text-secondary-content shadow-xl">
              <div className="card-body items-center text-center">
                <div className="badge badge-ghost uppercase text-xs font-bold">Limited Time</div>
                <h2 className="card-title text-3xl font-black">{offer.discount}</h2>
                <p className="font-semibold">{offer.shopName}</p>
                <div className="divider divider-horizontal"></div>
                <p className="text-xs italic">Valid until: {offer.validity}</p>
                <div className="card-actions mt-4">
                  <button className="btn btn-sm btn-outline btn-ghost">View Shop</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert shadow-lg max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>No active offers at the moment. Check back later!</span>
        </div>
      )}
    </div>
  );
}