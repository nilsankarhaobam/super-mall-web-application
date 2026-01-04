// services/floor.service.js
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

const collectionName = "floors";

/**
 * Create a new mall floor
 */
export const createFloor = async (floorData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...floorData,
      createdAt: serverTimestamp()
    });

    // Logging every action is required [cite: 42, 123]
    logAction("CREATE_FLOOR", { id: docRef.id, name: floorData.name });

    return docRef.id;
  } catch (error) {
    console.error("Error adding floor: ", error);
    throw error;
  }
};

/**
 * Fetch all floors
 */
export const getFloors = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error fetching floors: ", error);
    return [];
  }
};

/**
 * Delete a floor
 */
export const deleteFloor = async (id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    logAction("DELETE_CATEGORY", { id: id }); // [cite: 157, 160]
  } catch (error) {
    console.error("Error deleting floor: ", error);
    throw error;
  }
};