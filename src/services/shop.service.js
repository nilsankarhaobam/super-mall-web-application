// services/shop.service.js
import { db } from "@/lib/firebase"; // [cite: 246]
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  serverTimestamp 
} from "firebase/firestore";
import { logAction } from "@/utils/logger"; // [cite: 309]

const collectionName = "shops";

/**
 * Create a new shop linked to a category and floor 
 */
export const createShop = async (shopData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      name: shopData.name,
      categoryId: shopData.categoryId,
      categoryName: shopData.categoryName,
      floorId: shopData.floorId,
      floorName: shopData.floorName,
      description: shopData.description,
      createdAt: serverTimestamp()
    });

    logAction("CREATE_SHOP", { id: docRef.id, name: shopData.name }); // [cite: 42, 123]
    return docRef.id;
  } catch (error) {
    console.error("Error creating shop:", error);
    throw error;
  }
};

/**
 * Fetch all shops 
 */
export const getShops = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error fetching shops:", error);
    return [];
  }
};

/**
 * Delete a shop
 */
export const deleteShop = async (id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    logAction("DELETE_SHOP", { id: id }); // [cite: 42]
  } catch (error) {
    throw error;
  }
};