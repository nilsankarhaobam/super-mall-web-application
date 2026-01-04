// services/offer.service.js
import { db } from "@/lib/firebase"; // [cite: 246]
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { logAction } from "@/utils/logger"; // [cite: 309]

const collectionName = "offers";

/**
 * Create a new offer for a shop
 */
export const createOffer = async (offerData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      shopId: offerData.shopId,
      shopName: offerData.shopName,
      discount: offerData.discount,
      validity: offerData.validity,
      type: offerData.type,
      createdAt: serverTimestamp()
    });

    // Logging is a must for every action [cite: 42, 123]
    logAction("CREATE_OFFER", { 
      id: docRef.id, 
      shopId: offerData.shopId 
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating offer:", error);
    throw error;
  }
};

/**
 * Fetch all offers for Admin management [cite: 16]
 */
export const getOffers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
};

/**
 * Delete an offer [cite: 116]
 */
export const deleteOffer = async (id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    logAction("DELETE_OFFER", { id: id });
  } catch (error) {
    throw error;
  }
};