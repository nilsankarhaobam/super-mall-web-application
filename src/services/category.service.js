// services/category.service.js
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

const collectionName = "categories";

/**
 * Create a new mall category (e.g., Electronics, Fashion)
 * Satisfies Admin Category Management 
 */
export const createCategory = async (categoryData) => {
  try {
    // Spread the data and add the server timestamp
    const docRef = await addDoc(collection(db, collectionName), {
      ...categoryData,
      createdAt: serverTimestamp()
    });

    // Logging is a must for every action 
    logAction("CREATE_CATEGORY", { 
      id: docRef.id, 
      name: categoryData.name 
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding category: ", error);
    throw error;
  }
};

/**
 * Fetch all categories for the Admin View [cite: 102]
 */
export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
};

/**
 * Delete a category
 */
export const deleteCategory = async (id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    // Log deletion for audit trail 
    logAction("DELETE_CATEGORY", { id: id });
  } catch (error) {
    console.error("Error deleting category: ", error);
    throw error;
  }
};